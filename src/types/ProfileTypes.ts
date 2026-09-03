import type { PostType } from "./AllPostsTypes";

export type UserProfile = {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string ;
  bio?: string ;
  location?: string ;
  website?: string ;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    followers: number;
    followings: number;
    posts: number;
  };
  followers?: {
    followerId: string;
  }[];
}

export type LikedPost = {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;

  post: PostType;
}


// following and followers 
export interface FollowUser {
  name: string;
  email: string;
  id: string;
  image: string | null;
}

export interface FollowerType {
  createdAt: string;
  follower: FollowUser;
}

export interface FollowingType {
  createdAt: string;
  following: FollowUser;
}