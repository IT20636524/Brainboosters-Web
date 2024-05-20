import AuthenticationStore from "@stores/AuthenticationStore";
import AuthStateStore from "@stores/AuthStateStore";
import NotificationStore from "@stores/NotificationStore";
import ModalStore from "@stores/ModalStore";
import ChildStore from "./ChildStore";

export const authenticationStore = new AuthenticationStore(true);
export const authStateStore = new AuthStateStore();
export const notificationStore = new NotificationStore();
export const modalStore = new ModalStore();
export const childStore = new ChildStore();
