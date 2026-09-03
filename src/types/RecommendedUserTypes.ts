export type RecommendedUserTypes = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null ;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    followers: number;
  };
}
