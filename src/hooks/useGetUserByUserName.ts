import { useQuery } from "@tanstack/react-query";
import { getUserByUserName } from "../services/getUserInformationServices";
import type { GetUserInformationData } from "../services/getUserInformationServices";

export const useGetUserByUserName = ({ username }: GetUserInformationData) => {
  return useQuery({
    queryKey: ["get-by-userName", username],
    queryFn: () => getUserByUserName({ username }),
    enabled: !!username,
  });
};