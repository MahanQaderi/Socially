import SearchUserItem from "../components/Ui/SearchedUserItem";
import { useSearchUsers } from "../hooks/useSearch";
import { useSearchParams } from "react-router";
import type { SearchUserType } from "../types/SearchUser";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const { data, isLoading, isError } = useSearchUsers(query);

  const users = data?.data ?? [];

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">

      {query && (
        <p className="mb-4 text-sm text-zinc-500 animate-fade-in dark:text-zinc-400">
          Results for <span className="font-semibold text-zinc-900 dark:text-white">{query}</span>
        </p>
      )}

      {isLoading && (
        <div className="flex w-full flex-col gap-3 animate-fade-in">
          <div className="skeleton h-20 w-full"></div>
          <div className="skeleton h-20 w-full"></div>
          <div className="skeleton h-20 w-full"></div>
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-500">Failed to search users.</p>
      )}

      {!isLoading && !isError && (
        <div className="flex w-full flex-col gap-1 stagger">
          {users.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-card dark:border-zinc-800 dark:bg-[#141414]">
              <h2 className="text-lg text-zinc-900 dark:text-white">
                No users found
              </h2>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Try searching with another name or email.
              </p>
            </div>
          ) : (
            users.map((user: SearchUserType) => (
              <SearchUserItem key={user.id} user={user} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
