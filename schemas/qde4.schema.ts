import { z } from "zod";

export const qde4Schema = z.object({
  appointmentDate: z.string().min(1, "Date is required"),
  fromTime: z.string().min(1, "From time required"),
  toTime: z.string().min(1, "To time required"),
});

export type QDE4FormData = z.infer<typeof qde4Schema>;
