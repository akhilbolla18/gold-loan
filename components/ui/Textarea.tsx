"use client";

import { forwardRef } from "react";
import clsx from "clsx";

type TextareaProps = {
  label?: string;
  required?: boolean;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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

        {/* Textarea */}
        <textarea
          ref={ref}
          className={clsx(
            `
            min-h-[98px] w-full px-3 py-2
            rounded-md
            bg-bg
            text-inputText
            font-primary font-normal text-sm 
            border border-border
            leading-[1.4] tracking-normal
            placeholder:text-placeholder
            outline-none
            resize-none
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

Textarea.displayName = "Textarea";

export default Textarea;