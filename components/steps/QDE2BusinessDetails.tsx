"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { qde2Schema, QDE2FormData } from "@/schemas/qde2.schema";
import { useJourneyStore } from "@/store/journey.store";

export default function QDE2BusinessDetails() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const prevStep = useJourneyStore((s) => s.prevStep);
  const setQDE2 = useJourneyStore((s) => s.setQDE2);
  const qde2Data = useJourneyStore((s) => s.qde2);
  
  const [emailStatus, setEmailStatus] = useState<"idle" | "verifying" | "sent" | "verified">("idle");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QDE2FormData>({
    resolver: zodResolver(qde2Schema),
    defaultValues: qde2Data,
  });

  const salariedType = watch("salariedType");
  
  const onSubmit = (data: QDE2FormData) => {
    console.log("QDE-2 Data:", data);
    setQDE2(data);
    nextStep();
  };
  
  const handleEmailVerify = () => {
    setEmailStatus("verifying");
    // Simulate email verification
    setTimeout(() => {
      setEmailStatus("sent");
      setTimeout(() => {
        setEmailStatus("verified");
      }, 2000);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        label="FATHER NAME"
        placeholder="Enter name"
        {...register("fatherName")}
        error={errors.fatherName?.message}
      />

      <Input
        label="MOTHER NAME"
        placeholder="Enter name"
        {...register("motherName")}
      />

      <div className="flex flex-col gap-2 w-full">
        <label className="font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
          EMAIL ADDRESS
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter email"
            {...register("email")}
            className={`
              h-input w-full px-3
              rounded-md
              bg-bg text-inputText
              font-primary font-normal text-sm 
              border border-border
              leading-[1.4] tracking-normal
              outline-none
              focus:ring-1 focus:ring-primary
              ${errors.email ? "border-red-500" : ""}
            `}
          />
          {emailStatus === "idle" && (
            <button
              type="button"
              onClick={handleEmailVerify}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00A3FF] font-primary text-sm font-normal"
            >
              Verify
            </button>
          )}
          {emailStatus === "verifying" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFA500] font-primary text-sm font-normal">
              Verifying...
            </span>
          )}
          {emailStatus === "sent" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00A3FF] font-primary text-sm font-normal">
              Sent
            </span>
          )}
          {emailStatus === "verified" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00C853] font-primary text-sm font-normal">
              ✓ Verified
            </span>
          )}
        </div>
        {errors.email && (
          <span className="text-xs text-red-500 font-primary">
            {errors.email.message}
          </span>
        )}
      </div>

      <Select
        label="MARITAL"
        {...register("maritalStatus")}
        error={errors.maritalStatus?.message}
        options={[
          { value: "", label: "Select Marital" },
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
        ]}
      />

      <Select
        label="LANGUAGE"
        {...register("language")}
        error={errors.language?.message}
        options={[
          { value: "", label: "Select Language" },
          { value: "english", label: "English" },
          { value: "hindi", label: "Hindi" },
          { value: "tamil", label: "Tamil" },
          { value: "telugu", label: "Telugu" },
          { value: "kannada", label: "Kannada" },
          { value: "malayalam", label: "Malayalam" },
        ]}
      />

      <Select
        label="RESIDENCE TYPE"
        {...register("residenceType")}
        error={errors.residenceType?.message}
        options={[
          { value: "", label: "Select Residence" },
          { value: "owned", label: "Owned" },
          { value: "rented", label: "Rented" },
          { value: "company_provided", label: "Company Provided" },
          { value: "parental", label: "Parental" },
        ]}
      />

      <div className="flex gap-6 mt-2">
        <label className="flex items-center gap-2 font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
          <input
            type="radio"
            value="SALARIED"
            {...register("salariedType")}
            className="accent-labelText w-4 h-4"
          />
          SALARIED
        </label>

        <label className="flex items-center gap-2 font-primary text-[12px] font-normal leading-[1.38] tracking-normal text-labelText">
          <input
            type="radio"
            value="NON_SALARIED"
            {...register("salariedType")}
            className="accent-labelText w-4 h-4"
          />
          NON SALARIED
        </label>
      </div>

      {salariedType === "SALARIED" && (
        <>
          <Input
            label="OFFICE PINCODE"
            placeholder="Enter pincode"
            {...register("officePincode")}
            error={errors.officePincode?.message}
          />

          <Input
            label="OFFICE ADDRESS LINE 1"
            required
            placeholder="Enter Office Address"
            {...register("officeAddress1")}
            error={errors.officeAddress1?.message}
          />

          <Input
            label="OFFICE ADDRESS LINE 2"
            placeholder="Enter Office Address"
            {...register("officeAddress2")}
          />
        </>
      )}

      {salariedType === "NON_SALARIED" && (
        <>
          <Input
            label="TURN OVER (NET MONTHLY TURN OVER)"
            placeholder="Enter Amount"
            {...register("turnover")}
            error={errors.turnover?.message}
          />

          <Input
            label="PINCODE"
            placeholder="Enter Pincode Here"
            {...register("businessPincode")}
            error={errors.businessPincode?.message}
          />

          <Input
            label="BUSINESS ADDRESS LINE 1"
            required
            placeholder="Enter Business Address"
            {...register("businessAddress1")}
            error={errors.businessAddress1?.message}
          />

          <Input
            label="BUSINESS ADDRESS LINE 2"
            placeholder="Enter Business Address"
            {...register("businessAddress2")}
          />
        </>
      )}

      <div className="flex flex-col items-center mt-6">
        <button
          type="submit"
          className="
            h-button w-full
            rounded
            bg-primary
            text-primaryText
            font-medium
          "
        >
          Save & Continue
        </button>
        
        <button
          type="button"
          className="
            mt-3
            font-[Lato]
            font-normal
            text-[12px]
            leading-[129%]
            text-[#001C43]
            underline
            decoration-solid
            underline-offset-0
          "
          onClick={() => nextStep()}
        >
          Skip for now
        </button>
      </div>
    </form>
  );
}
