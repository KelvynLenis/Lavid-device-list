import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(token: string) {
  try {
    const result = cookies().set(
      'session',
      token,
      {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      }
    );

    return result
  } catch (error) {
    console.error(error);
  }
}