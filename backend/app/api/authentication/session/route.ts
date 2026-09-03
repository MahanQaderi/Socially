import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "Session not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Session retrieved",
      success: true,
      data: session,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to get session",
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
