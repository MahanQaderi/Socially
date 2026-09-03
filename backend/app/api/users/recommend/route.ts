import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to fetch recommended users",
          success: false,
        },
        { status: 401 },
      );
    }

    const users = await prisma.user.findMany({
      where: {
        id: { not: session.user.id },
        followers: { none: { followerId: session.user.id } },
      },
      include: { _count: { select: { followers: true } } },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Recommended users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch recommended users",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
