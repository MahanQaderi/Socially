import { useQuery } from "@tanstack/react-query";
import { getUsersPostsById, type GetUsersPostsData } from "../services/getUsersPostsServices";


export const useGetUsersPosts = ({ id }: GetUsersPostsData) => {
  return useQuery({
    queryKey: ["get-users-posts", id],
    queryFn: () => getUsersPostsById({ id }),
    refetchOnWindowFocus: false,
    refetchOnMount : true,
  });
};