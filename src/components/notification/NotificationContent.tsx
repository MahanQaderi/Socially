import { Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import type { NotificationTypes } from "../../types/NotificationTypes";
import { Link } from "react-router";
import { splitUsername } from "../../utils/splitUsername";
import { getProfileImageURL } from "../../utils/getProfileImgeURL";

// the post the notification refers to - its image only shows up if the api
// selected it, see the notifications route
const PostPreview = ({ post }: { post: NotificationTypes["post"] }) => (
  <div className="flex items-start gap-3">
    <p className="min-w-0 flex-1 text-sm leading-6 break-words text-gray-700 dark:text-gray-300">
      {post?.content}
    </p>

    {post?.image && (
      <img
        src={getProfileImageURL(post.image, "thumbnail") ?? ""}
        className="size-16 shrink-0 rounded-lg bg-[#F1F2F4] object-cover dark:bg-[#0F0F0F]"
        alt="post-img"
        loading="lazy"
      />
    )}
  </div>
);

const NotificationContent = ( notification: NotificationTypes) => {
  switch (notification.type) {
    case "LIKE":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Heart size={20} className="shrink-0 text-red-500" stroke="red" />

            <Link to={`/profile/${splitUsername(notification.creator.email)}`} className="font-semibold text-gray-900 dark:text-white">
              {notification.creator.name}
            </Link>

            <span className="text-gray-500 dark:text-gray-400">
              liked your post
            </span>
          </div>

          <PostPreview post={notification.post} />

        </div>
      );

    case "COMMENT":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <MessageCircle size={20} className="shrink-0 text-blue-500" />

            <Link to={`/profile/${splitUsername(notification.creator.email)}`} className="font-semibold text-gray-900 dark:text-white">
              {notification.creator.name}
            </Link>

            <span className="text-gray-500 dark:text-gray-400">
              commented on your post
            </span>
          </div>

          <PostPreview post={notification.post} />

          <div className="rounded-lg border-l-2 border-[#3B82F6]/40 bg-[#F1F2F4] px-3 py-2 dark:bg-[#0F0F0F]">
            <p className="text-sm leading-6 break-words text-gray-600 dark:text-gray-300">
              {notification.comment?.content}
            </p>
          </div>

          
        </div>
      );

    case "FOLLOW":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <UserRoundPlus size={20} className="shrink-0 text-green-500" />

            <Link to={`/profile/${splitUsername(notification.creator.email)}`} className="font-semibold text-gray-900 dark:text-white">
              {notification.creator.name}
            </Link>

            <span className="text-gray-500 dark:text-gray-400">
              started following you
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default NotificationContent;
