import jwt from "jsonwebtoken";
import { log } from "@utils/Logger";

export namespace JwtUtils {
  export const isJwtExpired = (token: string) => {
    // offset by 60 seconds, so we will check if the token is "almost expired".
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded: any = jwt.decode(token);

    log(`Current time + 60 seconds: ${new Date(currentTime * 1000)}`);
    log(`Token lifetime: ${new Date(decoded["exp"] ?? 0 * 1000)}`);

    if (decoded["exp"]) {
      const adjustedExpiry = decoded["exp"];

      if (adjustedExpiry < currentTime) {
        log("Token expired");
        return true;
      }

      log("Token has not expired yet");
      return false;
    }

    log('Token["exp"] does not exist');
    return true;
  };
}
