import prisma from "@/lib/prisma";

export async function getUserNotifications(userId: string) {
  try {
    return await prisma.notification.findMany({
      where: { userId },
      include: {
        creator: { select: { id: true, name: true, image: true, email: true } },
        post: { select: { content: true, image: true } },
        comment: { select: { content: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
