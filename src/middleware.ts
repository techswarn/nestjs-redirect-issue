import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export default  function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`===> Middleware running, pathname: ${pathname}`);
  console.log(JSON.stringify(request));

  if (pathname === '/log-out') {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('jwt', '', { path: '/', expires: new Date(0) });
    return response;
  }

  const token = cookies().get('jwt');

  if (!token && pathname !== '/') {
    console.log('No token, redirecting to /');
    return NextResponse.redirect(new URL('/', request.url));
  }
  console.log('Token found, continuing');

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|img/|favicon.ico).*)",
  ],
}
