"use client";

import type { LoginResult } from "@/actions/auth";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paths } from "@/constants/paths";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("callbackUrl") ?? Paths.HOME;

  const [loginState, formAction, isPending] = useActionState<
    LoginResult,
    FormData
  >(login, { ok: false });

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
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
          <div className="min-w-4 min-h-4 rounded-full bg-black" />
          <p className="text-sm font-medium text-zinc-900">
            {loginState?.errorMessage}
          </p>
        </div>
      )}
      <Button className="w-full mt-2" type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};
export default LoginForm;
