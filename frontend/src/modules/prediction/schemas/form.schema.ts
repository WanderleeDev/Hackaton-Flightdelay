import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z
  .object({
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
    departureDate: z.date({ error: "Date and time are required" }).refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Date must be today or later" },
    ),
    airline: z.string().min(1, "Please select an item"),
    flightDistance: z.coerce.number({ error: "This field is required" }),
    atmospherics: z.string().min(1, "Please select an item"),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination cannot be the same",
    path: ["destination"],
  });

export type formSchemaType = z.infer<typeof formSchema>;
