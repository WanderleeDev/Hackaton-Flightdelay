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
    departureDate: z.date({ error: "This field is required" }).refine(
      (date) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate >= tomorrow;
      },
      { message: "Departure date must be at least tomorrow" },
    ),
    airline: z.string().min(1, "Please select an item"),
    flightDistance: z.coerce.number({ error: "This field is required" }),
    atmospherics: z.string().min(1, "Please select an item"),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination cannot be the same",
    path: ["destination"],
  });

export type Schema = z.infer<typeof formSchema>;
