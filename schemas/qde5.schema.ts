import { z } from "zod";

export const qde5Schema = z.object({
  pan: z
    .string()
    .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN"),
  mobile: z.string().min(10),
  otp: z.string().optional(),
});

export type QDE5FormData = z.infer<typeof qde5Schema>;
