import { Button } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FieldWithLabel from "@components/field-with-label/FieldWithLabel";
import { emailValidation } from "@constants/FormValidation";
import {
  generateFieldColor,
  generateFieldHelperText,
} from "@utils/general/FormFieldHelper";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [displayResetLinkSuccess, setdisplayResetLinkSuccess] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });

  return (
    <div className="w-full max-w-md space-y-4 md:space-y-6 xl:max-w-xl">
      {!displayResetLinkSuccess ? (
        <form>
          <h1 className="text-2xl font-bold text-black mb-6">
            Forgot Password?
          </h1>
          <div className="h-20 text-lg text-gray-500">
            Enter the email you signed up with and we'll send you a link to
            reset your password.
          </div>
          <div className="max-md:mt-6">
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
                value: email,
                helperText: <>{generateFieldHelperText(errors, "email")} </>,
                onChange: (e: any) => setEmail(e.target.value),
              }}
            />
          </div>
          <Button
            color="primary"
            type="submit"
            className="w-full mt-6 py-2 button-spinner"
            isProcessing={isLoading}
            disabled={isLoading}
            //TODO: onClick={}
          >
            Submit
          </Button>
        </form>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-black mb-6">
            Reset Link Sent!
          </h1>
          <div className="h-20 text-lg text-gray-500">
            Please check your email for the password reset link.
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
