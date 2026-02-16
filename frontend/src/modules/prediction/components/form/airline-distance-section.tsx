"use client";

import { useFormContext, useController } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSeparator,
  FieldContent,
} from "@/components/ui/field";
import { SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AIRLINES } from "../../data/airlines";
import { formatDistance } from "@/src/utils/formatDistance";
import { formSchemaType } from "../../schemas/form.schema";
import { FormSelect } from "./form-select";

const MIN_DISTANCE = 3_000;
const MAX_DISTANCE = 13_500;

export function AirlineDistanceSection() {
  const { control } = useFormContext<formSchemaType>();

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: "flightDistance",
    control,
  });

  return (
    <>
      <FieldSeparator className="my-4 col-span-full">
        Airline & Distance
      </FieldSeparator>

      <FormSelect
        name="airline"
        label="Airline"
        placeholder="Select an airline"
        className="col-span-full"
        options={AIRLINES.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      />

      <Field data-invalid={invalid} className="col-span-full">
        <FieldContent className="mb-2 gap-1">
          <FieldLabel
            htmlFor="flight-distance"
            className="flex justify-between items-center w-full"
          >
            <span>
              Flight Distance <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </span>
            <span className="text-sm" aria-live="polite">
              {formatDistance(field.value || MIN_DISTANCE, false)}
            </span>
          </FieldLabel>
        </FieldContent>
        <Slider
          {...field}
          id="flight-distance"
          value={[field.value ?? 6_000]}
          onValueChange={(newValue) => field.onChange(newValue[0])}
          min={MIN_DISTANCE}
          max={MAX_DISTANCE}
          step={10}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Min: {formatDistance(MIN_DISTANCE, false)}</span>
          <span>Max: {formatDistance(MAX_DISTANCE, false)}</span>
        </div>
        {invalid && <FieldError id="flight-distance-error" errors={[error]} />}
      </Field>
    </>
  );
}
