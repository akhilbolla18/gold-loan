"use client";

import { forwardRef } from "react";
import clsx from "clsx";

type SelectProps = {
  label?: string;
  required?: boolean;
  error?: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, required, error, options, className, ...props }, ref) => {
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
          </label>
        )}

        {/* Select */}
        <select
          ref={ref}
          className={clsx(
            `
            h-input w-full px-3
            rounded-md
            bg-bg text-inputText
            font-primary font-normal text-sm 
            border border-border
            leading-[1.4] tracking-normal
            outline-none
            focus:ring-1 focus:ring-primary
            appearance-none
            bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23667B98%22%20d%3D%22M10.293%203.293%206%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3C%2Fsvg%3E')]
            bg-[length:12px_9px]
            bg-[right_16px_center]
            bg-no-repeat
            [&>option]:bg-bg
            [&>option]:text-inputText
            `,
            error && "border-red-500",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

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

Select.displayName = "Select";

export default Select;
