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
  const [mobileError, setMobileError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef<HTMLInputElement[]>([]);

  // Mobile number validation
  const validateMobile = (value: string): string => {
    if (!value) {
      return "Mobile number is required";
    }
    if (!/^\d+$/.test(value)) {
      return "Mobile number must contain only digits";
    }
    if (value.length !== 10) {
      return "Mobile number must be exactly 10 digits";
    }
    return "";
  };

  // Handle mobile input change
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    if (value === "" || /^\d+$/.test(value)) {
      setMobile(value);
      // Real-time validation
      const error = validateMobile(value);
      setMobileError(error);
    }
  };

  // Handle mobile blur
  const handleMobileBlur = () => {
    const error = validateMobile(mobile);
    setMobileError(error);
  };

  // Handle mobile submit (Enter key)
  const handleMobileSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const error = validateMobile(mobile);
    setMobileError(error);
    if (!error) {
      setStep("VERIFY");
    }
  };

  // Handle Enter key on mobile input
  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMobileSubmit();
    }
  };

  // Auto-format DOB to DD/MM/YYYY
  const formatDob = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Format as DD/MM/YYYY
    let formatted = "";
    if (digits.length > 0) {
      formatted = digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += "/" + digits.substring(2, 4);
    }
    if (digits.length > 4) {
      formatted += "/" + digits.substring(4, 8);
    }
    
    return formatted;
  };

  // Validate DOB
 const validateDob = (value: string): string => {
  if (!value) return "";
  
  const parts = value.split("/");
  if (parts.length !== 3) {
    return "Invalid date format. Use DD/MM/YYYY";
  }
  
  const [day, month, year] = parts.map(p => parseInt(p, 10));
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Invalid date";
  }
  
  // Create date object (month is 0-indexed in JS)
  const date = new Date(year, month - 1, day);
  
  // Check if date is valid (Date object auto-corrects invalid dates)
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return "Invalid date";
  }
  
  // Check if date is in the past
  if (date > new Date()) {
    return "Date of birth cannot be in the future";
  }
  
  // Check minimum year
  if (year < 1800) {
    return "Invalid year";
  }
  
  return "";
};

  // Handle DOB change
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatDob(value);
    setDob(formatted);
    
    // Validate if complete
    if (formatted.length === 10) {
      const error = validateDob(formatted);
      setDobError(error);
    } else {
      setDobError("");
    }
  };

  // Handle DOB blur
  const handleDobBlur = () => {
    if (dob) {
      const error = validateDob(dob);
      setDobError(error);
    }
  };

  // Validate PAN
  const validatePan = (value: string): string => {
    if (!value) {
      return "";
    }
    
    // PAN format: 5 letters, 4 digits, 1 letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(value.toUpperCase())) {
      return "Invalid PAN format";
    }
    
    return "";
  };

  // Handle PAN change
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPan(value);
    
    if (value.length === 10) {
      const error = validatePan(value);
      setPanError(error);
    } else {
      setPanError("");
    }
  };

  // Handle PAN blur
  const handlePanBlur = () => {
    if (pan) {
      const error = validatePan(pan);
      setPanError(error);
    }
  };

  // Handle verify step submit
  const handleVerifySubmit = () => {
    let hasError = false;
    
    // Check if at least one field is filled
    if (!dob && !pan) {
      setDobError("Please enter either Date of Birth or PAN");
      setPanError("Please enter either Date of Birth or PAN");
      return;
    }
    
    // Validate DOB if filled
    if (dob) {
      const error = validateDob(dob);
      setDobError(error);
      if (error) hasError = true;
    }
    
    // Validate PAN if filled
    if (pan) {
      const error = validatePan(pan);
      setPanError(error);
      if (error) hasError = true;
    }
    
    if (!hasError) {
      setStep("OTP");
    }
  };

  // Validate OTP (dummy validation)
  const validateOtp = (value: string): string => {
    if (!value || value.length !== 6) {
      return "Please enter complete 6-digit OTP";
    }
    
    // Dummy OTP validation - accept 123456
    if (value !== "123456") {
      return "Invalid OTP. Use 123456 for demo";
    }
    
    return "";
  };

  // Handle OTP submit
  const handleOtpSubmit = () => {
    const error = validateOtp(otp);
    setOtpError(error);
    
    if (!error) {
      router.push("/apply-gold-loan");
    }
  };

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

      {/* ================= SCREEN 1 - MOBILE ================= */}
      {step === "MOBILE" && (
        <>
          <h1 className="font-primary text-2xl leading-[36px] font-semibold text-[#001C43] mt-4 mb-6">
            Account Login
          </h1>

          <form onSubmit={handleMobileSubmit}>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
                MOBILE NUMBER *
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={mobile}
                autoFocus
                maxLength={10}
                onChange={handleMobileChange}
                onBlur={handleMobileBlur}
                onKeyDown={handleMobileKeyDown}
                className={`
                  h-input w-full px-3
                  rounded-md
                  bg-bg text-inputText
                  font-primary font-normal text-sm 
                  border ${mobileError ? "border-red-500" : "border-border"}
                  leading-[1.4] tracking-normal
                  placeholder:text-placeholder
                  outline-none
                  focus:ring-1 focus:ring-primary
                `}
              />
              {mobileError && (
                <span className="text-xs text-red-500 font-primary">
                  {mobileError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="
                mt-6 h-button w-full
                rounded bg-primary
                text-primaryText font-medium
              "
            >
              Continue
            </button>
          </form>
        </>
      )}

      {/* ================= SCREEN 2 - VERIFY ================= */}
      {step === "VERIFY" && (
        <>
          <h1 className="font-primary text-2xl leading-[36px] font-semibold text-[#001C43] mt-4 mb-6">
            Enter any one of below
          </h1>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
              DATE OF BIRTH (DOB) *
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={dob}
              autoFocus
              maxLength={10}
              onChange={handleDobChange}
              onBlur={handleDobBlur}
              className={`
                h-input w-full px-3
                rounded-md
                bg-bg text-inputText
                font-primary font-normal text-sm 
                border ${dobError ? "border-red-500" : "border-border"}
                leading-[1.4] tracking-normal
                placeholder:text-placeholder
                outline-none
                focus:ring-1 focus:ring-primary
              `}
            />
            {dobError && (
              <span className="text-xs text-red-500 font-primary">
                {dobError}
              </span>
            )}
          </div>

          <div className="font-primary text-center font-normal my-2 text-xs text-labelText">
            OR
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
              PAN NUMBER *
            </label>
            <input
              type="text"
              placeholder="Enter your PAN number"
              value={pan}
              maxLength={10}
              onChange={handlePanChange}
              onBlur={handlePanBlur}
              className={`
                h-input w-full px-3
                rounded-md
                bg-bg text-inputText
                font-primary font-normal text-sm 
                border ${panError ? "border-red-500" : "border-border"}
                leading-[1.4] tracking-normal
                placeholder:text-placeholder
                outline-none
                focus:ring-1 focus:ring-primary
              `}
            />
            {panError && (
              <span className="text-xs text-red-500 font-primary">
                {panError}
              </span>
            )}
          </div>

          <button
            onClick={handleVerifySubmit}
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

      {/* ================= SCREEN 3 - OTP ================= */}
      {step === "OTP" && (
        <>
          <h1 className="font-primary text-2xl leading-[36px] font-semibold text-[#001C43] mt-4 mb-3">
            Confirm your number
          </h1>

          {/* OTP sent text */}
          <p className="font-primary text-base font-normal text-[#939598] leading-[148%] mb-4">
            OTP sent to your mobile number{" "}
            <span className="text-[#939598]">
              {mobile ? `${mobile.substring(0, 1)}xxxx xxx${mobile.substring(8)}` : "9xxxx xxx78"}
            </span>
          </p>

          {/* OTP Label */}
          <label className="text-xs leading-[138%] font-normal text-labelText mb-2 ">
            OTP CODE
          </label>

          {/* OTP boxes */}
          <div className="flex w-full justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  if (el) otpRefs.current[i] = el;
                }}
                maxLength={1}
                autoFocus={i === 0}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`
                  w-[48px] h-[48px]
                  rounded-md
                  bg-bg
                  text-inputText
                  font-primary font-normal text-sm 
                  border ${otpError ? "border-red-500" : "border-border"}
                  leading-[1.4] tracking-normal
                  placeholder:text-placeholder
                  outline-none
                  focus:ring-1 focus:ring-primary text-center
                `}
                onChange={(e) => {
                  const value = e.target.value;

                  // Only allow digits
                  if (value && !/^\d$/.test(value)) {
                    return;
                  }

                  setOtp((prev) => {
                    const next = prev.split("");
                    next[i] = value;
                    const newOtp = next.join("");
                    
                    // Clear error when user types
                    if (otpError) {
                      setOtpError("");
                    }
                    
                    return newOtp;
                  });

                  // Move to next input
                  if (value && i < 5) {
                    otpRefs.current[i + 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  // Move back on delete
                  if (e.key === "Backspace") {
                    setOtp((prev) => {
                      const next = prev.split("");
                      next[i] = "";
                      return next.join("");
                    });
                    
                    if (!otp[i] && i > 0) {
                      otpRefs.current[i - 1]?.focus();
                    }
                  }
                }}
                value={otp[i] || ""}
              />
            ))}
          </div>

          {/* OTP Error */}
          {otpError && (
            <span className="text-xs text-red-500 font-primary mt-2 block">
              {otpError}
            </span>
          )}

          {/* Resend OTP */}
          <button className="mt-4 mb-4 text-sm leading-[140%] font-primary font-normal text-primary">
            RESEND OTP
          </button>

          <button
            onClick={handleOtpSubmit}
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
