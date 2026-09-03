import { auth } from "@/lib/auth";
import { signInSchema } from "@/schemas/auth.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedFields = signInSchema.safeParse(body);
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        message: "Invalid fields",
        success: false,
        error: z.treeifyError(validatedFields.error).properties,
      },
      { status: 400 }
    );
  }

  try {
    const res = await auth.api.signInEmail({
      body: { ...validatedFields.data, callbackURL: "/" },
      headers: request.headers,
    });

    return NextResponse.json({
      message: "Login successful",
      success: true,
      data: res,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to login",
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
