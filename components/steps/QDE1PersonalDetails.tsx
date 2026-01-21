"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import GoldPuritySlider from "@/components/ui/GoldPuritySlider";
import { qde1Schema, QDE1FormData } from "@/schemas/qde1.schema";
import { useJourneyStore } from "@/store/journey.store";

export default function QDE1PersonalDetails() {
    const nextStep = useJourneyStore((s) => s.nextStep);
    const qde1Data = useJourneyStore((s) => s.qde1);
    const setQDE1 = useJourneyStore((s) => s.setQDE1);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<QDE1FormData>({
        resolver: zodResolver(qde1Schema),
        defaultValues: qde1Data || {
            goldPurity: 10,
        },
    });

    const goldPurity = watch("goldPurity", 10);

    const onSubmit = (data: QDE1FormData) => {
        console.log("QDE-1 Data:", data);
        setQDE1(data); 
        nextStep();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <Input
                label="TITLE *"
                required
                placeholder="Enter title"
                {...register("title")}
                error={errors.title?.message}
            />

            <Input
                label="FIRST NAME *"
                required
                placeholder="Enter first name"
                {...register("firstName")}
                error={errors.firstName?.message}
            />

            <Input
                label="MIDDLE NAME"
                placeholder="Enter middle name"
                {...register("middleName")}
            />

            <Input
                label="LAST NAME *"
                required
                placeholder="Enter last name"
                {...register("lastName")}
                error={errors.lastName?.message}
            />

            <Input
                label="DATE OF BIRTH (DOB) *"
                required
                placeholder="DD/MM/YYYY"
                {...register("dob")}
                error={errors.dob?.message}
            />

            <Select
                label="GENDER"
                {...register("gender")}
                error={errors.gender?.message}
                options={[
                    { value: "male", label: "MALE" },
                    { value: "female", label: "FEMALE" },
                    { value: "other", label: "OTHER" },
                ]}
            />


            <Input
                label="MOBILE NUMBER *"
                required
                placeholder="Enter your mobile number"
                {...register("mobile")}
                error={errors.mobile?.message}
            />

            <Input
                label="PAN NUMBER *"
                required
                placeholder="Enter your PAN number"
                {...register("pan")}
                error={errors.pan?.message}
            />

            <GoldPuritySlider
    value={goldPurity}
    onChange={(value) => setValue("goldPurity", value)}
    loanAmount={watch("loanAmount")}
    onLoanAmountChange={(amount) => setValue("loanAmount", amount)}
    loanAmountError={errors.loanAmount?.message}
/>

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
