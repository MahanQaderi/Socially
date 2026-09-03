import Button from "../Ui/Button";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { useAuthStore } from "../../store/authStore";
import { useUploadProfileImage } from "../../hooks/useUploadProfileImage";
import Avatar from "../Ui/Avatar";
import { SpinnerXs } from "../Ui/Spinner";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import toast from "react-hot-toast";

type ProfileModalProp = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prevName: string;
  prevBio: string;
  prevLocation: string;
  prevWebsite: string;
  prevImage?: string;
};

const ProfileModal = ({
  setIsModalOpen,
  prevName,
  prevBio,
  prevLocation,
  prevWebsite,
  prevImage,
}: ProfileModalProp) => {
  const { user } = useAuthStore();

  const [name, setName] = useState(prevName);
  const [bio, setBio] = useState(prevBio);
  const [location, setLocation] = useState(prevLocation);
  const [website, setWebsite] = useState(prevWebsite);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(prevImage ?? null);

  const { mutate, isPending } = useUpdateUserProfile();

  const { mutate: uploadImage, isPending: isUploadingImage } =
    useUploadProfileImage();

  const isSaving = isPending || isUploadingImage;

  useModalBehavior(() => setIsModalOpen(false), !isSaving);

  // release the object url of the picked file when the modal goes away
  useEffect(() => {
    if (!preview?.startsWith("blob:")) return;

    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  function handleCancel() {
    if (isSaving) return;

    setIsModalOpen(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSaving) return;

    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    const saveProfile = (image: string | null) => {
      mutate(
        {
          id: user!.id,
          name: name.trim(),
          bio: bio.trim(),
          location: location.trim(),
          website: website.trim(),
          image,
        },
        {
          onSuccess: () => {
            toast.success("profile updated successfully");
            setIsModalOpen(false);
          },
        },
      );
    };

    if (profileImage) {
      uploadImage(profileImage, {
        onSuccess: (data) => {
          saveProfile(data.file);
        },

        onError: () => {
          toast.error("Could not upload the image, please try again");
        },
      });

      return;
    }

    saveProfile(prevImage || user?.image || null);
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleCancel}
    >
      <div
        className="w-137.5 max-w-[calc(100%-2rem)] rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-modal animate-scale-in dark:border-[#2E2E2E] dark:bg-[#1C1C1C]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col p-3">
          <div className="flex justify-end">
            <X
              onClick={handleCancel}
              className="h-4 w-4 cursor-pointer transition-colors duration-200 dark:text-white"
            />
          </div>

          <div className="mb-3 flex flex-col items-start">
            <h2 className="text-lg dark:text-white">Edit Profile</h2>

            <p className="text-[14px] text-[#737373]">
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>

          <div className="mb-3">
            <label
              htmlFor="profileImage"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>

            <div className="mb-3 flex items-center gap-3">
              <Avatar
                src={preview}
                width={64}
                height={64}
                alt="Profile preview"
                className="ring-2 ring-zinc-100 dark:ring-zinc-800"
              />

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSaving}
                className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm text-gray-900 transition-colors
                  file:mr-4 file:cursor-pointer file:border-0 file:bg-[#181818]
                  file:px-4 file:py-2 file:text-sm file:font-medium file:text-white
                  dark:border-[#737373] dark:text-white
                  dark:file:bg-white dark:file:text-black"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label htmlFor="name" className="dark:text-white">
              Name
            </label>

            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
              type="text"
              placeholder="Enter your name"
            />

            <label htmlFor="bio" className="mt-1 dark:text-white">
              Bio
            </label>

            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={50}
              placeholder="Enter your bio"
              className="h-16 w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
            />

            <label
              htmlFor="location"
              className="mt-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>

            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={20}
              type="text"
              placeholder="Enter your location"
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
            />

            <label
              htmlFor="website"
              className="mt-1 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Website
            </label>

            <input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              maxLength={50}
              type="text"
              placeholder="Enter your website"
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-[#737373] dark:text-white"
            />

            <div className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="h-9 rounded-lg border border-gray-200 bg-white px-4 text-center text-sm font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-black hover:text-white dark:bg-[#181818] dark:text-white dark:hover:bg-gray-50 dark:hover:text-black"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSaving}
                className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#181818] px-4 text-center text-sm font-medium text-white transition-all duration-200 hover:border hover:border-gray-200 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white disabled:cursor-not-allowed disabled:bg-[rgb(var(--color-disabled-bg))] disabled:text-[rgb(var(--color-disabled-text))] disabled:shadow-none"
              >
                {isSaving && <SpinnerXs />}
                {isUploadingImage
                  ? "Uploading..."
                  : isPending
                    ? "Saving..."
                    : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProfileModal;
