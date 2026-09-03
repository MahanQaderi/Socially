import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const email = `${id}@gmail.com`;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        _count: { select: { followers: true, followings: true, posts: true } },
        followers: { select: { followerId: true } },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
