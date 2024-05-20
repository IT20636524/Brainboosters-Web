import axios from "axios";
import { getSession } from "next-auth/react";
import { authenticationStore, authStateStore } from "@stores/StoreInitializer";
import { log } from "@utils/Logger";

const setAxiosInterceptorMiddleware = () => {
  const checkSession = async () => {
    let sessionJSON: any = null;
    const keyWord = "sign-in";
    if (
      window.location.href.split("/").filter((path) => path.includes(keyWord))
        .length === 0
    ) {
      try {
        // check if token is in store or else get from session
        if (!authStateStore.session) {
          sessionJSON = await getSession();
          authStateStore.setSession(JSON.stringify(sessionJSON));
        } else {
          sessionJSON = JSON.parse(authStateStore.session);
        }

        // check if session expired
        const { exp } = parseJwt(sessionJSON.accessToken);
        if (exp * 1000 < Date.now()) {
          sessionJSON = await getSession();
          authStateStore.setSession(JSON.stringify(sessionJSON));
        }
      } catch (error) {
        authenticationStore.logout();
        log(`AxiosMiddleware: ${error}`);
      }
    }

    return sessionJSON;
  };

  const parseJwt = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  };

  axios.interceptors.request.use(
    async (config) => {
      let sessionResponse: any = null;
      let accessToken = "";
      sessionResponse = await checkSession();
      try {
        accessToken = sessionResponse?.accessToken;
      } catch (error: any) {
        log(error.toString());
      }
      const configWithHeaders = config;
      if (configWithHeaders.headers) {
        configWithHeaders.headers["Content-Type"] = "application/json";
        configWithHeaders.headers["Accept"] = "application/json";
        if (accessToken) {
          configWithHeaders.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
      return configWithHeaders;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 502) {
        authenticationStore.logout();
      }
      Promise.reject(error);
    },
  );
};
export default setAxiosInterceptorMiddleware;
