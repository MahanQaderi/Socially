import { Anchor, Calendar, MapPin, SquarePen, UserPlus } from "lucide-react";
import { SpinnerXs } from "../Ui/Spinner";
import Avatar from "../Ui/Avatar";
import Button from "../Ui/Button";
import type { FollowingType, UserProfile } from "../../types/ProfileTypes";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import toLocalDateShort from "../../utils/toLocalDateShort";
import { useGetUserByUserName } from "../../hooks/useGetUserByUserName";
import { useParams } from "react-router";
import FollowModal from "./FollowModal";
import { useAuthStore } from "../../store/authStore";
import { useToggleFollowUser } from "../../hooks/useToggleFollowUser";
import { useGetFollowingList } from "../../hooks/useGetFollowingList";

const ProfileCardDetails = ({
  name = "",
  email = "",
  bio = "",
  image = "",
  location = "",
  website = "",
  _count = {
    followers: 0,
    followings: 0,
    posts: 0,
  },
  createdAt = "",
}: UserProfile) => {
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);

  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [followType, setFollowType] = useState<"followers" | "following">(
    "followers",
  );
  const { username } = useParams<{ username: string }>();

  const handleFollower = () => {
    setFollowType("followers");
    setFollowModalOpen(true);
  };

  const handleFollowing = () => {
    setFollowType("following");
    setFollowModalOpen(true);
  };

  function handleClick() {
    setIsModalOpen(true);
  }

  const { user: sessionData } = useAuthStore();
  const { data: profileData } = useGetUserByUserName({ username });
  const { data: followingList } = useGetFollowingList(sessionData?.id);
  const { mutate: toggleFollowUser, isPending: isToggleFollowUser } =
    useToggleFollowUser();

  function handleToggleFollow() {
    if (!profileData?.data?.id) return;
    toggleFollowUser(profileData.data.id);
  }

  const userId = profileData?.data?.id;
  const isMyProfile = sessionData?.id === profileData?.data?.id;

  const isFollowing = followingList?.data?.some(
    (item: FollowingType) => item.following.id === userId,
  );

  return (
    <div className="flex flex-col items-center dark:bg-[#141414] bg-white border border-[#E5E5E5] dark:border-[#262626] shadow-card animate-fade-up w-full gap-4 rounded-2xl p-6">
      <Avatar
        src={image}
        width={96}
        height={96}
        alt={name}
        className="ring-2 ring-zinc-100 dark:ring-zinc-800"
      />
      <h1 className="pt-2 text-2xl break-words dark:text-white">{name}</h1>
      <h3 className="text-[#737373]">@{email}</h3>
      <h3 className="max-w-[95%] break-words text-center text-[#737373]">{bio || "No bio yet"}</h3>
      <div className="w-full flex items-center justify-between">
        <div
          className=" flex flex-col items-center cursor-pointer hover:dark:bg-[#1a1a1a] hover:bg-[#ecebeb] p-2 rounded-xl transition-all duration-200 hover:scale-105"
          onClick={handleFollowing}
        >
          <p className="dark:text-white">{_count.followings}</p>
          <p className="text-[#737373]">Following</p>
        </div>
        <div
          className="cursor-pointer flex flex-col items-center hover:dark:bg-[#1a1a1a] hover:bg-[#ecebeb] p-2 rounded-xl transition-all duration-200 hover:scale-105"
          onClick={handleFollower}
        >
          <p className="dark:text-white">{_count.followers}</p>
          <p className="text-[#737373]">Followers</p>
        </div>
        <div className=" flex flex-col items-center p-2">
          <p className="dark:text-white">{_count.posts}</p>
          <p className="text-[#737373]">Posts</p>
        </div>
      </div>
      {isMyProfile ? (
        <Button
          onClick={handleClick}
          className="flex w-[95%] hover:bg-[#262626] dark:hover:bg-gray-200 items-center dark:bg-[#FAFAFA] justify-center gap-2 bg-[#0A0A0A] rounded-md py-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <SquarePen className="h-4 w-4 shrink-0 text-white dark:text-black" />
          <span className="text-white text-[14px] dark:text-black">
            Edit Profile
          </span>
        </Button>
      ) : isFollowing ? (
        <Button
          onClick={handleToggleFollow}
          disabled={isToggleFollowUser}
          className="
            flex w-[95%] items-center justify-center gap-2
            rounded-md py-2
            border border-[#D4D4D4] dark:border-[#404040]
            bg-white dark:bg-[#141414]
            hover:bg-gray-100 dark:hover:bg-[#1A1A1A]
            transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
          "
        >
          {isToggleFollowUser ? (
            <SpinnerXs className="text-[#0A0A0A] dark:text-white" />
          ) : (
            <span className="text-[#0A0A0A] dark:text-white text-[14px] font-medium">
              Following
            </span>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleToggleFollow}
          disabled={isToggleFollowUser}
          className="
            flex w-[95%] items-center justify-center gap-2
            rounded-md py-2
            bg-[#0A0A0A] dark:bg-white
            hover:bg-[#262626] dark:hover:bg-gray-200
            transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
            disabled:cursor-not-allowed disabled:bg-[rgb(var(--color-disabled-bg))] disabled:text-[rgb(var(--color-disabled-text))] disabled:shadow-none"
        >
          {isToggleFollowUser ? (
            <SpinnerXs className="text-white dark:text-black" />
          ) : (
            <>
              <UserPlus className="h-4 w-4 shrink-0 text-white dark:text-black" />
              <span className="text-white dark:text-black text-[14px] font-medium">
                Follow
              </span>
            </>
          )}
        </Button>
      )}

      <div className="flex max-w-[95%] w-full gap-4 flex-col items-start pt-2">
        <div className="flex gap-2">
          <MapPin className="text-[#737373] shrink-0" />
          <p className="text-[#737373]">{location || "No location"}</p>
        </div>
        <div className="flex min-w-0 gap-2">
          <Anchor className="text-[#737373] shrink-0" />
          {website ? (
            <a
              href={/^https?:\/\//.test(website) ? website : `https://${website}`}
              target="_blank"
              rel="noreferrer"
              className="truncate text-[#737373] underline-offset-4 transition-colors hover:text-[#3B82F6] hover:underline"
            >
              {website}
            </a>
          ) : (
            <p className="text-[#737373]">No website</p>
          )}
        </div>
        <div className="flex gap-2">
          <Calendar className="text-[#737373] shrink-0" />
          <p className="text-[#737373]">Joined {toLocalDateShort(createdAt)}</p>
        </div>
      </div>

      {isOpenModal && (
        <ProfileModal
          prevName={name}
          prevBio={bio}
          prevLocation={location}
          prevWebsite={website}
          prevImage={image}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {followModalOpen && userId && (
        <FollowModal
          followType={followType}
          id={userId}
          onClose={() => setFollowModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileCardDetails;
