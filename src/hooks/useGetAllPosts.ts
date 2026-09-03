import { useQuery } from "@tanstack/react-query";
import { getAllPostRequest } from "../services/postServices";

export const useGetAllPosts = () => {

  const query = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPostRequest,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};