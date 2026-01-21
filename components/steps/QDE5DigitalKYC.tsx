"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { qde5Schema, QDE5FormData } from "@/schemas/qde5.schema";
import { useJourneyStore } from "@/store/journey.store";

export default function QDE5DigitalKYC() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const setQDE5 = useJourneyStore((s) => s.setQDE5);
  const stored = useJourneyStore((s) => s.qde5);

  const [otpSent, setOtpSent] = useState(true);

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
        <Input
          label="ENTER OTP"
          placeholder="Enter 6 digit OTP"
          {...register("otp")}
          error={errors.otp?.message}
        />
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
