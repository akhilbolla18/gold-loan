import { z } from "zod";

export const qde1Schema = z.object({
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().optional(),
    mobile: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter valid mobile number"),
    pan: z
        .string()
        .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN number"),
    goldPurity: z.number(),
    loanAmount: z.string().min(1, "Loan amount is required"),
});

export type QDE1FormData = z.infer<typeof qde1Schema>;
