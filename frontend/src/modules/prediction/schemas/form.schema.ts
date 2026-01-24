import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  origin: z
    .string()
    .min(1, "Please select an item")
    .toUpperCase()
    .pipe(z.string().regex(/^[A-Z]{3,4}$/, "Must be 3-4 uppercase letters")),
  destination: z
    .string()
    .min(1, "Please select an item")
    .toUpperCase()
    .pipe(z.string().regex(/^[A-Z]{3,4}$/, "Must be 3-4 uppercase letters")),
  departureDate: z.date({ error: "This field is required" }),
  airline: z.string().min(1, "Please select an item"),
  flightDistance: z.coerce.number({ error: "This field is required" }),
  atmospherics: z.string().min(1, "Please select an item"),
});

export type Schema = z.infer<typeof formSchema>;
