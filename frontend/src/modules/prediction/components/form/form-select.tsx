"use client";

import { useFormContext, useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/src/utils/cn";

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: React.ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}

export function FormSelect({
  name,
  label,
  placeholder,
  options,
  className,
  onValueChange,
  required = true,
}: FormSelectProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Field data-invalid={invalid} className={cn("gap-1", className)}>
      <FieldLabel htmlFor={name}>
        {label} {required && <span aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </FieldLabel>

      <Select
        value={field.value}
        onValueChange={(val) => {
          field.onChange(val);
          onValueChange?.(val);
        }}
      >
        <SelectTrigger
          id={name}
          className="w-full"
          aria-required={required}
          aria-invalid={invalid}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-60">
          {options}
        </SelectContent>
      </Select>
      {invalid && <FieldError id={`${name}-error`} errors={[error]} />}
    </Field>
  );
}
