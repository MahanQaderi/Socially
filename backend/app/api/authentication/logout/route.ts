import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await auth.api.signOut({ headers: request.headers });

    if (res.success) {
      return NextResponse.json({
        message: "Logout successful",
        success: true,
      });
    } else {
      return NextResponse.json(
        {
          message: "Logout failed",
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to logout",
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
