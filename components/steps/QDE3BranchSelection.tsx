"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { qde3Schema, QDE3FormData } from "@/schemas/qde3.schema";
import { useJourneyStore } from "@/store/journey.store";
import Image from "next/image";

export default function QDE3BranchSelection() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const setQDE3 = useJourneyStore((s) => s.setQDE3);
  const qde3Data = useJourneyStore((s) => s.qde3);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QDE3FormData>({
    resolver: zodResolver(qde3Schema),
    defaultValues: qde3Data,
  });

  const onSubmit = (data: QDE3FormData) => {
    console.log("QDE-3 Data:", data);
    setQDE3(data);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between flex-1 min-h-[calc(100vh-170px)] xs:min-h-[calc(100vh-200px)] gap-4"
    >
      <div>
        <Input
        label="BRANCH CITY OR PINCODE"
        placeholder="Enter here"
        {...register("searchText")}
        error={errors.searchText?.message}
      />
      </div>

      <div className="flex flex-col gap-4">
        {/* <button
        type="button"
        className="
        w-full
          h-button
          rounded
          border border-[#00AEEF]
          text-base
          text-[#00AEEF]
          font-medium
          flex items-center justify-center gap-2
        "
        onClick={() => {
          console.log("Use current location clicked");
        }}
      >
        <Image src="/icons/location.svg" alt="location" width={20} height={20}/>
         Use Current Location
      </button> */}

      <button
        type="submit"
        className="
                h-button w-full
                rounded
                bg-primary
                text-primaryText
                font-medium text-base
                "
      >
        Save & Continue
      </button>
      </div>
    </form>
  );
}
