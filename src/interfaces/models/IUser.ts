export interface IParent {
  uid: string;
  username?: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  phoneNumber?: string;
  loginMethods: Array<string>;
  password: string;
  children?: Array<IChild>;
}

export interface IChild {
  uid?: string;
  username?: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  profileImage?: string;
  phoneNumber?: string;
  loginMethods?: Array<string>;
  password?: string;
  snapIVResults?: ISnapIV | null;
  preferences?: IPreference | null;
  currentLevel?: number;
  progressInCurrentLevel?: number;
  status?: string;
  previousWeekAveragePlaytime?: number;
  lives?: number;
  crystals?: number;
  recentAchievements?: Array<string>;
  recentActivities?: Array<string>;
}

interface IPreference {
  character?: Array<string>;
  difficulty?: string;
  language?: string;
  theme?: string;
}

interface ISnapIV {
  attention: number;
  impulsivity: number;
  memory: number;
  timeManagement: number;
}

export interface IAddChildFormTypes {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  age: number;
  gender: string;
  profileImage?: string;
  snapIVResults: ISnapIV | null;
  preferences: IPreference | null;
}
