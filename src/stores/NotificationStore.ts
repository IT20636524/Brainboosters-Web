import { action, makeObservable, observable } from "mobx";
import NotificationType from "@enums/NotificationType";

class NotificationStore {
  displayToast: boolean = false;
  notificationMessage: string = "";
  notificationType: NotificationType = NotificationType.Success;

  constructor() {
    makeObservable(this, {
      displayToast: observable,
      notificationMessage: observable,
      notificationType: observable,
      setDisplayToast: action,
      displayNotification: action,
    });
  }

  setDisplayToast(value: boolean) {
    this.displayToast = value;
  }

  setNotificationMessage(message: string) {
    this.notificationMessage = message;
  }

  setNotificationType(type: NotificationType) {
    this.notificationType = type;
  }

  displayNotification(type: NotificationType, message: string) {
    this.setDisplayToast(true);
    this.setNotificationMessage(message);
    this.setNotificationType(type);
  }
}
export default NotificationStore;
