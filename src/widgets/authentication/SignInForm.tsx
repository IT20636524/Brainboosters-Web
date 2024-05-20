"use client";

import { Button, Checkbox, Label } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FieldWithLabel from "@components/field-with-label/FieldWithLabel";
import PasswordVisibility from "@components/PasswordVisibility";
import { emailValidation, requiredField } from "@constants/FormValidation";
import {
  generateFieldColor,
  generateFieldHelperText,
} from "@utils/general/FormFieldHelper";
import SocialAuthentication from "./SocialAuthentication";
import Link from "next/link";
import { variables } from "src/env/env";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data:any) => {
    setIsLoading(true);
    try {
      const email = data.email;
      const parentDataResponse = await fetch(variables.server+`/api/parent/email/${email}`);
      if (parentDataResponse.ok) {
        const parentData = await parentDataResponse.json();
        const { parentId, name } = parentData;

        console.log(parentData)

        // Create session by storing data in local storage
        localStorage.setItem("username", email);
        localStorage.setItem("parentID", parentId);
        localStorage.setItem("name", name);

        // Redirect to dashboard or another page
        router.push("/");
      } else {
        console.error("Failed to retrieve parent data");
      }
    } catch (error) {
      console.error("Error during sign-in process:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        className="w-full max-w-md space-y-4 md:space-y-6 xl:max-w-xl p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-black">Welcome back</h1>

        <FieldWithLabel
          label="Email"
          name="email"
          register={register}
          validation={emailValidation}
          textInputProps={{
            color: generateFieldColor(errors, "email"),
            placeholder: errors.email ? "" : "name@example.com",
            required: true,
            type: "email",
            helperText: generateFieldHelperText(errors, "email"),
            onChange: (e) => setValue("email", e.target.value),
          }}
        />
        <div className="relative">
          <FieldWithLabel
            label="Password"
            name="password"
            register={register}
            validation={requiredField}
            textInputProps={{
              color: generateFieldColor(errors, "password"),
              required: true,
              type: showPassword ? "text" : "password",
              helperText: generateFieldHelperText(errors, "password"),
            }}
          />
          <PasswordVisibility
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            passwordError={errors.password}
          />
        </div>
        <div className="flex items-center">
          <div className="h-0.5 w-full bg-gray-200"></div>
          <div className="px-5 text-center text-gray-500">or</div>
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <SocialAuthentication />

        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex px-2 h-5 items-center">
              <Checkbox id="remember" color="primary" />
            </div>
            <div className="ml-3 text-sm">
              <Label className="text-gray-500" htmlFor="remember">
                Remember me
              </Label>
            </div>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="my-4">
          <Button
            type="submit"
            color="primary"
            className="w-full button-spinner"
            isProcessing={isLoading}
            disabled={isLoading}
          >
            Sign in
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/sign-up" className="text-sm font-medium text-primary-600 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
