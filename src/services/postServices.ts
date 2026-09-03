import api from "./axiosConfig";

export type createPostPayloadType = {
    content : string
    image? : string
}


export const createNewPostRequest = async (payload : createPostPayloadType) => {
  const res = await api.post("/posts" , payload);  
  return res.data;
};


export const getAllPostRequest = async () => {
  const res = await api.get("/posts");  
  return res.data;
};