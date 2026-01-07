"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import GoldPuritySlider from "@/components/ui/GoldPuritySlider";
import { qde1Schema, QDE1FormData } from "@/schemas/qde1.schema";
import { useJourneyStore } from "@/store/journey.store";
import { useState } from "react";

export default function QDE1PersonalDetails() {
    const nextStep = useJourneyStore((s) => s.nextStep);
    const [goldPurity, setGoldPurity] = useState(10);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QDE1FormData>({
        resolver: zodResolver(qde1Schema),
        defaultValues: {
            goldPurity: 10,
        },
    });

    const onSubmit = (data: QDE1FormData) => {
        console.log("QDE-1 Data:", { ...data, goldPurity });
        nextStep();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <Input
                label="Title"
                required
                placeholder="Enter title"
                {...register("title")}
                error={errors.title?.message}
            />

            <Input
                label="First Name"
                required
                placeholder="Enter name"
                {...register("firstName")}
                error={errors.firstName?.message}
            />

            <Input
                label="Middle Name"
                placeholder="Enter name"
                {...register("middleName")}
            />

            <Input
                label="Last Name"
                required
                placeholder="Enter name"
                {...register("lastName")}
                error={errors.lastName?.message}
            />

            <Input
                label="Date of Birth (DOB)"
                required
                placeholder="DD/MM/YYYY"
                {...register("dob")}
                error={errors.dob?.message}
            />

            <Input
                label="Gender"
                placeholder="MALE"
                {...register("gender")}
            />

            <Input
                label="Mobile Number"
                required
                placeholder="Enter your mobile number"
                {...register("mobile")}
                error={errors.mobile?.message}
            />

            <Input
                label="PAN Number"
                required
                placeholder="Enter your PAN number"
                {...register("pan")}
                error={errors.pan?.message}
            />

            <GoldPuritySlider
                value={goldPurity}
                onChange={setGoldPurity}
            />

            <Input
                label="Loan Amount"
                required
                placeholder="Enter loan amount"
                {...register("loanAmount")}
                error={errors.loanAmount?.message}
            />

            {/* Save & Continue */}
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
                Save & Continue
            </button>
        </form>
    );
}
