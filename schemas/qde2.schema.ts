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
  officeAddress1: z.string().optional(),
  officeAddress2: z.string().optional(),
  officePincode: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.constitution === "SALARIED") {
    if (!data.officeAddress1) {
      ctx.addIssue({
        path: ["officeAddress1"],
        message: "Office address is required for salaried applicants",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.officePincode) {
      ctx.addIssue({
        path: ["officePincode"],
        message: "Office pincode is required for salaried applicants",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});


export type QDE2FormData = z.infer<typeof qde2Schema>;

