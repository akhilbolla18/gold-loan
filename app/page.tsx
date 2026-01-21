"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import { useRef } from "react";
import { useRouter } from "next/navigation";


type LoginStep = "MOBILE" | "VERIFY" | "OTP";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const otpRefs = useRef<HTMLInputElement[]>([]);


  return (
    <div className="flex flex-col px-4 py-3">
      {/* Back arrow */}
      {/* {step !== "MOBILE" && (
        <button onClick={() => setStep("MOBILE")}>
          <Image
            src="/icons/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>
      )} */}

      <button onClick={() => setStep("MOBILE")}>
          <Image
            src="/icons/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>

      {/* ================= SCREEN 1 ================= */}
      {step === "MOBILE" && (
        <>
          <h1 className="font-primary text-2xl leading-[36px] font-semibold text-[#001C43] mt-4 mb-6">
            Account Login
          </h1>

          <Input
            label="MOBILE NUMBER *"
            placeholder="Enter your mobile number"
            value={mobile}
            autoFocus
            onChange={(e) => setMobile(e.target.value)}
          />

          <button
            onClick={() => setStep("VERIFY")}
            className="
              mt-6 h-button w-full
              rounded bg-primary
              text-primaryText font-medium
            "
          >
            Continue
          </button>
        </>
      )}

      {/* ================= SCREEN 2 ================= */}
      {step === "VERIFY" && (
        <>
          <h1 className="font-primary text-2xl leading-[36px] font-semibold text-[#001C43] mt-4 mb-6">
            Enter any one of below
          </h1>

          <Input
            label="DATE OF BIRTH (DOB) *"
            placeholder="DD/MM/YYYY"
            autoFocus
          />

          <div className="font-primary text-center font-normal my-2 text-xs text-labelText">
            OR
          </div>

          <Input
            label="PAN NUMBER *"
            placeholder="Enter your PAN number"
          />

          <button
            onClick={() => setStep("OTP")}
            className="
              mt-[120px] h-button w-full
              rounded bg-primary
              text-primaryText font-medium
            "
          >
            Continue
          </button>
        </>
      )}

      {/* ================= SCREEN 3 ================= */}
{step === "OTP" && (
  <>
    <h1 className="font-primary text-2xl leading-[36px] font-semibold text-[#001C43] mt-4 mb-3">
      Confirm your number
    </h1>

    {/* OTP sent text */}
    <p className="font-primary text-base font-normal text-[#939598] leading-[148%] mb-4">
      OTP sent to your mobile number{" "}
      <span className="text-[#939598]">9xxxx xxx78</span>
    </p>

    {/* OTP Label */}
    <label className="text-xs leading-[138%] font-normal text-labelText mb-2 ">
      OTP CODE
    </label>

    {/* OTP boxes - Updated to match Figma */}
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

    {/* Resend OTP - moved above button */}
    <button className="mt-4 mb-4 text-sm leading-[140%] font-primary font-normal text-primary">
  RESEND OTP
</button>

    <button
    onClick={() => router.push("/apply-gold-loan")}
      className="
        h-button w-full
        rounded bg-primary
        text-primaryText font-medium
      "
    >
      Verify & Continue
    </button>
  </>
)}

    </div>
  );
}
