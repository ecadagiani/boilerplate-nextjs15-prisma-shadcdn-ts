'use client';

import type { LoginResult } from '@/actions/auth';
import { login } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

type LoginFormProps = {
  onSuccess?: () => void;
}

export default function LoginForm({onSuccess}: LoginFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [loginState, formAction, isPending] = useActionState<LoginResult, FormData>(
    login.bind(null, router, pathname),
    {ok: false},
  );

  useEffect(() => {
    if(loginState.ok && onSuccess) {
      onSuccess();
    }
  }, [loginState, onSuccess]);
  
  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="border-gray-300"
          required
          defaultValue={loginState?.email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="border-gray-300"
          required
          minLength={6}
        />
      </div>
      {loginState?.errorMessage && (
        <div className="flex items-center gap-2 p-4 border border-zinc-200 bg-zinc-50 rounded-lg shadow-sm animate-in fade-in duration-200">
          <div className="min-w-4 min-h-4 rounded-full bg-black"></div>
          <p className="text-sm font-medium text-zinc-900">{loginState?.errorMessage}</p>
        </div>
      )}
      <Button className="w-full mt-2" type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
}