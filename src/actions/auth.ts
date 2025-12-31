"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export interface LoginResult {
  ok: boolean;
  errorMessage?: string;
  email?: string;
}

export async function login(
  state: LoginResult,
  formData: FormData,
): Promise<LoginResult> {
  const email = formData.get("email") as string;
  try {
    await signIn("credentials", formData);
    return { ok: true };
  } catch (error) {
    console.error("login error", error);
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { ok: false, errorMessage: "Invalid credentials", email };
        default:
          return { ok: false, errorMessage: "Something went wrong.", email };
      }
    }
    throw error;
  }
}
