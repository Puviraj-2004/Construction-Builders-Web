import { NextResponse } from "next/server";
import { getRuntimeEnv } from "@/lib/runtime-env";

export async function POST(request: Request) {
  const { passcode } = await request.json().catch(() => ({ passcode: "" }));
  const expectedPasscode = await getRuntimeEnv("UPLOAD_PASSCODE");

  if (!expectedPasscode) {
    return NextResponse.json(
      { ok: false, message: "Upload passcode is not configured." },
      { status: 500 }
    );
  }

  if (passcode !== expectedPasscode) {
    return NextResponse.json(
      { ok: false, message: "Incorrect passcode." },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
