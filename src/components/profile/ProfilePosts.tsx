import { useGetUsersPosts } from "../../hooks/useGetUsersPosts";
import type { PostType } from "../../types/AllPostsTypes";
import Post from "../post/Post";

type ProfilePostsProps = {
  profileId: string;
};

export default function ProfilePosts({ profileId }: ProfilePostsProps) {
  const { data, isLoading, isError } = useGetUsersPosts({
    id: profileId,
  });

  const posts = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="mt-4 flex w-full flex-col gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-card animate-fade-in dark:border-[#262626] dark:bg-[#141414]">
        <div className="flex items-center gap-3">
          <div className="skeleton h-9 w-9 rounded-full"></div>
          <div className="skeleton h-3 w-32"></div>
        </div>

        <div className="skeleton h-40 w-full"></div>
        <div className="skeleton h-3 w-2/3"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 w-full rounded-2xl border border-[#E5E5E5] bg-white p-8 text-center shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
        <h2 className="text-lg text-[#171717] dark:text-white">
          Failed to load the posts
        </h2>

        <p className="mt-1 text-[14px] text-[#737373] dark:text-[#A3A3A3]">
          Please try again in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {posts.length === 0 ? (
        <div className="mt-4 w-full rounded-2xl border border-[#E5E5E5] bg-white p-8 text-center shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
          <h2 className="text-lg text-[#171717] dark:text-white">There is no post</h2>

          <p className="mt-1 text-[14px] text-[#737373] dark:text-[#A3A3A3]">
            This user hasn't posted anything
          </p>
        </div>
      ) : (
        posts.map((post: PostType) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}
