import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import { useAuthStore } from "../../store/authStore";
import type { PostType } from "../../types/AllPostsTypes";
import { Spinner } from "../Ui/Spinner";
import Post from "../post/Post";
import SendPost from "./SendPost";

export default function AllPosts() {
  const { data, isLoading, isError } = useGetAllPosts();

  const { isAuthenticated } = useAuthStore();

  const posts = data?.data ?? [];

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="">
      {isAuthenticated && <SendPost />}

      {isError ? (
        <div className="my-5 rounded-2xl border border-[#E5E5E5] bg-white p-8 text-center shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
          <h2 className="text-lg text-[#171717] dark:text-white">
            Could not load the posts
          </h2>

          <p className="mt-1 text-[14px] text-[#737373] dark:text-[#A3A3A3]">
            Please check your connection and try again.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="my-5 rounded-2xl border border-[#E5E5E5] bg-white p-8 text-center shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
          <h2 className="text-lg text-[#171717] dark:text-white">
            There is no post yet
          </h2>

          <p className="mt-1 text-[14px] text-[#737373] dark:text-[#A3A3A3]">
            Be the first one to share something.
          </p>
        </div>
      ) : (
        posts.map((post: PostType) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}
