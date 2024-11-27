import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  /** 로그인 페이지 접근 차단: LocalStorage 대신 쿠키로 로그인 여부 확인 */
  const user = request.cookies.get("user"); // 쿠키에서 user 정보 확인 (예: 서버에서 쿠키로 사용자 정보 전달)

  /** 사용자가 로그인 상태일 때, 로그인 페이지에 접근하면 리다이렉트 */
  if (request.nextUrl.pathname === "/" && user) {
    /** 로그인 상태이면 콘텐츠 페이지로 리다이렉트 */
    return NextResponse.redirect(new URL("/board", request.url));
  }

  /** 사용자가 로그인 되지 않았을 경우, /board 페이지 같은 콘텐츠 페이지 접근했을 시 로그인 페이지로 리다이렉트 */
  if (request.nextUrl.pathname.startsWith("/board") && !user) {
    /** 비로그인 상태이면 로그인 페이지로 리다이렉트 */
    return NextResponse.redirect(new URL("/", request.url));
  }

  /** 기본적인 요청을 그대로 진행 */
  return NextResponse.next();
}

/** 미들웨어가 적용될 경로를 설정(모든 경로에 미들웨어 적용) */
export const config = {
  matcher: ["/", "/board/:path*"],
};
