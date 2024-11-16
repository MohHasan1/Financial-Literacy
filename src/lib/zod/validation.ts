import { z } from "zod";

export const string_input = z.object({
  userInput: z.string(),
});
export type StringInputType = z.infer<typeof string_input>;

export const number_input = z.object({
  userInput: z
    .number()
    .nonnegative({ message: "Value must be a non-negative number" }),
});

export type NumInputType = z.infer<typeof number_input>;
