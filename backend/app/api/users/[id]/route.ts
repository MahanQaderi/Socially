import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { editProfileSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to toggle follow",
          success: false,
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
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

    if (user.id === session.user.id) {
      return NextResponse.json(
        {
          message: "You cannot follow yourself",
          success: false,
        },
        { status: 400 },
      );
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: user.id,
        },
      },
    });

    if (follow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: user.id,
          },
        },
      });

      return NextResponse.json({
        message: "User unfollowed successfully",
        success: true,
      });
    } else {
      await prisma.$transaction([
        prisma.follow.create({
          data: { followerId: session.user.id, followingId: user.id },
        }),
        prisma.notification.create({
          data: { type: "FOLLOW", creatorId: session.user.id, userId: user.id },
        }),
      ]);

      return NextResponse.json({
        message: "User followed successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to toggle follow",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await request.json();
  const { id } = await params;

  const validatedFields = editProfileSchema.safeParse(body);
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
          message: "You must be logged in to update your profile",
          success: false,
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
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

    if (user.id !== session.user.id) {
      return NextResponse.json(
        {
          message: "You are not authorized to update this profile",
          success: false,
        },
        { status: 401 },
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { ...validatedFields.data },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update profile",
        success: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
