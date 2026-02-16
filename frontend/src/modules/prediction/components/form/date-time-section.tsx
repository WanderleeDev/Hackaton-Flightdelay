"use client";

import { useFormContext, useController } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/src/utils/cn";
import { formSchemaType } from "../../schemas/form.schema";

export function DateTimeSection() {
  const { control, setValue } = useFormContext<formSchemaType>();
  const {
    field: { value: selectedDate },
    fieldState: { invalid, error },
  } = useController({
    name: "departureDate",
    control,
  });

  return (
    <Field data-invalid={invalid} className="col-span-full">
      <FieldLabel htmlFor="departure-date">
        Departure Date & Time <span aria-hidden="true">*</span>
        <span className="sr-only">(required)</span>
      </FieldLabel>

      <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="departure-date"
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-start font-normal active:scale-100",
                  !selectedDate && "text-muted-foreground font-medium",
                )}
              >
                <CalendarIcon className="size-4 mr-2" aria-hidden="true" />
                {selectedDate ? (
                  <>{format(selectedDate as Date, "dd MMM, yyyy")}</>
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate as Date}
                onSelect={(newDate) => {
                  if (!newDate) return;
                  const current = (selectedDate as Date) || new Date();
                  newDate.setHours(current.getHours(), current.getMinutes());
                  setValue("departureDate", newDate, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative">
          <div className="relative">
            <Input
              type="time"
              value={selectedDate ? format(selectedDate as Date, "HH:mm") : ""}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(":").map(Number);
                const newDate = new Date((selectedDate as Date) || new Date());
                newDate.setHours(hours, minutes);
                setValue("departureDate", newDate, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              className="pl-9"
            />
            <Clock
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {invalid && <FieldError id="departure-date-error" errors={[error]} />}
    </Field>
  );
}
