import Avatar from "./Ui/Avatar";

import { useAuthStore } from "../store/authStore";
import { useGetUserByUserName } from "../hooks/useGetUserByUserName";
import { splitUsername } from "../utils/splitUsername";
import { Link } from "react-router";

export const SideProfile: React.FC = () => {
  const { user } = useAuthStore();

  const usernameFallback = splitUsername(user?.email ?? "");

  const {
    data: dataByUsername,
    isLoading: isLoadingByUsername,
    isError,
  } = useGetUserByUserName({ username: usernameFallback });

  const profile = dataByUsername?.data;
  const isLoading = isLoadingByUsername;

  if (isError) {
    return (
      <div className="bg-white dark:bg-[#141414] border border-zinc-200 sticky top-24 dark:border-zinc-800 rounded-2xl p-6 shadow-card text-center w-full animate-fade-in">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Could not load your profile.
        </p>
      </div>
    );
  }

  if (isLoading || !profile) {
    return (
      <div className="bg-white dark:bg-[#141414] border border-zinc-200 sticky top-24 dark:border-zinc-800 rounded-2xl p-6 shadow-card flex flex-col items-center w-full animate-fade-in">
        <div className="skeleton h-20 w-20 rounded-full"></div>
        <div className="skeleton mt-4 h-4 w-32"></div>
        <div className="skeleton mt-2 h-3 w-20"></div>
        <div className="skeleton mt-6 h-3 w-full"></div>
        <div className="skeleton mt-2 h-3 w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#141414] border border-zinc-200 sticky top-24 dark:border-zinc-800 rounded-2xl p-6 shadow-card flex flex-col items-center text-center w-full">
      <div className="mb-4 ">
        <Avatar src={profile.image} height={80} width={80} className="ring-2 ring-zinc-100 dark:ring-zinc-800" />
      </div>

      <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-0.5">
        {profile.name}
      </h3>
      <Link to={`/profile/${splitUsername(profile.email ?? "")}`} className="text-xs text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-6">
        {splitUsername(profile.email ?? "")}
      </Link>

      <div className="w-full flex justify-between items-center  gap-2 mb-6 text-center border-t border-zinc-100 dark:border-zinc-900 pt-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            {profile._count?.followings ?? 0}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Followings
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            {profile._count?.followers ?? 0}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Followers
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900 pt-4">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{profile.location || "No location"}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          {profile.website ? (
            <a
              href={/^https?:\/\//.test(profile.website) ? profile.website : `https://${profile.website}`}
              target="_blank"
              rel="noreferrer"
              className="truncate underline-offset-4 transition-colors hover:text-zinc-900 hover:underline dark:hover:text-white"
            >
              {profile.website}
            </a>
          ) : (
            <span className="truncate">No website</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideProfile;
