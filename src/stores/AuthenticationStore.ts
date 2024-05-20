import { action, makeObservable, observable } from "mobx";
import { signOut } from "next-auth/react";
import NotificationType from "@enums/NotificationType";
import ISignInRequestModel from "@interfaces/models/ISignInRequestModel";
import GenericService from "@services/GenericService";
import { authenticationService } from "@services/ServiceInitializer";
import GenericStore from "@stores/GenericStore";
import { log } from "@utils/Logger";
import { notificationStore } from "./StoreInitializer";

class AuthenticationStore extends GenericStore<ISignInRequestModel> {
  protected service: GenericService<ISignInRequestModel> =
    authenticationService;
  isEmailVerified = false;

  constructor(isDeep: boolean) {
    super(isDeep);
    makeObservable(this, {
      isEmailVerified: observable,
      setIsEmailVerified: action,
      verifyEmail: action,
    });
  }

  setIsEmailVerified(value: boolean) {
    this.isEmailVerified = value;
  }

  async verifyEmail(email: string, code?: string) {
    try {
      this.dataItem = await (
        await authenticationService.verifyEmail(email, code)
      ).data;
      this.setIsEmailVerified(
        this.dataItem?.status === "success" &&
          this.dataItem.status_code === 200,
      );
    } catch (e: any) {
      notificationStore.displayNotification(NotificationType.Danger, e);
    }
  }

  async logout() {
    try {
      const logoutResponse = await authenticationService.logOut();
      if (
        logoutResponse.data.status === "success" &&
        logoutResponse.data.status_code === 200
      ) {
        sessionStorage.clear();
        log("User logged out");
        return await signOut({
          callbackUrl: "/sign-in",
          redirect: true,
        });
      } else {
        notificationStore.displayNotification(
          NotificationType.Danger,
          logoutResponse.data.data.detail,
        );
      }
    } catch (e: any) {
      notificationStore.displayNotification(NotificationType.Danger, e);
    }
  }
}

export default AuthenticationStore;
