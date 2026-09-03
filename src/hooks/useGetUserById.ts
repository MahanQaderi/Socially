import { useQuery } from "@tanstack/react-query";

import { getUserById } from "../services/getUserInformationServices";
import type { GetUserInformationByIdData } from "../services/getUserInformationServices";



export const useGetUserById = ({ id }: GetUserInformationByIdData) => {
  return useQuery({
    queryKey: ["get-by-id", id],
    queryFn: () => getUserById({ id }),
    enabled: !!id,
  });

};