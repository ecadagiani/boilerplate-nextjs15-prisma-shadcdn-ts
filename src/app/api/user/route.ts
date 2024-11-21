
import { auth } from "@/auth";
import prisma from "@/lib/db";
import type { UserWithoutPassword } from "@/types/users";
import type { User } from "@prisma/client";
import { NextResponse } from 'next/server';
import { z } from "zod";


export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if(user) return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function GET(request: Request): Promise<NextResponse<{ user: UserWithoutPassword} | {error: string}>> {
  const session = await auth();
  console.log('GET session', session);
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const parsedEmail = z.string().email().safeParse(email);
    if (!parsedEmail.success) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    if(!email) throw new Error('Email is required');
    const user = await getUser(email);
    if(!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });

  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch user.' }, { status: 500 });
  }
}

