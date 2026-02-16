"use client";

import { useFormContext, useController } from "react-hook-form";
import { CloudRain, CloudLightning, Wind, CircleSlash2 } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/src/utils/cn";
import { formSchemaType } from "../../schemas/form.schema";

const ATMOSPHERIC_OPTIONS = [
  { value: "live", label: "live", icon: CloudRain },
  { value: "storm", label: "storm", icon: CloudLightning },
  { value: "tailwind", label: "tailwind", icon: Wind },
  { value: "none", label: "none", icon: CircleSlash2 },
] as const;

export function AtmosphericsSection() {
  const { control } = useFormContext<formSchemaType>();

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: "atmospherics",
    control,
  });

  return (
    <>
      <FieldSeparator className="my-4 col-span-full">
        Atmospherics
      </FieldSeparator>

      <Field data-invalid={invalid} className="gap-1 [&_p]:pb-2 col-span-full">
        <FieldLabel htmlFor="atmospherics" id="atmospherics-label">
          Atmospherics
        </FieldLabel>

        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          className="grid grid-cols-2 @md:grid-cols-4 gap-3"
          aria-labelledby="atmospherics-label"
        >
          {ATMOSPHERIC_OPTIONS.map(({ label, value, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem
                value={value}
                id={`atmospherics-${value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`atmospherics-${value}`}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 border-muted bg-popover hover:bg-accent/50 hover:border-accent active:scale-95 cursor-pointer transition-all duration-200",
                  field.value === value &&
                    "border-primary bg-primary/5 text-primary shadow-md",
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
                <span className="text-xs font-semibold capitalize">
                  {label}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {invalid && <FieldError id="atmospherics-error" errors={[error]} />}
      </Field>
    </>
  );
}
