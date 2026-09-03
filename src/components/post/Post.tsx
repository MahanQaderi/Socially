import Avatar from "../Ui/Avatar";
import { Edit, Heart, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import Comment from "./Comment";
import type { PostType } from "../../types/AllPostsTypes";
import { useToggleLikedPostsMutation } from "../../hooks/useToggleLikedPostsMutation";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router";
import { splitUsername } from "../../utils/splitUsername";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { getProfileImageURL } from "../../utils/getProfileImgeURL";
import { useDeletePost } from "../../hooks/useDeletePost";
import DeleteModal from "./DeleteModal";
import EditPostModal from "./EditPostModal";
import toast from "react-hot-toast";
import { useEditPost } from "../../hooks/useEditPostMutation";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { user } = useAuthStore();

  const isLiked = post.likes.some((like) => like.userId === user?.id);
  const isMyPost = user?.id === post.authorId;

  const { mutate: toggleLikedPostMutation } = useToggleLikedPostsMutation();

  const {
    mutate: toggleDeletedPostMutation,
    isPending: isPendingToggleDelete,
  } = useDeletePost();

  const { mutate: editPostMutation, isPending: isEditingPost } = useEditPost();

  const toggleComment = () => {
    setIsCommentOpen((prev) => !prev);
  };

  const toggleLikeHandler = () => {
    toggleLikedPostMutation({
      id: post.id,
    });
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    toggleDeletedPostMutation(post.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  function handleEditPost() {
    setIsEditModalOpen(true);
  }

  const username = splitUsername(post.author.email);

  return (
    <div className="my-5 min-h-40 rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
      {/* Author */}
      <div className="flex w-full items-center gap-3">
        <Link to={`/profile/${username}`}>
          <Avatar
            src={post.author.image}
            width={40}
            height={40}
            alt={post.author.name}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              to={`/profile/${username}`}
              className="font-semibold break-words text-[#171717] transition-colors duration-200 hover:text-[#3B82F6] dark:text-[#FAFAFA] dark:hover:text-[#3B82F6]"
            >
              {post.author.name}
            </Link>

            <p className="text-[14px] text-[#737373] dark:text-[#A3A3A3]">
              @{username}
            </p>

            <p className="hidden text-[14px] text-[#737373] dark:text-[#A3A3A3] md:block">
              &middot; {getTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        {isMyPost && (
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleEditPost()}
              aria-label="Edit post"
              className="shrink-0"
            >
              <Edit
                width={17}
                height={17}
                className="cursor-pointer text-[#737373] transition-all duration-200 hover:scale-110 hover:text-green-600 dark:text-[#A3A3A3]"
              />
            </button>
            <button
              type="button"
              onClick={handleOpenDeleteModal}
              aria-label="Delete post"
              className="shrink-0"
            >
              <Trash2
                width={17}
                height={17}
                className="cursor-pointer text-[#737373] transition-all duration-200 hover:scale-110 hover:text-red-600 dark:text-[#A3A3A3] dark:hover:text-red-400"
              />
            </button>
          </div>
        )}
      </div>

      {/* post img */}
      <div className="mt-4 whitespace-pre-line">
        {post.image && (
          <img
            src={getProfileImageURL(post.image, "post") ?? ""}
            className="mx-auto max-h-125 max-w-full rounded-xl bg-[#F1F2F4] object-contain dark:bg-[#0F0F0F]"
            alt="post-img"
            loading="lazy"
          />
        )}
      </div>

      {/* Content */}
      <p className="mt-4 whitespace-pre-line break-words leading-7 text-[#171717] dark:text-[#FAFAFA]">
        {post.content}
      </p>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-start gap-6 border-t border-[#F0F0F0] pt-4 dark:border-[#1F1F1F]">
        {/* Like - the api refuses likes on your own post, so it is only a counter there */}
        {isMyPost ? (
          <div className="flex items-center gap-2 text-[#737373] dark:text-[#A3A3A3]">
            <Heart size={16} />
            <p>{post._count.likes}</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleLikeHandler}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className="group flex cursor-pointer items-center justify-between gap-2"
          >
            <Heart
              size={16}
              className={`transition-all duration-200 group-hover:scale-125 ${
                isLiked
                  ? "animate-pop text-[#EF4444]"
                  : "text-[#171717] group-hover:text-[#EF4444] dark:text-[#FAFAFA]"
              }`}
              fill={isLiked ? "#EF4444" : "none"}
            />

            <p
              className={`transition-colors duration-200 ${
                isLiked
                  ? "text-[#EF4444]"
                  : "text-[#171717] dark:text-[#FAFAFA]"
              }`}
            >
              {post._count.likes}
            </p>
          </button>
        )}

        {/* Comments */}
        <button
          type="button"
          onClick={toggleComment}
          aria-expanded={isCommentOpen}
          className="group flex cursor-pointer items-center justify-between gap-2"
        >
          <MessageCircle
            size={16}
            className={`transition-all duration-200 group-hover:scale-125 ${
              isCommentOpen
                ? "text-[#3B82F6]"
                : "text-[#171717] group-hover:text-[#3B82F6] dark:text-[#FAFAFA]"
            }`}
            fill={isCommentOpen ? "#3B82F6" : "none"}
          />

          <p
            className={`transition-colors duration-200 ${
              isCommentOpen
                ? "text-[#3B82F6]"
                : "text-[#171717] dark:text-[#FAFAFA]"
            }`}
          >
            {post.comments.length}
          </p>
        </button>
      </div>

      {/* Comments */}
      {isCommentOpen && <Comment post={post} />}

      {isEditModalOpen && (
        <EditPostModal
          text={post.content}
          image={post.image}
          isSaving={isEditingPost}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSave={(data) => {
            editPostMutation(
              {
                postId: post.id,
                payload: {
                  image: data.imageId,
                  content: data.text,
                },
              },
              {
                onSuccess: async () => {
                  toast.success("Post updated successfully");
                  setIsEditModalOpen(false);
                },

                onError: () => {
                  toast.error("Failed to update post");
                },
              },
            );
          }}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isPendingToggleDelete}
      />
    </div>
  );
}
