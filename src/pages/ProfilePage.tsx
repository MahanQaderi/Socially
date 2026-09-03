import { useParams } from "react-router";
import PostAndLikeButton from "../components/profile/PostAndLikeButton";
import ProfileCardDetails from "../components/profile/ProfileCardDetails";
import { useGetUserByUserName } from "../hooks/useGetUserByUserName";
import { splitUsername } from "../utils/splitUsername";
import { Spinner } from "../components/Ui/Spinner";

export default function ProfilePage() {

  const { username } = useParams<{ username: string }>();

  const { data, isLoading, isError } = useGetUserByUserName({username: username ?? ""});

  const profile = data?.data;

   if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isError || !profile) {
    return (
      <div className="mx-auto mt-4 w-full rounded-2xl border border-[#E5E5E5] bg-white p-6 text-center shadow-card animate-fade-up dark:border-[#262626] dark:bg-[#141414]">
        <h2 className="text-lg text-[#171717] dark:text-white">
          Failed to load profile
        </h2>

        <p className="mt-1 text-[14px] text-[#737373] dark:text-[#A3A3A3]">
          This user does not exist or could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <ProfileCardDetails
          name={profile.name}
          email={splitUsername(profile.email)}
          bio={profile.bio}
          image={profile.image}
          location={profile.location}
          website={profile.website}
          createdAt={profile.createdAt}
          updatedAt={profile.updatedAt}
          _count={profile._count}
          followers={profile.followers}
          />
      </div>
      <PostAndLikeButton profileId={profile.id}/>
    </>
  );
}
