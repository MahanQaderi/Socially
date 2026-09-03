import { useQuery } from "@tanstack/react-query";
import { getFollowingList } from "../services/FollowListService";

export const useGetFollowingList = (
  id?: string,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ["FollowingList", id],
    queryFn: () => getFollowingList(id!),

    enabled: !!id && (options?.enabled ?? true),

    staleTime: 1000 * 60 * 5,
  });
};