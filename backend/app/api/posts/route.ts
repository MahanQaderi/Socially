import { getPosts } from "@/data/post.data";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/schemas/post.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const posts = await getPosts();

    return NextResponse.json({
      message: "Posts retrieved",
      success: true,
      data: posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to get posts",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedFields = createPostSchema.safeParse(body);
  if (!validatedFields.success) {
    return NextResponse.json(
      {
        message: "Invalid fields",
        success: false,
        error: z.treeifyError(validatedFields.error).properties,
      },
      { status: 400 },
    );
  }

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to create a post",
          success: false,
        },
        { status: 401 },
      );
    }

    const post = await prisma.post.create({
      data: { authorId: session.user.id, ...validatedFields.data },
    });

    return NextResponse.json(
      {
        message: "Post created",
        success: true,
        data: post,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create post",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
