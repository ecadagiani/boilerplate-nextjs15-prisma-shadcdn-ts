import { NextResponse } from "next/server";

export function jsonData<T>(data: T, message: string = 'Success') {
  return NextResponse.json(
    { ...data, message },
  );
}

export function internalServerError(message: string = 'Internal server error') {
  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
}

export const unauthorized = (message: string = 'Unauthorized') => {
  return NextResponse.json({ error: message }, { status: 401 });
};

export const forbidden = (message: string = 'Forbidden') => {
  return NextResponse.json({ error: message }, { status: 403 });
};