"use server";

import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Paths } from "@/constants/paths";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect(Paths.DASHBOARD);
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-black/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-black/60 text-center">
            Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />

          <Button
            type="button"
            variant="outline"
            className="border-black shadow hover:bg-black hover:text-white w-full mt-2"
            asChild
          >
            <Link href={Paths.HOME}>Go Back</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
