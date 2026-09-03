import { Anchor, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { splitUsername } from "../../utils/splitUsername";
import type { SearchUserType } from "../../types/SearchUser";
import Avatar from "./Avatar";

type SearchUserItemProps = {
  user: SearchUserType;
};

export default function SearchUserItem({ user }: SearchUserItemProps) {
  const navigate = useNavigate();

  const username = splitUsername(user.email);

  const handleClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        group flex w-full gap-4 items-center
        rounded-xl
        border border-transparent
        p-4
        text-left
        transition-all
        hover:border-zinc-200
        hover:bg-zinc-50
        dark:hover:border-zinc-800
        dark:hover:bg-zinc-900/70
      "
    >

      <Avatar
        src={user?.image}
        width={60}
        height={60}
        className="
          h-12 w-12 shrink-0 rounded-full
          border border-zinc-200 object-cover
          dark:border-zinc-800
        "
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-zinc-900 dark:text-white flex items-center gap-5.5">
          {user.name || "Unknown user"}

          <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {user.email || "No email"}
          </span>
        </p>

        {user.bio && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
            {user.bio}
          </p>
        )}

        {(user.location || user.website) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {user.location && (
              <div className="flex min-w-0 items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                <span className="max-w-40 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                  {user.location}
                </span>
              </div>
            )}

            {user.website && (
              <div className="flex min-w-0 items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                <span className="max-w-40 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                  {user.website}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <span className="mt-1 shrink-0 text-lg text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400">
        →
      </span>
    </button>
  );
}
