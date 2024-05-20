import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const PasswordVisibility = ({
  showPassword,
  setShowPassword,
  passwordError,
}: {
  showPassword: boolean;
  setShowPassword: Function;
  passwordError?: object;
}) => {
  return (
    <span
      className={`absolute w-5 h-5 right-4 top-0 bottom-0 my-auto text-gray-400 cursor-pointer transition-all ${"mt-9"}`}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
    </span>
  );
};

export default PasswordVisibility;
