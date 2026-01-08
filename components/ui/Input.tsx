"use client";

import { forwardRef } from "react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {/* Label */}
        {label && (
          <label
            className="
              font-primary text-[12px] font-normal leading-[1.38] tracking-normal
              text-labelText
            "
          >
            {label}
            {/* {required && <span className="text-red-500"> *</span>} */}
          </label>
        )}

        {/* Input */}
        <input
          ref={ref}
          className={clsx(
            `
            h-input w-full px-3
            rounded-md
            bg-bg
            text-inputText
            font-primary font-normal text-sm 
            border border-border
            leading-[1.4] tracking-normal
            placeholder:text-placeholder
            outline-none
            focus:ring-1 focus:ring-primary
            `,
            error && "border-red-500",
            className
          )}
          {...props}
        />

        {/* Error */}
        {error && (
          <span className="text-xs text-red-500 font-primary">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
