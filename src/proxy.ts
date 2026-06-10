import { NextResponse, type NextRequest } from 'next/server';
import { isFdRouteActive } from '@/lib/active';

// 공개 차단: ACTIVE_PCS에 없는 fd 라우트(pc2-*, pc3-* 등)는 루트로 리다이렉트한다.
// 코드·파일은 그대로 두고 접근만 막으므로, ACTIVE_PCS 값만 바꾸면 다시 공개된다.
// Next 16: middleware → proxy 컨벤션 (동작 동일).
export function proxy(req: NextRequest) {
  // 차단은 프로덕션에서만. 개발 환경에서는 내부 데모(/admin/demo)로 전체 라우트를 검토할 수 있게 둔다.
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const { pathname } = req.nextUrl;
  // /fd/<segment>/... 에서 첫 세그먼트 추출
  const match = pathname.match(/^\/fd\/([^/]+)/);
  if (match) {
    const segment = decodeURIComponent(match[1]);
    if (!isFdRouteActive(segment)) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/fd/:path*'],
};
