import prisma from "@/lib/prisma";

export async function getUserById(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: { _count: { select: { followers: true, followings: true } } },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getRecommendedUsers(userId: string) {
  try {
    return await prisma.user.findMany({
      where: {
        id: { not: userId },
        followers: { none: { followerId: userId } },
      },
      include: { _count: { select: { followers: true } } },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getUserByEmail(email: string) {
  try {
    return prisma.user.findUnique({
      where: { email },
      include: {
        _count: { select: { followers: true, followings: true, posts: true } },
        followers: { select: { followerId: true } },
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
