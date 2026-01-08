"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { qde2Schema, QDE2FormData } from "@/schemas/qde2.schema";
import { useJourneyStore } from "@/store/journey.store";

export default function QDE2BusinessDetails() {
  const nextStep = useJourneyStore((s) => s.nextStep);
  const prevStep = useJourneyStore((s) => s.prevStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QDE2FormData>({
    resolver: zodResolver(qde2Schema),
    defaultValues: {
      salariedType: "SALARIED",
    },
  });

  const onSubmit = (data: QDE2FormData) => {
    console.log("QDE-2 Data:", data);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        label="Father Name"
        required
        placeholder="Enter father name"
        {...register("fatherName")}
        error={errors.fatherName?.message}
      />

      <Input
        label="Mother Name"
        placeholder="Enter mother name"
        {...register("motherName")}
      />

      <Input
        label="Constitution"
        placeholder="Enter constitution"
        {...register("constitution")}
      />

      <Input
        label="Email Address"
        placeholder="Enter email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Marital Status"
        placeholder="Enter marital status"
        {...register("maritalStatus")}
      />

      <Input
        label="Profession"
        placeholder="Enter profession"
        {...register("profession")}
      />

      <Input
        label="Employment Type"
        placeholder="Enter employment"
        {...register("employmentType")}
      />

      <Input
        label="Designation"
        placeholder="Enter designation"
        {...register("designation")}
      />

      <Input
        label="Residence Type"
        placeholder="Enter residence"
        {...register("residenceType")}
      />

      <Input
        label="Language"
        placeholder="Enter language"
        {...register("language")}
      />

      {/* Salaried / Non-Salaried */}
      <div className="flex gap-6 mt-2">
        <label className="flex items-center gap-2 text-text text-sm">
          <input
            type="radio"
            value="SALARIED"
            {...register("salariedType")}
          />
          Salaried
        </label>

        <label className="flex items-center gap-2 text-text text-sm">
          <input
            type="radio"
            value="NON_SALARIED"
            {...register("salariedType")}
          />
          Non Salaried
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="
            h-button flex-1
            rounded border border-border
            text-text font-medium
          "
        >
          Back
        </button>

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
