import { auth } from "@/lib/auth";
import { signUpSchema } from "@/schemas/auth.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedFields = signUpSchema.safeParse(body);
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
    const res = await auth.api.signUpEmail({
      body: { ...validatedFields.data, callbackURL: "/" },
    });

    return NextResponse.json(
      {
        message: "Register successful",
        success: true,
        data: res,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to register",
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
