"use client";

import { SelectItem } from "@/components/ui/select";
import { FieldSeparator } from "@/components/ui/field";
import { AIRPORTS } from "../../data/airports";
import { useMapSelection } from "../../context/map-context";
import { FormSelect } from "./form-select";

export function RouteSection() {
  const { setOrigin, setDestination } = useMapSelection();

  return (
    <>
      <FieldSeparator className="my-4 col-span-full">
        Route Parameters
      </FieldSeparator>

      <FormSelect
        name="origin"
        label="Origin"
        placeholder="Select an origin"
        className="@md:col-span-3"
        onValueChange={(val) => {
          const airport = AIRPORTS.find((a) => a.value === val) || null;
          setOrigin(airport);
        }}
        options={AIRPORTS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="flex items-center justify-between w-full gap-2">
              <span>{option.label}</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold text-muted-foreground">
                {option.country}
              </span>
            </span>
          </SelectItem>
        ))}
      />

      <FormSelect
        name="destination"
        label="Destination"
        placeholder="Select a destination"
        className="@md:col-span-3"
        onValueChange={(val) => {
          const airport = AIRPORTS.find((a) => a.value === val) || null;
          setDestination(airport);
        }}
        options={AIRPORTS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="flex items-center justify-between w-full gap-2">
              <span>{option.label}</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold text-muted-foreground">
                {option.country}
              </span>
            </span>
          </SelectItem>
        ))}
      />
    </>
  );
}
