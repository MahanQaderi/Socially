import { useState } from "react";
import { createPortal } from "react-dom";
import { useUpdateComment } from "../../hooks/useUpdateComment";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import { SpinnerXs } from "../Ui/Spinner";

type UpdateCommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  commentId: string;
  initialContent: string;
  onSuccess?: () => void | Promise<void>;
};

const UpdateCommentModal = ({
  isOpen,
  onClose,
  postId,
  commentId,
  initialContent,
  onSuccess,
}: UpdateCommentModalProps) => {
  const [text, setText] = useState(initialContent);
  const { mutate: updateComment, isPending } = useUpdateComment();

  useModalBehavior(onClose, isOpen && !isPending);

  if (!isOpen) return null;

  const content = text.trim();

  // the api rejects anything shorter than 5 characters
  const isTooShort = content.length > 0 && content.length < 5;
  const isUnchanged = content === initialContent.trim();

  const handleUpdate = () => {
    if (!content || isTooShort || isUnchanged || isPending) return;

    updateComment(
      { postId, commentId, content },
      {
        onSuccess: async () => {
          await onSuccess?.();
          onClose();
        },
      },
    );
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      onClick={isPending ? undefined : onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-modal animate-scale-in dark:border-[#2E2E2E] dark:bg-[#1C1C1C]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold text-[#171717] dark:text-[#FAFAFA]">
          Edit Comment
        </h2>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            maxLength={200}
            disabled={isPending}
            className="w-full resize-none rounded-lg border border-[#E5E5E5] bg-transparent p-3 text-sm leading-5 text-[#171717] shadow-[0_1px_3px_rgba(0,0,0,0.08)] outline-none transition-all duration-200 placeholder:text-[#737373] focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] disabled:opacity-60 dark:border-[#404040] dark:text-[#FAFAFA] dark:placeholder:text-[#A3A3A3] dark:focus:border-[#3B82F6]"
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <p className="mr-auto text-xs text-[#737373] dark:text-[#A3A3A3]">
            {isTooShort ? "A comment needs at least 5 characters." : ""}
          </p>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#737373] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#404040]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={isPending || !content || isTooShort || isUnchanged}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-[rgb(var(--color-disabled-bg))] disabled:text-[rgb(var(--color-disabled-text))] disabled:shadow-none"
          >
            {isPending && <SpinnerXs />}
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default UpdateCommentModal;
