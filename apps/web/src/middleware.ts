import { NextResponse, type NextRequest } from 'next/server';

// 익명 방문자 식별: 첫 방문에서 maeum_aid 쿠키가 없으면 무작위 UUID를 발급한다.
// httpOnly(클라이언트 JS 접근 차단) · SameSite=Lax · 장기 만료. 이 값은 비식별 분석 단위일 뿐
// 개인 식별 정보가 아니므로 동의 전에도 발급/사용할 수 있다.
const COOKIE = 'maeum_aid';
const ONE_YEAR = 60 * 60 * 24 * 365;

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get(COOKIE)?.value) {
    res.cookies.set(COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ONE_YEAR,
    });
  }
  return res;
}

// 정적 자원·API·업로드는 제외하고 실제 페이지 진입에만 적용
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads).*)'],
};
