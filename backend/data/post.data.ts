import prisma from "@/lib/prisma";

export async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        author: { select: { name: true, email: true, image: true } },
        likes: { select: { userId: true } },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: { select: { name: true, email: true, image: true } },
          },
        },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getPostsByUserId(userId: string) {
  try {
    return prisma.post.findMany({
      where: { authorId: userId },
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
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
