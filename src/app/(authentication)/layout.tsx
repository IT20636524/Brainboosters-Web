"use client";
import Image from "next/image";
import ILayout from "@interfaces/layout/ILayout";

const AuthenticationLayout = ({ children }: ILayout) => {
  return (
    <section className="bg-white">
      <div className="grid h-screen lg:grid-cols-3">
        <div className="flex items-center justify-center px-4 py-6 sm:px-0 lg:py-0 lg:col-span-2">
          {children}
        </div>
        <div className="max-lg:hidden">
          <Image
            className="h-screen w-full object-cover"
            src="/img/signin.svg"
            width={500}
            height={500}
            alt="logo"
          />
        </div>
      </div>
    </section>
  );
};

export default AuthenticationLayout;
