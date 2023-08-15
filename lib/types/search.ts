import * as z from "zod";

export const FormSchema = z.object({
  keyword: z.string({ description: "" }).min(2, {
    message: "At least 2 characters.",
  }),
  type: z.string(),
});
