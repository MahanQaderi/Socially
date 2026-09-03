import { useState } from "react";
import { Send, Trash2, Pencil } from "lucide-react";
import { useAddNewCommentMutation } from "../../hooks/useCreateNewCommentMutation";
import type { PostType } from "../../types/AllPostsTypes";
import { useAuthStore } from "../../store/authStore";
import DeleteCommentModal from "./DeleteCommentModal";
import UpdateCommentModal from "./UpdateCommentModal";
import Avatar from "../Ui/Avatar";
import { SpinnerXs } from "../Ui/Spinner";
import { Link } from "react-router";
import { splitUsername } from "../../utils/splitUsername";
import { getTimeAgo } from "../../utils/getTimeAgo";

type CommentProps = {
  post: PostType;
};

export default function Comment({ post }: CommentProps) {
  const [text, setText] = useState("");

  const { user } = useAuthStore();
  const [isOpenDeleteCommentModal, setIsOpenDeleteCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const [isShowEditCommentModal, setIsShowEditCommentModal] = useState(false);
  const [selectedEditCommentId, setSelectedEditCommentId] = useState<string | null>(null);
  const [selectedEditCommentContent, setSelectedEditCommentContent] = useState<string>("");
  const { mutate: addNewCommentMutation, isPending: isCommenting } =
    useAddNewCommentMutation();

  const isTooShort = text.trim().length > 0 && text.trim().length < 5;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitComment();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // ctrl/cmd + enter sends the comment without reaching for the mouse
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      submitComment();
    }
  };

  const submitComment = () => {
    if (!text.trim() || isTooShort || isCommenting) return;

    addNewCommentMutation(
      {
        id: post.id,
        content: text.trim(),
      },
      {
        onSuccess: () => {
          setText("");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 pt-4 border-t border-[#E5E5E5] animate-fade-up dark:border-[#262626] "
    >
      {post.comments?.map((comment) => (
        <div key={comment.id} className="flex flex-col mb-5">
          <div className="flex items-start gap-3">
            <Avatar
              src={comment.author.image}
              width={40}
              height={40}
              alt={comment.author.name}
            />

            <div className="w-full">
              <div className="flex flex-wrap justify-start items-center gap-x-2 gap-y-1">
                <Link
                  to={`/profile/${splitUsername(comment.author.email)}`}
                  className="font-semibold text-[#171717] transition-colors duration-200 hover:text-[#3B82F6] dark:text-[#FAFAFA] dark:hover:text-[#3B82F6]"
                >
                  {comment.author.name}
                </Link>

                <p className="text-[#737373] dark:text-[#A3A3A3] text-[14px]">
                  @{splitUsername(comment.author.email)}
                </p>

                <p className="text-[#737373] dark:text-[#A3A3A3] text-[14px] hidden md:block">
                  &middot; {getTimeAgo(comment.createdAt)}
                </p>
                {user?.email && user.email === comment.author.email && (
                  <div className="ml-auto flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Edit comment"
                      onClick={() => {
                        setSelectedEditCommentId(comment.id);
                        setSelectedEditCommentContent(comment.content);
                        setIsShowEditCommentModal(true);
                      }}
                      className="text-[#737373] hover:text-[#3B82F6] transition-colors"
                    >
                      <Pencil
                        size={18}
                        strokeWidth={1.8}
                        className="text-[#737373] transition-all duration-200 hover:scale-110 hover:text-[#3B82F6] dark:text-[#A3A3A3] dark:hover:text-[#3B82F6]"
                      />
                    </button>

                    <button
                      type="button"
                      aria-label="Delete comment"
                      onClick={() => {
                        setSelectedCommentId(comment.id);
                        setIsOpenDeleteCommentModal(true);
                      }}
                      className="text-[#737373] hover:text-red-500 transition-colors"
                    >
                      <Trash2
                        size={18}
                        strokeWidth={1.8}
                        className="text-[#737373] transition-all duration-200 hover:scale-110 hover:text-red-500 dark:text-[#A3A3A3] dark:hover:text-red-400"
                      />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-1 break-words leading-6 text-[#171717] dark:text-[#FAFAFA]">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <Avatar src={user?.image} width={40} height={40} />
        </div>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            rows={4}
            disabled={isCommenting}
            className="shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-full resize-none rounded-lg border border-[#E5E5E5] bg-transparent p-3
                        text-sm leading-5 text-[#171717] outline-none transition-all duration-200 placeholder:text-[#737373] focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] disabled:opacity-60
                        dark:border-[#404040] dark:text-[#FAFAFA] dark:placeholder:text-[#A3A3A3] dark:focus:border-[#3B82F6]"
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              {isTooShort ? "A comment needs at least 5 characters." : ""}
            </p>

            <button
              type="submit"
              disabled={!text.trim() || isTooShort || isCommenting}
              className=" flex h-9 min-w-25 items-center justify-center gap-2 rounded-md bg-[#262626] px-4 text-sm text-white shadow-sm transition-all duration-200
                        hover:-translate-y-0.5 hover:bg-[#171717] hover:shadow-md
                        dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5]
                        disabled:cursor-not-allowed disabled:bg-[rgb(var(--color-disabled-bg))] disabled:text-[rgb(var(--color-disabled-text))] disabled:shadow-none"
            >
              {isCommenting ? (
                <SpinnerXs />
              ) : (
                <Send size={15} strokeWidth={1.8} />
              )}
              <span>{isCommenting ? "Sending..." : "Comment"}</span>
            </button>
          </div>
        </div>
      </div>

      <DeleteCommentModal
        isOpen={isOpenDeleteCommentModal}
        onClose={() => {
          setIsOpenDeleteCommentModal(false);
          setSelectedCommentId(null);
        }}
        postId={post.id}
        commentId={selectedCommentId}
      />
      {selectedEditCommentId && (
        <UpdateCommentModal
          isOpen={isShowEditCommentModal}
          onClose={() => {
            setIsShowEditCommentModal(false);
            setSelectedEditCommentId(null);
            setSelectedEditCommentContent("");
          }}
          postId={post.id}
          commentId={selectedEditCommentId}
          initialContent={selectedEditCommentContent}
        />
      )}
    </form>
  );
}
