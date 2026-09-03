import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../services/SearchUserService";

export const useSearchUsers = (q: string) => {
  return useQuery({
    queryKey: ["user-search", q],
    queryFn: () => searchUsers(q),
    enabled: !!q.trim(),
    staleTime: 1000 * 60 * 5,
  });
};
