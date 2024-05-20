import IUser from "./IUser";

interface ISignInRequestModel {
  status: string;
  status_code: number;
  data: {
    access_token: string;
    refresh_token: string;
    user: IUser;
  };
}

export default ISignInRequestModel;
