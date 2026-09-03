import api from "./axiosConfig";

export interface UserId {
  id: string;
  name: string;
  bio: string;
  location: string;
  website: string;
  image : string | null;
}

export const updateUserById = async (data: UserId) => {
  const response = await api.put(`/users/${data.id}`, {
      name: data.name,
      bio: data.bio,
      location: data.location,
      website: data.website,
      // the api only accepts a string, so a missing avatar is left out of the payload
      image : data.image ?? undefined

    });

  return response.data;
};
