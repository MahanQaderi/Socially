import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { _count: { select: { followers: true, followings: true } } },
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

    const posts = await prisma.post.findMany({
      where: { authorId: id },
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, email: true, image: true, name: true } },
        likes: { select: { userId: true } },
        comments: {
          select: {
            id: true,
            content: true,
            author: {
              select: { id: true, email: true, image: true, name: true },
            },
            createdAt: true,
          },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });

    return NextResponse.json({
      message: "Posts fetched successfully",
      success: true,
      data: posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch posts",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
