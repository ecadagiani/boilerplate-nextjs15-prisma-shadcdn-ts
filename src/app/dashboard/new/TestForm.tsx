"use client";

import type { State } from '@/app/actions/test';
import { actionTest } from '@/app/actions/test';
import { useActionState } from 'react';

export default function TestForm() {
  const [state, submitAction, isPending] = useActionState<State, FormData>(actionTest, {error: null, ok: true});

  console.log({state, isPending});

  return (
    <form action={submitAction}>
      <input
        type="text" name="name" disabled={isPending} 
        className="border border-gray-300 rounded-md p-2"
      />
      {state?.error && <span>Failed: {state.error}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}