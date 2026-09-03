export type SessionResponse = {
  message: string;
  success: boolean;
  data: {
    session: Session;
    user: User;
  };
};

export type Session = {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  id: string;
};

export type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
};
