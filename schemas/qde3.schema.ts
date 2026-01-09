import { z } from "zod";

export const qde3Schema = z.object({
    searchText:z
    .string().min(1,"City or pincode is required"),
    branchId:z.string().optional(),
    branchName:z.string().optional()  
})

export type QDE3FormData = z.infer<typeof qde3Schema>