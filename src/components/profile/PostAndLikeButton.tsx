import Button from "../Ui/Button";
import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileLikes from "./ProfileLikes";

type PostAndLikeButtonProps = {
  profileId : string
}

const PostAndLikeButton = ({profileId} : PostAndLikeButtonProps) => {
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  return (
    <div className="flex w-full flex-col">
      <div className="w-full mt-6 flex rounded-2xl border border-[#E5E5E5] bg-[#F1F2F4] p-1.5 dark:border-[#262626] dark:bg-[#0F0F0F]">
        <Button
          onClick={() => setActiveTab("posts")}
          className={`w-1/2 rounded-xl p-2 dark:text-white transition-all duration-300 ${
            activeTab === "posts"
              ? "bg-white shadow-sm dark:bg-[#262626]"
              : "bg-transparent hover:bg-white/60 dark:hover:bg-[#1a1a1a]"
          }`}
        >
          Posts
        </Button>

        <Button
          onClick={() => setActiveTab("likes")}
          className={`w-1/2 rounded-xl p-2  dark:text-white transition-all duration-300 ${
            activeTab === "likes"
              ? "bg-white shadow-sm dark:bg-[#262626]"
              : "bg-transparent hover:bg-white/60 dark:hover:bg-[#1a1a1a]"
          }`}
        >
          Likes
        </Button>
      </div>
      <div key={activeTab} className="animate-fade-up">
        {activeTab === "posts" && <ProfilePosts profileId={profileId} />}
        {activeTab === "likes" && <ProfileLikes profileId={profileId} />}
      </div>
    </div>
  );
};

export default PostAndLikeButton;
