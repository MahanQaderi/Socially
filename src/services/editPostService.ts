import api from "./axiosConfig";

export type EditPostPayloadType = {
  image?: string | null;
  content?: string;
};

type EditPostRequestType = {
  postId: string;
  payload: EditPostPayloadType;
};

export const editPostRequest = async ({
  postId,
  payload,
}: EditPostRequestType) => {
  const res = await api.put(`/posts/${postId}`, {
    // the api only accepts a string for image, so removing it is sent as an empty value
    image: payload.image === null ? "" : payload.image,
    content: payload.content,
  });

  return res.data;
};
