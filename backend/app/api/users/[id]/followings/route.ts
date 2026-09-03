import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to fetch followings",
          success: false,
        },
        { status: 401 },
      );
    }

    const followers = await prisma.follow.findMany({
      where: {
        followerId: id,
      },
      select: {
        createdAt: true,
        following: {
          select: { name: true, email: true, id: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Followings fetched successfully",
      success: true,
      data: followers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch followings",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
