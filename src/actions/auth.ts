'use client';
import { isProtectedRoute } from '@/auth';
import { signIn, signOut } from 'next-auth/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type LoginResult = {
  ok: boolean;
  errorMessage?: string;
  email?: string;
}

export async function login(
  router: AppRouterInstance,
  pathname: string,
  prevState: LoginResult,
  formData: FormData,
): Promise<LoginResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false
  });

  if(!res?.ok) {
    switch (res?.error) {
    case 'CredentialsSignin':
      return {errorMessage: 'Invalid credentials.', email, ok: false};
    default:
      return {errorMessage: 'Something went wrong.', email, ok: false};
    }
  }

  if(pathname.startsWith('/login')) {
    router.push('/dashboard');
  }

  return {ok: true};
}

export async function logout(router: AppRouterInstance, pathname: string) {
  if (isProtectedRoute(pathname)) {
    // We push to '/' before signOut to prevent the LoginDialog from appearing.
    // This fixes an issue where the dialog would briefly show when logging out from a protected route (useEffect in LoginDialog),
    // because the component would re-render as unauthenticated while still on the protected path.
    router.push('/');
  }
  await signOut({
    redirect: false,
    callbackUrl: '/',
  });
}
