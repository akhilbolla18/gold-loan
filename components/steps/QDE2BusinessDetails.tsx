"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { qde2Schema, QDE2FormData } from "@/schemas/qde2.schema";
import { useJourneyStore } from "@/store/journey.store";

export default function QDE2BusinessDetails() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const prevStep = useJourneyStore((s) => s.prevStep);
  const setQDE2 = useJourneyStore((s) => s.setQDE2);
  const qde2Data = useJourneyStore((s) => s.qde2);

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        label="FATHER NAME"
        placeholder="Enter father name"
        {...register("fatherName")}
        error={errors.fatherName?.message}
      />

      <Input
        label="MOTHER NAME"
        placeholder="Enter mother name"
        {...register("motherName")}
      />

      <Input
        label="CONSTITUTION"
        placeholder="Enter constitution"
        {...register("constitution")}
      />

      <Input
        label="EMAIL ADDRESS"
        placeholder="Enter email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="MARITAL STATUS"
        placeholder="Enter marital status"
        {...register("maritalStatus")}
      />

      <Input
        label="PROFESSION"
        placeholder="Enter profession"
        {...register("profession")}
      />

      <Input
        label="EMPLOYMENT TYPE"
        placeholder="Enter employment"
        {...register("employmentType")}
      />

      <Input
        label="DESIGNATION"
        placeholder="Enter designation"
        {...register("designation")}
      />

      <Input
        label="RESIDENCE TYPE"
        placeholder="Enter residence"
        {...register("residenceType")}
      />

      <Input
        label="LANGUAGE"
        placeholder="Enter language"
        {...register("language")}
      />

      <div className="flex gap-6 mt-2">
        <label className="flex items-center gap-2 font-primary text-[12px] font-normal leading-[1.38] tracking-normal
          text-labelText">
          <input
            type="radio"
            value="SALARIED"
            {...register("salariedType")}
            className="accent-labelText w-4 h-4"
          />
          SALARIED
        </label>

        <label className="flex items-center gap-2 font-primary text-[12px] font-normal leading-[1.38] tracking-normal
          text-labelText">
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
      label="OFFICE ADDRESS LINE 1"
      required
      placeholder="Enter office address line 1"
      {...register("officeAddress1")}
      error={errors.officeAddress1?.message}
    />

    <Input
      label="OFFICE ADDRESS LINE 2"
      placeholder="Enter office address line 2"
      {...register("officeAddress2")}
    />

    <Input
      label="OFFICE PINCODE"
      required
      placeholder="Enter office pincode"
      {...register("officePincode")}
      error={errors.officePincode?.message}
    />
  </>
)}


      <div className="flex mt-6">
        <button
          type="submit"
          className="
            h-button flex-1
            rounded
            bg-primary
            text-primaryText
            font-medium
          "
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}
