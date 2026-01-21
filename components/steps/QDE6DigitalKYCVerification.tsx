"use client";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "../ui/Checkbox";
import { useJourneyStore } from "@/store/journey.store";
import Image from "next/image";

export default function QDE6DigitalKYCVerification() {
  const nextStep = useJourneyStore((s) => s.nextStep);

  return (
    <div className="flex flex-col">
      {/* =======================
          1️⃣ VERIFY IDENTITY CONTAINER
      ======================= */}
      <div className="flex flex-col gap-2">
        <h2
          className="
            font-primary font-semibold
            text-[22px] leading-[100%]
            text-[#001C43]
          "
        >
          Verify identity
        </h2>

        <p
          className="
            font-primary font-normal
            text-[16px] leading-[22px]
            text-[#4F4F4F]
          "
        >
          Verify your identity via CKYC to get instant
          approval for your Gold Loan.
        </p>
      </div>

      {/* Gap between 1st & 2nd container */}
      <div className="h-[33px]" />

      {/* =======================
          2️⃣ DIGILOCKER CONTAINER
      ======================= */}
      <button
        type="button"
        className="
          w-full h-[48px]
          flex items-center justify-between
          px-4
          border border-[#001C43]
          rounded-[5px]
        "
      >
        <span className="text-sm font-normal text-[#242D3C] leading-[140%]">
          Verify with Digilocker
        </span>

        <Image
          src="/images/digilocker.svg"
          alt="Digilocker"
          width={97}
          height={24}
        />
      </button>

      {/* Gap between DigiLocker & personal details */}
      <div className="h-[24px]" />

      {/* =======================
          3️⃣ USER DETAILS (READ-ONLY)
          Style SAME as QDE-1
      ======================= */}
      <div className="flex flex-col gap-4">
        <Input
          label="FULL NAME *"
          value="Anirudh Loya"
          disabled
        />

        <Input
          label="DATE OF BIRTH (DOB) *"
          value="12/11/2001"
          disabled
        />

        <Input
          label="GENDER"
          value="MALE"
          disabled
        />

        <Input
          label="MOBILE NUMBER *"
          value="+91 9125688852"
          disabled
        />

        <Input
          label="PAN NUMBER *"
          value="EMXKP7846H"
          disabled
        />

        <Textarea
  label="ADDRESS"
  value="123, Palm Grove Heights, Sector 4,
Mumbai, Maharashtra - 400001"
  disabled
  rows={3}
/>

<Checkbox
  label="I confirm that these details are current and correct."
  defaultChecked
/>
      </div>

      {/* =======================
          ACTIONS
      ======================= */}
      <div className="mt-14 flex flex-col gap-4">
        {/* Edit */}
        <button
          type="button"
          className="
            h-button w-full
            rounded
            text-base
            border border-[#00AEEF]
            text-[#00AEEF] font-medium font-primary
            flex items-center justify-center gap-2
          "
        >
          <Image
            src="/icons/edit.svg"
            alt="Edit"
            width={20}
            height={20}
          />
          Edit Information
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={nextStep}
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

        {/* Skip */}
        <button
          type="button"
          onClick={nextStep}
          className="text-sm text-primary underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
