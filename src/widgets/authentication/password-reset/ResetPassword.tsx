import { Button } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";
import FieldWithLabel from "@components/field-with-label/FieldWithLabel";
import PasswordVisibility from "@components/PasswordVisibility";
import { emailValidation, requiredField } from "@constants/FormValidation";
import { minPasswordScore } from "@constants/PasswordStrength";
import {
  generateFieldColor,
  generateFieldHelperText,
} from "@utils/general/FormFieldHelper";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetSuccessfull = false;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });

  return (
    <div className="w-full max-w-md space-y-4 md:space-y-6 xl:max-w-xl">
      {!resetSuccessfull ? (
        <form>
          <h1 className="text-2xl font-bold text-black mb-6">Reset Password</h1>
          <FieldWithLabel
            label="Email"
            name="resetPasswordEmail"
            register={register}
            validation={emailValidation}
            textInputProps={{
              color: generateFieldColor(errors, "resetPasswordEmail"),
              placeholder: errors.resetPasswordEmail ? "" : "name@example.com",
              required: true,
              type: "email",
              helperText: generateFieldHelperText(errors, "resetPasswordEmail"),
              onChange: (e) => setValue("resetPasswordEmail", e.target.value),
            }}
          />
          <div className="relative">
            <FieldWithLabel
              label="Password"
              name="resetPassword"
              register={register}
              validation={requiredField}
              textInputProps={{
                color: generateFieldColor(errors, "resetPassword"),
                required: true,
                type: showPassword ? "text" : "password",
                helperText: generateFieldHelperText(errors, "resetPassword"),
                onChange: (e) => setPassword(e.target.value),
              }}
            />
            <PasswordVisibility
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              passwordError={errors.resetPassword}
            />
          </div>
          <div className="relative">
            <FieldWithLabel
              label="Confirm Password"
              name="resetConfirmPassword"
              register={register}
              validation={{
                required: { value: true, message: "This field is required" },
                validate: (value: string) =>
                  value === password || "The passwords do not match",
              }}
              textInputProps={{
                color: generateFieldColor(errors, "resetConfirmPassword"),
                required: true,
                type: showConfirmPassword ? "text" : "password",
                helperText: generateFieldHelperText(
                  errors,
                  "resetConfirmPassword",
                ),
                onChange: (e) =>
                  setValue("resetConfirmPassword", e.target.value),
              }}
            />
            <PasswordVisibility
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              passwordError={errors.resetConfirmPassword}
            />
          </div>
          <PasswordStrengthBar
            password={password}
            scoreWordClassName="hidden"
            className="password-strength-bar"
            onChangeScore={(score: number, feedback: any) =>
              setPasswordScore(score)
            }
          />
          {passwordScore < minPasswordScore && (
            <span className="text-xs text-red-300 italic">
              Password must be of good strength (blue indicator) to proceed.
            </span>
          )}
          <Button
            color="primary"
            type="submit"
            className="w-full mt-6 py-2 button-spinner"
            disabled={isLoading || passwordScore < minPasswordScore}
            isProcessing={isLoading}
            //TODO: onClick={}
          >
            Submit
          </Button>
        </form>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-black mb-6">
            Password Reset Successful!
          </h1>
          <div className="h-20 text-lg text-gray-500">
            Your password has been updated successfully. Please sign in to
            continue.
          </div>
          <Button
            color="primary"
            className="w-full mt-6 py-2"
            //TODO: as={Link}
            //TODO: href="/sign-in"
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
