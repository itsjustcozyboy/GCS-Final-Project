/**
 * TASK 6 통합 점검 스크립트 — appRouter.createCaller로 전체 플로우를 DB까지 관통 검증.
 * 실행: DATABASE_URL=... DIRECT_URL=... pnpm dlx tsx scripts/e2e-check.ts
 */
import { appRouter, type Context } from '@maeum/api';
import { generateBook } from '@maeum/api';
import { prisma } from '@maeum/db';

let passed = 0;
let failed = 0;

function ok(name: string, cond: boolean, detail?: string) {
  if (cond) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    console.error(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function expectThrow(name: string, fn: () => Promise<unknown>, msgIncludes?: string) {
  try {
    await fn();
    ok(name, false, '에러가 발생해야 하는데 성공함');
  } catch (e) {
    const m = e instanceof Error ? e.message : String(e);
    ok(name, msgIncludes ? m.includes(msgIncludes) : true, m);
  }
}

function caller(userId?: string, ip = '203.0.113.7') {
  const ctx: Context = { db: prisma, userId, clientIp: ip, clientUserAgent: 'e2e-test' };
  return appRouter.createCaller(ctx);
}

async function main() {
  const anon = caller();

  console.log('\n[1] 동의 게이트');
  await expectThrow('필수 동의 누락 시 가입 차단', () =>
    // @ts-expect-error 의도적으로 필수 동의 누락
    anon.auth.register({ name: '자녀', email: 'child@test.kr', role: 'child', password: 'secret1' }),
  );
  await expectThrow('필수 동의 false 시 가입 차단', () =>
    anon.auth.register({
      name: '자녀', email: 'child@test.kr', role: 'child', password: 'secret1',
      // @ts-expect-error 의도적으로 false 전달
      consentPrivacy: false, consentTerms: true, ageOver14: true,
    }),
  );

  const childReg = await anon.auth.register({
    name: '자녀', email: 'child@test.kr', role: 'child', password: 'secret1',
    consentPrivacy: true, consentTerms: true, ageOver14: true,
    consentAnalytics: false, consentMarketing: false,
  });
  ok('필수 동의 시 가입 성공', !!childReg.user.id);

  const childConsents = await prisma.consent.findMany({ where: { userId: childReg.user.id } });
  ok('항목별 동의 5건 기록(버전 포함)', childConsents.length === 5 && childConsents.every((c) => !!c.version));

  const parentReg = await anon.auth.register({
    name: '부모', email: 'parent@test.kr', role: 'parent', password: 'secret1',
    consentPrivacy: true, consentTerms: true, ageOver14: true,
    consentAnalytics: true, consentMarketing: false,
  });

  console.log('\n[2] 선택(IP수집) 미동의 시 식별정보 미수집');
  await anon.auth.login({ emailOrPhone: 'child@test.kr', password: 'secret1' });
  await anon.auth.login({ emailOrPhone: 'parent@test.kr', password: 'secret1' });
  const childLog = await prisma.accessLog.findFirst({ where: { userId: childReg.user.id }, orderBy: { createdAt: 'desc' } });
  const parentLog = await prisma.accessLog.findFirst({ where: { userId: parentReg.user.id }, orderBy: { createdAt: 'desc' } });
  ok('미동의 사용자: IP·이메일·이름 미기록', !!childLog && !childLog.ipAddress && !childLog.email && !childLog.name);
  ok('동의 사용자: IP 기록', !!parentLog && parentLog.ipAddress === '203.0.113.7');

  console.log('\n[3] 연결(초대 코드)');
  const child = caller(childReg.user.id);
  const parent = caller(parentReg.user.id);
  const invite = await child.connection.createInvite({ tone: 'light' });
  await parent.connection.acceptInvite({ inviteCode: invite.code });
  const conns = await child.connection.list();
  const conn = conns[0];
  ok('초대 수락으로 연결 생성 (부모=fromUser)', !!conn && conn.fromUserId === parentReg.user.id && conn.toUserId === childReg.user.id);

  console.log('\n[4] 자녀 질문 → 부모 답변(글/사진/영상/음성) → 반응');
  await child.question.sendCustom({ connectionId: conn.id, body: '어릴 때 제일 좋아한 놀이는 뭐였어요?', depth: 1, chapterTag: '유년기' });
  const todayQ = await parent.question.today({ connectionId: conn.id });
  ok('부모가 오늘의 질문 수신', !!todayQ && todayQ.body.includes('놀이'));

  await parent.answer.submit({ questionId: todayQ!.id, format: 'text', body: '구슬치기를 제일 좋아했지.', isPrivate: false });

  // 미디어 답변 — 사진/영상/음성 각각 (스토리지 어댑터 업로드 → URL 저장 → 재조회)
  const { createStorageAdapter } = await import('@maeum/storage');
  const storage = createStorageAdapter();
  for (const [format, ext, mime] of [['photo', 'jpg', 'image/jpeg'], ['video', 'mp4', 'video/mp4'], ['audio', 'm4a', 'audio/mp4']] as const) {
    const q = await child.question.sendCustom({ connectionId: conn.id, body: `${format} 질문입니다 — 보여주실 수 있어요?`, depth: 1, chapterTag: '지금의 나' });
    const url = await storage.upload(`media/${parentReg.user.id}/e2e-${format}.${ext}`, Buffer.from(`fake-${format}`), mime);
    await parent.answer.submit({
      questionId: q.questionId!, format, mediaUrl: url,
      transcript: format === 'audio' ? '(음성 전사 Mock)' : undefined, isPrivate: false,
    });
    const list = await child.question.list({ connectionId: conn.id, limit: 50 });
    const saved = list.questions.find((x) => x.id === q.questionId)?.answer;
    ok(`${format} 답변: 업로드→저장→재조회 표시`, !!saved && saved.mediaUrl === url && saved.format === format);
  }

  // 비공개 마스킹
  const qPrivate = await child.question.sendCustom({ connectionId: conn.id, body: '혼자 간직하고 싶은 이야기가 있어요?', depth: 3 });
  await parent.answer.submit({ questionId: qPrivate.questionId!, format: 'text', body: '비밀 이야기', isPrivate: true });
  const childView = await child.question.list({ connectionId: conn.id, limit: 50 });
  const maskedA = childView.questions.find((x) => x.id === qPrivate.questionId)?.answer as { masked?: boolean; body: string | null };
  ok('비공개 답변은 자녀에게 마스킹', !!maskedA?.masked && maskedA.body === null);

  // 자녀 반응 + 되묻기 → 후속 질문 큐 → 다음 발송 시 최우선 전달
  const firstAnswer = childView.questions.find((x) => x.answer && !(x.answer as { masked?: boolean }).masked)!.answer!;
  await child.reaction.add({ answerId: firstAnswer.id, emoji: '❤️' });
  await child.reaction.add({ answerId: firstAnswer.id, comment: '그때 누구랑 같이 놀았어요?', isFollowup: true });
  const followupQueued = await prisma.question.findFirst({ where: { connectionId: conn.id, source: 'followup', sentAt: null } });
  ok('되묻기 → 후속 질문 큐 등록', !!followupQueued);
  const sendResult = await child.question.send({ connectionId: conn.id });
  ok('후속 질문이 최우선 발송', sendResult.sent === true && (sendResult as { questionId?: string }).questionId === followupQueued?.id);

  console.log('\n[5] 부모 자발 메시지 (먼저 마음 전하기)');
  await expectThrow('자녀는 자발 메시지 발송 불가(FORBIDDEN)', () =>
    child.message.sendToChild({ connectionId: conn.id, format: 'text', body: '내가 보낼래' }),
  );
  const msg = await parent.message.sendToChild({ connectionId: conn.id, format: 'text', body: '오늘 문득 네 생각이 나서 적어본다.' });
  const msgQ = await prisma.question.findUnique({ where: { id: msg.questionId }, include: { answer: true } });
  ok('parent_message + parent_initiated + 챕터 너에게', msgQ?.source === 'parent_message' && msgQ.answer?.origin === 'parent_initiated' && msgQ.chapterTag === '너에게');
  await child.reaction.add({ answerId: msg.answerId, emoji: '🙏', comment: '고마워요 아빠' });
  const msgFeed = await child.question.list({ connectionId: conn.id, limit: 50 });
  const msgItem = msgFeed.questions.find((x) => x.id === msg.questionId);
  ok('자발 메시지가 자녀 피드에 도착 + 반응 표시', !!msgItem?.answer && (msgItem.answer.reactions as unknown[]).length === 1);

  console.log('\n[6] 책 생성 — 질문 응답 + 자발 메시지 모두 포함, 비공개 제외');
  const edition = await generateBook(prisma, conn.id, 'interim');
  const chapters = edition.chapterData as Record<string, { markdown: string }>;
  ok('책 생성 성공', edition.status === 'generated');
  ok('자발 메시지가 "너에게" 챕터에 포함', chapters['너에게']?.markdown.includes('네 생각이 나서'));
  ok('질문 응답이 챕터에 포함', chapters['유년기']?.markdown.includes('구슬치기'));
  ok('비공개 답변은 책에서 제외', !JSON.stringify(chapters).includes('비밀 이야기'));

  console.log('\n[7] 권한 — 가족 외 접근 차단');
  const strangerReg = await anon.auth.register({
    name: '외부인', email: 'stranger@test.kr', role: 'child', password: 'secret1',
    consentPrivacy: true, consentTerms: true, ageOver14: true,
  });
  const stranger = caller(strangerReg.user.id);
  await expectThrow('외부인 피드 접근 차단', () => stranger.question.list({ connectionId: conn.id, limit: 10 }), 'FORBIDDEN');
  await expectThrow('외부인 답변 제출 차단', () => stranger.answer.submit({ questionId: todayQ!.id, format: 'text', body: 'x' }));
  await expectThrow('외부인 반응 차단', () => stranger.reaction.add({ answerId: firstAnswer.id, emoji: '😈' }));
  await expectThrow('비로그인 admin 차단', () => anon.admin.isAdmin());

  console.log('\n[8] 민감 상황 게이트 — 발송 차단');
  await prisma.connection.update({ where: { id: conn.id }, data: { sensitiveStatus: 'paused_health' } });
  const blocked = await child.question.send({ connectionId: conn.id });
  ok('paused_health 상태에서 자동 발송 차단', blocked.sent === false);
  const blockedCustom = await child.question.sendCustom({ connectionId: conn.id, body: '이 질문은 차단되어야 해요. 맞나요?', depth: 1 });
  ok('paused_health 상태에서 직접 질문도 차단', blockedCustom.sent === false);
  await prisma.connection.update({ where: { id: conn.id }, data: { sensitiveStatus: 'active' } });

  console.log(`\n결과: ${passed} 통과 / ${failed} 실패`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('E2E 실행 오류:', e);
  process.exit(1);
});
