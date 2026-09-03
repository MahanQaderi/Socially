import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to fetch notifications",
          success: false,
        },
        { status: 401 },
      );
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id },
      include: {
        creator: { select: { id: true, name: true, image: true, email: true } },
        post: { select: { content: true, image: true } },
        comment: { select: { content: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Notifications fetched successfully",
      success: true,
      data: notifications,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching notifications",
      success: false,
      error: (error as Error).message,
    });
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        success: false,
      },
      { status: 400 },
    );
  }

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to mark notifications as read",
          success: false,
        },
        { status: 401 },
      );
    }

    await prisma.notification.updateMany({
      where: { id: { in: body.ids } },
      data: { read: true },
    });

    return NextResponse.json({
      message: "Notifications marked as read successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error mark notifications as read",
      success: false,
      error: (error as Error).message,
    });
  }
}
