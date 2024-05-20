"use client";
import { getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SignInForm from "@widgets/authentication/SignInForm";

const SignIn = () => {
  const router = useRouter();
  const routeQueryParams = useSearchParams();
  const authCheck = async () => {
    const token = routeQueryParams?.get("token_valid");

    if (token !== "not_valid") {
      const session = await getSession();
      const sessionResponse = await session;

      if (sessionResponse) {
        router.push(`/overview`);
      }
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <div className="w-full max-w-md space-y-4 md:space-y-6 xl:max-w-xl overflow-auto">
      <SignInForm />
    </div>
  );
};

export default SignIn;
