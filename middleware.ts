export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/budgets/:path*", "/goals/:path*", "/investments/:path*", "/analytics/:path*", "/assistant/:path*", "/notifications/:path*", "/settings/:path*"]
};
