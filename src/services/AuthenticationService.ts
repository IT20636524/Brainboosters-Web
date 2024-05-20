import axios from "axios";
import { signOut } from "next-auth/react";
import ISignInRequestModel from "@interfaces/models/ISignInRequestModel";
import GenericService from "./GenericService";

class AuthenticationService extends GenericService<ISignInRequestModel> {
  baseURL: string = process.env.NEXT_PUBLIC_AUTH_URL ?? "";

  endPointURL: string = "/auth/api";

  options = {
    headers: {
      Accept: "application/json",
      Origin: !process.env.NEXTAUTH_URL,
    },
  };

  axiosInstance = axios.create();

  async login(email?: string, password?: string) {
    return this.axiosInstance.post(
      `${this.baseURL}${this.endPointURL}/authentication/token/`,
      { email, password },
      this.options,
    );
  }

  async logOut() {
    await signOut({ redirect: false });
    return axios.post(
      `${this.baseURL}${this.endPointURL}/authentication/logout/`,
      this.options,
    );
  }

  async refreshToken(refresh: string) {
    return this.axiosInstance.post(
      `${this.baseURL}${this.endPointURL}/authentication/token/refresh/`,
      { refresh },
      this.options,
    );
  }

  async verifyToken(token: string) {
    return this.axiosInstance.post(
      `${this.baseURL}${this.endPointURL}/authentication/token/verify/`,
      { token },
      this.options,
    );
  }

  async verifyEmail(email: string, code?: string) {
    return axios.post(
      `${this.baseURL}${this.endPointURL}/user_management/email_verification/`,
      { email, token: code },
      this.options,
    );
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ) {
    return axios.post(
      `${this.baseURL}${this.endPointURL}/authentication/password/change/`,
      {
        old_password: oldPassword,
        new_password1: newPassword,
        new_password2: confirmNewPassword,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
  }
}

export default AuthenticationService;
