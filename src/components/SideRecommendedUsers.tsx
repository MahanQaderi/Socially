import { useState } from "react";
import { SpinnerMini, SpinnerXs } from "./Ui/Spinner";
import { useGetRecommendedUsers } from "../hooks/useGetRecommendedUsers";
import { useToggleFollowUser } from "../hooks/useToggleFollowUser";
import type { RecommendedUserTypes } from "../types/RecommendedUserTypes";
import { splitUsername } from "../utils/splitUsername";
import { Link } from "react-router";
import Avatar from "./Ui/Avatar";

export const SideRecommendedUsers: React.FC = () => {
  const [followingUserId, setFollowingUserId] = useState<string | null>(null);

  const {
    data: recommendedUsers,
    isLoading: isLoadingRecommendedUsers,
    isError: isRecommendedUsersError,
  } = useGetRecommendedUsers();

  const { mutate: toggleFollowUser, isPending: isFollowingUser } =
    useToggleFollowUser();

  const handleFollowToggle = (id: string) => {
    setFollowingUserId(id);

    toggleFollowUser(id, {
      onSettled: () => {
        setFollowingUserId(null);
      },
    });
  };

  const users = recommendedUsers?.data ?? [];

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-card sticky top-24 dark:border-zinc-800 dark:bg-[#141414]">
      <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
        Recommended users
      </h3>

      <div className="flex flex-col gap-4 stagger">
        {isLoadingRecommendedUsers ? (
          <div className="flex min-h-32 items-center justify-center">
            <SpinnerMini className="text-zinc-400" />
          </div>
        ) : isRecommendedUsersError ? (
          <p className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Could not load suggestions.
          </p>
        ) : users.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No one left to recommend right now.
          </p>
        ) : (
          users.map((user: RecommendedUserTypes) => {
            const userName = splitUsername(user.email);

            return (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl p-1 transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
              >
                <Link
                  to={`/profile/${userName}`}
                  className="flex min-w-0 items-center gap-3"
                >
                  <Avatar
                    src={user.image}
                    width={40}
                    height={40}
                    className="transition-transform duration-300 hover:scale-110"
                  />

                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                      {user.name}
                    </span>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user._count.followers} followers
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => handleFollowToggle(user.id)}
                  disabled={isFollowingUser && followingUserId === user.id}
                  className="ml-2 flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:text-white dark:hover:bg-white dark:hover:text-zinc-900"
                >
                  {isFollowingUser && followingUserId === user.id ? (
                    <SpinnerXs />
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SideRecommendedUsers;
