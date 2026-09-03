import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isRequired?: boolean;
  error?: string;
};

function TextField({
  type = "text",
  label,
  name,
  dir = "rtl",
  isRequired,
  error,
  className,
  ...rest
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";

  // the eye swaps the field between hidden and readable
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div className="textField flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-secondary-700 dark:text-secondary-300"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          name={name}
          id={name}
          dir={dir}
          className={`
            w-full h-9 px-4 rounded-lg border shadow-sm font-medium transition-all duration-300 ease-out
            outline-none focus-visible:ring-[3px] dark:bg-[#0F0F0F]
            ${isPassword ? "pr-10" : ""}
            ${dir === "ltr" ? "text-left" : "text-right"}
            ${className ?? ""}
            ${error
              ? "border-red-500 text-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20 dark:border-red-500 dark:text-red-400 dark:focus-visible:ring-red-500/20 placeholder:text-red-300"
              : "border-[#E5E5E5] hover:border-primary-500 focus-visible:border-primary-500 focus-visible:ring-neutral-500/20 dark:border-[#2E2E2E] dark:focus-visible:border-neutral-600 dark:focus-visible:ring-neutral-600/20 text-secondary-900 dark:text-secondary-100"
            }
          `}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#737373] transition-colors hover:text-secondary-900 dark:hover:text-white"
          >
            {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium animate-in fade-in slide-in-from-top-1 duration-200 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextField;
