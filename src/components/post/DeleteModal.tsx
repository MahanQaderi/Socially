import { Trash2, X } from "lucide-react";
import { createPortal } from "react-dom";
import Button from "../Ui/Button";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import { SpinnerMini } from "../Ui/Spinner";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting : boolean
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}: DeleteModalProps) {
  useModalBehavior(onClose, isOpen && !isDeleting);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 animate-fade-in"
      onClick={isDeleting ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-modal animate-scale-in dark:border-[#2E2E2E] dark:bg-[#1C1C1C]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 cursor-pointer text-[#737373] transition-colors duration-200 hover:text-black dark:hover:text-white"
          aria-label="Close delete confirmation"
        >
          <X width={20} height={20} />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
          <Trash2 width={22} height={22} className="text-red-600" />
        </div>

        <h2 className="text-lg font-semibold text-black dark:text-white">
          Delete post?
        </h2>

        <p className="mt-2 text-sm text-[#737373]">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-black transition-colors hover:bg-gray-100 dark:border-[#262626] dark:bg-[#141414] dark:text-white dark:hover:bg-[#1A1A1A]"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex min-w-20 items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-600 disabled:text-white disabled:opacity-70"
          >
            {isDeleting ? <SpinnerMini /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
