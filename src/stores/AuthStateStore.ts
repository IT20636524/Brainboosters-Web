import { action, makeObservable, observable } from "mobx";

class AuthStateStore {
  session: string | null = null;
  authState: boolean = false;

  constructor() {
    makeObservable(this, {
      session: observable,
      authState: observable,
      setSession: action,
      setAuthState: action,
    });
  }

  setSession(session: string) {
    this.session = session;
  }

  setAuthState(state: boolean) {
    this.authState = state;
  }
}

export default AuthStateStore;
