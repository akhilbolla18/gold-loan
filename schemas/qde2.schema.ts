import { z } from "zod";

export const qde2Schema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  motherName: z.string().optional(),
  constitution: z.string().optional(),
  email: z.string().email("Enter valid email").optional(),
  maritalStatus: z.string().optional(),
  profession: z.string().optional(),
  employmentType: z.string().optional(),
  designation: z.string().optional(),
  residenceType: z.string().optional(),
  language: z.string().optional(),
  salariedType: z.enum(["SALARIED", "NON_SALARIED"]),
});

export type QDE2FormData = z.infer<typeof qde2Schema>;
