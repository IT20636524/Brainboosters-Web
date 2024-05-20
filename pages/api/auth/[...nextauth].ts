import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthenticatedUser } from "@interfaces/authentication/AuthenticatedUser";
import { authenticationService } from "@services/ServiceInitializer";
import { JwtUtils } from "@utils/JWTUtil";
import { log } from "@utils/Logger";

namespace NextAuthUtils {
  export const tokenRefresh = async (refreshToken: string) => {
    try {
      const response = await authenticationService.refreshToken(refreshToken);
      return [response.data.data.access_token, refreshToken];
    } catch {
      return [null, null];
    }
  };
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 10 * 60 * 60, // 10 hours
  },
  jwt: {
    secret:
      process.env.NEXTAUTH_JWT_SECRET ?? "please-change-to-something-else",
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthenticatedUser | null> {
        if (credentials?.email && credentials?.password) {
          try {
            const response = await authenticationService.login(
              credentials.email,
              credentials.password,
            );

            let user: AuthenticatedUser | null = null;

            if (response?.status === 200) {
              user = {
                id: response.data.data.user.id,
                name: `${response?.data.data.user.first_name} ${response?.data.data.user.last_name}`,
                email: credentials.email,
                accessToken: response?.data.data.access_token,
                refreshToken: response?.data.data.refresh_token,
              };

              return user;
            }
          } catch (error: any) {
            log(`authorize error: ${error.toString()}`);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      let tokenRes: any = token;
      if (user) {
        tokenRes = {
          ...tokenRes,
          userId: user.id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        return tokenRes;
      }

      if (JwtUtils.isJwtExpired(tokenRes.accessToken as string)) {
        try {
          const [newAccessToken, newRefreshToken] =
            await NextAuthUtils.tokenRefresh(tokenRes.refreshToken);
          if (newAccessToken && newRefreshToken) {
            tokenRes = {
              ...tokenRes,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
            };

            return tokenRes;
          }
          throw Error("Invalid token refresh response");
        } catch {
          // unable to refresh tokens from DRF backend, invalidate the token
          return {
            ...tokenRes,
            exp: 0,
          };
        }
      }

      return tokenRes;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        userId: token.userId,
        accessToken: token.accessToken,
      };
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
