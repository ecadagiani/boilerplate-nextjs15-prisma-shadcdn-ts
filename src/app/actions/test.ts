'use server';

import { ensureServer } from "@/utils/ensureRuntime";

export type State = {
  ok: boolean;
  error: string | null;
}

export async function actionTest(prevState: State, formData: FormData): Promise<State> {
  ensureServer();
  console.log({prevState, formData});
  return { error: 'test', ok: false };
}