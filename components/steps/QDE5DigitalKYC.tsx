"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { useRef } from "react";
import { qde5Schema, QDE5FormData } from "@/schemas/qde5.schema";
import { useJourneyStore } from "@/store/journey.store";

export default function QDE5DigitalKYC() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const setQDE5 = useJourneyStore((s) => s.setQDE5);
  const stored = useJourneyStore((s) => s.qde5);

  const [otpSent, setOtpSent] = useState(true);
    const [otp, setOtp] = useState("");
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QDE5FormData>({
    resolver: zodResolver(qde5Schema),
    defaultValues: stored ?? {
      pan: "",
      mobile: "+91 9390424100",
    },
  });

  const onSendOtp = (data: QDE5FormData) => {
    // API will be called here later
    setQDE5(data);
    setOtpSent(true);
  };

  const onVerifyOtp = (data: QDE5FormData) => {
    // OTP verification API later
    setQDE5(data);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(otpSent ? onVerifyOtp : onSendOtp)}
      className="flex flex-col gap-4"
    >
      {/* PAN */}
      <Input
        label="ENTER PAN"
        placeholder="ABCDE1234F"
        {...register("pan")}
        error={errors.pan?.message}
      />

      {/* MOBILE (read-only in real app) */}
      <Input
        label="MOBILE NUMBER"
        placeholder="+91 XXXXX XXXXX"
        {...register("mobile")}
        disabled
      />

      {/* OTP */}
      {otpSent && (
        <div className="w-full">
         <label className="text-xs leading-[138%] font-normal text-labelText mb-2 ">
      OTP CODE
    </label>

    <div className="flex w-full justify-between">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) otpRefs.current[i] = el;
          }}
          maxLength={1}
          autoFocus={i === 0}
          className="
            w-[48px] h-[48px]
             rounded-md
            bg-bg
            text-inputText
            font-primary font-normal text-sm 
            border border-border
            leading-[1.4] tracking-normal
            placeholder:text-placeholder
            outline-none
            focus:ring-1 focus:ring-primary text-center
          "
          onChange={(e) => {
            const value = e.target.value;

            setOtp((prev) => {
              const next = prev.split("");
              next[i] = value;
              return next.join("");
            });

            // Move to next input
            if (value && i < 5) {
              otpRefs.current[i + 1]?.focus();
            }
          }}
          onKeyDown={(e) => {
            // Move back on delete
            if (e.key === "Backspace" && !otp[i] && i > 0) {
              otpRefs.current[i - 1]?.focus();
            }
          }}
        />
      ))}
    </div>
    </div>
      )}
       
      

      {/* ACTION BUTTON */}
      <button
        type="submit"
        className="
          mt-4
          h-button w-full
          rounded
          bg-primary
          text-primaryText
          font-medium text-base
        "
      >
        {otpSent ? "Verify OTP" : "Send OTP"}
      </button>

      {/* SKIP */}
      {!otpSent && (
        <button
          type="button"
          onClick={nextStep}
          className="text-sm text-primary underline"
        >
          Skip for now
        </button>
      )}
    </form>
  );
}
