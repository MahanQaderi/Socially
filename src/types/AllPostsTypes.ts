export type User = {
  id?: string;
  name: string;
  email: string;
  image: string | null;
};

export type Like = {
  userId: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
};

export type PostType = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  image?: string | null;
  author: User;
  likes: Like[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
};

export type Posts = PostType[];
