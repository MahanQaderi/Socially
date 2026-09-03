import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createCommentSchema } from "@/schemas/post.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { id } = await params;

  const validatedFields = createCommentSchema.safeParse(body);
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
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to create a comment",
          success: false,
        },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });
    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
          success: false,
        },
        { status: 404 }
      );
    }

    if (post.authorId === session.user.id) {
      await prisma.comment.create({
        data: {
          authorId: session.user.id,
          postId: post.id,
          ...validatedFields.data,
        },
      });
    } else {
      prisma.$transaction(async (tx) => {
        const comment = await tx.comment.create({
          data: {
            authorId: session.user.id,
            postId: post.id,
            ...validatedFields.data,
          },
        });
        await tx.notification.create({
          data: {
            type: "COMMENT",
            commentId: comment.id,
            creatorId: session.user.id,
            userId: post.authorId,
            postId: post.id,
          },
        });
      });
    }

    return NextResponse.json(
      {
        message: "Comment created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create comment",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
