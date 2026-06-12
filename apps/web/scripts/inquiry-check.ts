/**
 * 문의(피드백) 기능 검증 — 지시서 6장 항목.
 * 실행: DATABASE_URL=... pnpm dlx tsx scripts/inquiry-check.ts
 */
import { appRouter, type Context } from '@maeum/api';
import { prisma } from '@maeum/db';

let passed = 0;
let failed = 0;
function ok(name: string, cond: boolean, detail?: string) {
  if (cond) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.error(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`); }
}
async function expectThrow(name: string, fn: () => Promise<unknown>, msgIncludes?: string) {
  try { await fn(); ok(name, false, '에러가 발생해야 하는데 성공함'); }
  catch (e) { const m = e instanceof Error ? e.message : String(e); ok(name, msgIncludes ? m.includes(msgIncludes) : true, m); }
}
function caller(userId?: string, ip = '198.51.100.10') {
  const ctx: Context = { db: prisma, userId, clientIp: ip, clientUserAgent: 'inquiry-test' };
  return appRouter.createCaller(ctx);
}

async function main() {
  const anon = caller(undefined, '198.51.100.1');

  console.log('\n[1] 제출 — 비로그인/로그인, 검증');
  await expectThrow('내용 10자 미만 거부', () => anon.inquiry.submit({ email: 'a@b.kr', message: '짧음' }));
  await expectThrow('이메일 형식 검증', () => anon.inquiry.submit({ email: 'not-an-email', message: '충분히 긴 문의 내용입니다.' }));
  await expectThrow('honeypot 채우면 거부', () =>
    // @ts-expect-error honeypot은 max(0)이므로 의도적 위반
    anon.inquiry.submit({ email: 'a@b.kr', message: '충분히 긴 문의 내용입니다.', website: 'spam.com' }));

  const anonResult = await anon.inquiry.submit({ email: 'guest@test.kr', category: 'bug', message: '비로그인 상태에서 보내는 문의입니다.' });
  const anonRow = await prisma.inquiry.findUnique({ where: { id: anonResult.id } });
  ok('비로그인 제출 → DB 저장', !!anonRow && anonRow.email === 'guest@test.kr' && anonRow.userId === null);
  ok('비로그인 IP 미저장 (동의 없음)', anonRow?.ipAddress === null && anonRow?.userAgent === null);
  ok('Mock 메일 발송 성공 → emailSent=true', anonRow?.emailSent === true);

  // 로그인 사용자 (동의/미동의)
  const consentUser = await prisma.user.create({ data: { email: 'consent@test.kr', name: '동의함', role: 'child', consentAnalytics: true } });
  const noConsentUser = await prisma.user.create({ data: { email: 'noconsent@test.kr', name: '미동의', role: 'child', consentAnalytics: false } });

  const r1 = await caller(consentUser.id, '198.51.100.2').inquiry.submit({ email: 'consent@test.kr', category: 'feature', message: '동의한 사용자의 문의입니다.' });
  const row1 = await prisma.inquiry.findUnique({ where: { id: r1.id } });
  ok('동의 사용자: userId 연결 + IP 저장', row1?.userId === consentUser.id && row1?.ipAddress === '198.51.100.2');

  const r2 = await caller(noConsentUser.id, '198.51.100.3').inquiry.submit({ email: 'noconsent@test.kr', message: '미동의 사용자의 문의입니다.' });
  const row2 = await prisma.inquiry.findUnique({ where: { id: r2.id } });
  ok('미동의 사용자: IP·UA 미저장', row2?.ipAddress === null && row2?.userAgent === null);

  console.log('\n[2] rate limit — 동일 IP 10분 3건 제한');
  const spammer = caller(undefined, '198.51.100.99');
  await spammer.inquiry.submit({ email: 's@t.kr', message: '스팸 테스트 문의 1번입니다.' });
  await spammer.inquiry.submit({ email: 's@t.kr', message: '스팸 테스트 문의 2번입니다.' });
  await spammer.inquiry.submit({ email: 's@t.kr', message: '스팸 테스트 문의 3번입니다.' });
  await expectThrow('4번째 제출 차단', () => spammer.inquiry.submit({ email: 's@t.kr', message: '스팸 테스트 문의 4번입니다.' }), '자주');

  console.log('\n[3] 관리자 — 조회/상태변경/삭제, 일반 사용자 차단');
  await expectThrow('일반 사용자 목록 조회 차단', () => caller(noConsentUser.id).inquiry.list({ limit: 10 }), '관리자');
  await expectThrow('비로그인 목록 조회 차단', () => anon.inquiry.list({ limit: 10 }));

  const adminUser = await prisma.user.create({ data: { email: 'admin@test.kr', name: '관리자', role: 'both' } });
  await prisma.admin.create({ data: { userId: adminUser.id } });
  const admin = caller(adminUser.id);

  const list = await admin.inquiry.list({ limit: 50 });
  ok('관리자 목록 조회 + 상태 집계', list.inquiries.length >= 6 && (list.statusCounts.new ?? 0) >= 6);

  const filtered = await admin.inquiry.list({ category: 'bug', limit: 50 });
  ok('유형 필터', filtered.inquiries.every((q) => q.category === 'bug') && filtered.inquiries.length >= 1);
  const searched = await admin.inquiry.list({ search: 'guest@test.kr', limit: 50 });
  ok('이메일 검색', searched.inquiries.length === 1);

  await admin.inquiry.setStatus({ id: anonResult.id, status: 'in_progress' });
  const afterStatus = await prisma.inquiry.findUnique({ where: { id: anonResult.id } });
  ok('상태 변경 new → in_progress', afterStatus?.status === 'in_progress');

  const del = await admin.inquiry.deleteMany({ ids: [r1.id, r2.id] });
  const audit = await prisma.adminAudit.findFirst({ where: { action: 'delete_inquiries' } });
  ok('다중 삭제 + 감사 로그', del.deletedCount === 2 && !!audit && audit.targetIds.length === 2);

  console.log(`\n결과: ${passed} 통과 / ${failed} 실패`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error('실행 오류:', e); process.exit(1); });
