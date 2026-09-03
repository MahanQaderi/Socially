import { useMutation } from "@tanstack/react-query";
import { uploadProfileImage } from "../services/updateProfileImageServices";



export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: (image: File) => uploadProfileImage(image),
  });
};