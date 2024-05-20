import { action, makeObservable, observable } from "mobx";

class ModalStore {
  isOpen: boolean = false;
  title: string | null = null;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      title: observable,
      setIsOpen: action,
      setTitle: action,
    });
  }

  setIsOpen(state: boolean) {
    this.isOpen = state;
  }

  setTitle(modalTitle: string) {
    this.title = modalTitle;
  }
}

export default ModalStore;
