import api from "./axiosConfig";

interface UploadProfileImageResponse {
  file: string;
}

export const uploadProfileImage = async (image: File): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();

  formData.append("file", image);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return response.data;
};