import { useQuery } from "@tanstack/react-query";
import { getFollowerList } from "../services/FollowListService";

export const useGetFollowerList = (
  id?: string,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ["FollowerList", id],
    queryFn: () => getFollowerList(id!),

    enabled: !!id && (options?.enabled ?? true),

    staleTime: 1000 * 60 * 5,
  });
};
