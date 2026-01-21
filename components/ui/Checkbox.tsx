"use client";

import { forwardRef } from "react";
import clsx from "clsx";

type CheckboxProps = {
  label?: string;
  subtitle?: string;
  size?: "small" | "medium" | "large";
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, subtitle, size = "small", error, className, ...props }, ref) => {
    const checkboxSize = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
      large: "w-6 h-6",
    } as const;

    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-start gap-2">
          {/* Custom Checkbox */}
          <div className="relative flex items-center justify-center pt-0.5">
            <input
              ref={ref}
              type="checkbox"
              className={clsx(
                "peer appearance-none cursor-pointer rounded border-2 border-border bg-white",
                "checked:bg-primary checked:border-primary",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                "disabled:cursor-not-allowed disabled:opacity-50",
                checkboxSize[size as keyof typeof checkboxSize],
                error && "border-red-500",
                className
              )}
              {...props}
            />
            {/* Checkmark Icon */}
            <svg
              className={clsx(
                "absolute pointer-events-none hidden peer-checked:block",
                size === "small" && "w-3 h-3",
                size === "medium" && "w-4 h-4",
                size === "large" && "w-5 h-5"
              )}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 4L5.99984 11.3333L2.6665 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Label & Subtitle */}
          <div className="flex flex-col gap-0.5 flex-1">
            {label && (
              <label
                className="
                  font-primary text-sm font-medium leading-[1.43] tracking-normal
                  text-[#2B2B2A]
                  cursor-pointer
                "
              >
                {label}
              </label>
            )}
            {subtitle && (
              <span className="font-primary text-xs text-gray-500">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <span className="text-xs text-red-500 font-primary ml-6">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;