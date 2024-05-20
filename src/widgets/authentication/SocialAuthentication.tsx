import { Button } from "flowbite-react";
import { usePathname } from "next/navigation";

const SocialAuthentication = () => {
  const isSignIn = usePathname()?.includes("sign-in");
  return (
    <div className="flex max-lg:flex-col justify-center lg:space-x-4 max-lg:space-y-3">
      <Button color="gray" href="#" disabled>
        <img
          className="mr-2 h-5 w-5"
          src="/img/logos/google.svg"
          alt="google-logo"
        />
        {isSignIn ? "Sign in" : "Sign up"} with Google
      </Button>
      <Button color="gray" href="#" disabled>
        <img
          className="mr-2 h-5 w-5"
          src="/img/logos/apple.svg"
          alt="apple-logo"
        />
        {isSignIn ? "Sign in" : "Sign up"} with Apple ID
      </Button>
    </div>
  );
};
export default SocialAuthentication;
