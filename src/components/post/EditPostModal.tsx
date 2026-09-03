import { ImagePlus, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useUploadProfileImage } from "../../hooks/useUploadProfileImage";
import { getProfileImageURL } from "../../utils/getProfileImgeURL";
import { SpinnerXs } from "../Ui/Spinner";
import { useModalBehavior } from "../../hooks/useModalBehavior";

type EditPostModalProps = {
  text: string;
  image?: string | null;
  onClose: () => void;
  onSave: (data: {
    text: string;
    image: string | null | undefined;
    imageId?: string | null | undefined;
    removeImage: boolean;
  }) => void;
  isSaving: boolean;
};

export default function EditPostModal({
  text,
  image,
  onClose,
  onSave,
  isSaving,
}: EditPostModalProps) {
  const [postText, setPostText] = useState(text);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    getProfileImageURL(image, "post"),
  );
  const [removeImage, setRemoveImage] = useState(false);

  const uploadImage = useUploadProfileImage();

  const isLoading = uploadImage.isPending || isSaving;

  useModalBehavior(onClose, !isLoading);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
  };

  const handleRemoveImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  };

  // the api rejects anything shorter than 5 or longer than 300 characters
  const trimmedText = postText.trim();
  const isTooShort = trimmedText.length < 5;
  const isTooLong = trimmedText.length > 300;

  const handleSave = async () => {
    if (isLoading || isTooShort || isTooLong) return;

    if (imageFile) {
      try {
        const response = await uploadImage.mutateAsync(imageFile);

        const newImageId = response.file;

        onSave({
          text: postText,
          image: newImageId,
          imageId: newImageId,
          removeImage: false,
        });
      } catch {
        return;
      }

      return;
    }

    onSave({
      text: postText,
      image: removeImage ? null : (image ?? null),
      imageId: removeImage ? null : (image ?? null),
      removeImage,
    });
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      onClick={isLoading ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-modal animate-scale-in dark:border-[#2E2E2E] dark:bg-[#1C1C1C]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Edit post
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows={5}
          maxLength={300}
          disabled={isLoading}
          className="mb-4 w-full resize-none rounded-xl border border-[#E5E5E5] bg-[#F1F2F4] p-3 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E2E2E] dark:bg-[#0F0F0F] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#3B82F6]"
        />

        {imagePreview ? (
          <div className="relative mb-4 overflow-hidden rounded-xl border border-zinc-200 animate-scale-in dark:border-zinc-800">
            <img
              src={imagePreview}
              alt="Post preview"
              className="max-h-80 w-full object-contain"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isLoading}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            className={`mb-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-[#F1F2F4] px-4 py-8 text-center transition dark:border-[#2E2E2E] dark:bg-[#0F0F0F] ${
              isLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:border-zinc-400 hover:bg-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            }`}
          >
            <ImagePlus className="mb-2 h-7 w-7 text-zinc-400" />

            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              Add an image
            </span>

            <span className="mt-1 text-xs text-zinc-400">PNG, JPG or WEBP</span>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
              disabled={isLoading}
            />
          </label>
        )}

        <div className="flex items-center justify-end gap-2">
          <p className="mr-auto text-xs text-zinc-500 dark:text-zinc-400">
            {isTooShort ? "A post needs at least 5 characters." : ""}
          </p>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading || isTooShort || isTooLong}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed ${
              isLoading
                ? "bg-zinc-700 text-gray-400"
                : "bg-zinc-900 text-white hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            }`}
          >
            {isLoading && <SpinnerXs />}
            {uploadImage.isPending
              ? "Uploading..."
              : isSaving
                ? "Saving..."
                : "Save changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
