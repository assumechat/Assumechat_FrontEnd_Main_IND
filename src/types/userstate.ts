type User = {
  _id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  refreshTokens: string;
  userDataId: string;
  isPremium: boolean;
  premiumExpiry: number; //date
  premiumTier: string;
  dailySkips: number;
  lastSkipTimeStamp: number; //Data and time
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

export type { UserState, User };
