"use client";

import { Button, Checkbox, Label } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Corrected import
import { SubmitHandler, useForm } from "react-hook-form";
import FieldWithLabel from "@components/field-with-label/FieldWithLabel";
import PasswordVisibility from "@components/PasswordVisibility";
import { emailValidation, requiredField } from "@constants/FormValidation";
import {
  generateFieldColor,
  generateFieldHelperText,
} from "@utils/general/FormFieldHelper";
import SocialAuthentication from "./SocialAuthentication";

interface ICompleteAccountForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter(); // Corrected import

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICompleteAccountForm>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ICompleteAccountForm> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/parent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.first_name} ${data.last_name}`,
          email: data.email,
          children: [],
        }),
      });

      if (response.ok) {
        // Redirect to the Sign-In page upon successful sign-up
        router.push("/sign-in");
      } else {
        // Handle error response
        console.error("Failed to create parent");
      }
    } catch (error) {
      console.error("Error creating parent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div>
      <form
        className="w-full max-w-md space-y-4 md:space-y-6 xl:max-w-xl p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-black">Welcome!</h1>

        <FieldWithLabel
          name="first_name"
          label="First Name"
          errors={errors}
          register={register}
          validation={requiredField}
          textInputProps={{
            color: generateFieldColor(errors, "first_name"),
            placeholder: errors.first_name ? "" : "Bonnie",
            required: true,
            type: "text",
            helperText: generateFieldHelperText(errors, "first_name"),
            onChange: (e: any) => setValue("first_name", e.target.value),
          }}
        />
        <FieldWithLabel
          name="last_name"
          label="Last Name"
          errors={errors}
          register={register}
          validation={requiredField}
          textInputProps={{
            color: generateFieldColor(errors, "last_name"),
            placeholder: errors.last_name ? "" : "Tyler",
            required: true,
            type: "text",
            helperText: generateFieldHelperText(errors, "last_name"),
            onChange: (e: any) => setValue("last_name", e.target.value),
          }}
        />

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
            onChange: (e: any) => setValue("email", e.target.value),
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
        <div className="relative">
          <FieldWithLabel
            label="Confirm Password"
            name="confirm_password"
            register={register}
            validation={{
              validate: (value: string) =>
                value === password || "Passwords do not match.",
            }}
            textInputProps={{
              color: generateFieldColor(errors, "confirm_password"),
              required: true,
              type: showConfirmPassword ? "text" : "password",
              helperText: generateFieldHelperText(errors, "confirm_password"),
            }}
          />
          <PasswordVisibility
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            passwordError={errors.confirm_password}
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
          <a
            href="/forgot-password"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div className="my-4">
          <Button
            type="submit"
            color="primary"
            className="w-full button-spinner"
            isProcessing={isLoading}
            disabled={isLoading}
          >
            Sign up
          </Button>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary-600 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
