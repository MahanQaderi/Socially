export type NotificationType = "LIKE" | "COMMENT" | "FOLLOW";

export interface NotificationTypes {
  id: string;
  userId: string;
  creatorId: string;
  postId: string | null;
  commentId: string | null;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
  post: {
    content: string;
    image: string | null;
  } | null;
  comment: {
    content: string;
  } | null;
}
