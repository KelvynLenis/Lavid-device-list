import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next()

  const token = cookies().get('session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
}

export const config = {
  matcher: ['/map', '/home'], // Adapte com os caminhos que você deseja proteger
};
