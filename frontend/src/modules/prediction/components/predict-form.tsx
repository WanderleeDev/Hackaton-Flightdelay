"use client";
import { formSchema, formSchemaType } from "../schemas/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  Loader2,
  Send,
  RotateCcw,
  CloudRain,
  CloudLightning,
  Wind,
  CircleSlash2,
} from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/src/utils/cn";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePrediction } from "../hooks/useprediction";
import PredictionResultDialog from "./prediction-result-dialog";
import { showCustomToast } from "@/src/modules/shared/components/custom-toast";
import { AIRLINES } from "../data/airlines";
import { AIRPORTS } from "../data/airports";
import { useMapSelection } from "../context/map-context";
import { formatDistance } from "../../../utils/formatDistance";

const MIN_DISTANCE = 3_000;
const MAX_DISTANCE = 13_500;

export default function PredictForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<formSchemaType | null>(
    null,
  );
  const { setOrigin, setDestination, restoreDefaultValues } = useMapSelection();
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    control,
    resetField,
    reset,
    setValue,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema as any),
    mode: "onChange",
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      flightDistance: 3_000,
      airline: "",
      atmospherics: "none",
    },
  });

  const { mutate, isPending, data } = usePrediction();
  const onSubmit = handleSubmit(
    async (formData: formSchemaType) => {
      setSubmittedData(formData);
      mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(true);
          restoreDefaultValues();
        },
      });
    },
    () => {
      showCustomToast("Validation Error", {
        description: "Please check the form for errors before submitting.",
        type: "error",
      });
    },
  );

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSubmittedData(null);
    restoreDefaultValues();
    reset();
  };

  const handleReset = () => {
    restoreDefaultValues();
    reset();
  };
  return (
    <aside className="flex flex-col gap-4">
      <form
        onSubmit={onSubmit}
        className="@container p-2 sm:p-5 md:p-8 w-full gap-2 max-w-3xl mx-auto"
        aria-label="Flight prediction form"
        noValidate
      >
        <FieldGroup className="grid @md:grid-cols-6 gap-4 mb-6">
          <FieldSeparator className="my-4 col-span-full">
            Route Parameters
          </FieldSeparator>

          <Controller
            name="origin"
            control={control}
            render={({ field, fieldState }) => {
              const options = AIRPORTS;
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 @md:col-span-3"
                >
                  <FieldLabel htmlFor="origin">
                    Origin <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      const airport =
                        AIRPORTS.find((a) => a.value === val) || null;
                      setOrigin(airport);
                    }}
                  >
                    <SelectTrigger
                      id="origin"
                      className="w-full"
                      aria-required="true"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? "origin-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select an origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center justify-between w-full gap-2">
                            <span>{option.label}</span>
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold text-muted-foreground">
                              {option.country}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError id="origin-error" errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="destination"
            control={control}
            render={({ field, fieldState }) => {
              const options = AIRPORTS;
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 @md:col-span-3"
                >
                  <FieldLabel htmlFor="destination">
                    Destination <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      const airport =
                        AIRPORTS.find((a) => a.value === val) || null;
                      setDestination(airport);
                    }}
                  >
                    <SelectTrigger
                      id="destination"
                      className="w-full"
                      aria-required="true"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? "destination-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center justify-between w-full gap-2">
                            <span>{option.label}</span>
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold text-muted-foreground">
                              {option.country}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      id="destination-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="departureDate"
            control={control}
            render={({ field, fieldState }) => {
              const selectedDate = field.value;
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-full"
                >
                  <FieldLabel htmlFor="departure-date">
                    Departure Date <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="departure-date"
                          type="button"
                          variant="outline"
                          aria-haspopup="dialog"
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.invalid
                              ? "departure-date-error"
                              : undefined
                          }
                          className={cn(
                            "w-full justify-start text-start font-normal active:scale-100",
                            !selectedDate &&
                              "text-muted-foreground font-medium",
                          )}
                        >
                          <CalendarIcon className="size-4" aria-hidden="true" />
                          {selectedDate ? (
                            <>{format(selectedDate, "dd MMM, yyyy")}</>
                          ) : (
                            <span>Select a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(newDate) => {
                            setValue(field.name, newDate!, {
                              shouldDirty: true,
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.isDirty && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetField("departureDate");
                        }}
                        aria-label="Clear departure date"
                      >
                        <X aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      id="departure-date-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />
          <FieldSeparator className="my-4 col-span-full">
            Airline & Distance
          </FieldSeparator>

          <Controller
            name="airline"
            control={control}
            render={({ field, fieldState }) => {
              const options = AIRLINES;
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 col-span-full"
                >
                  <FieldLabel htmlFor="airline">
                    Airline <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="airline"
                      className="w-full"
                      aria-required="true"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? "airline-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select an airline" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      id="airline-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="flightDistance"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-full"
                >
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
                    defaultValue={[6_000]}
                    onValueChange={(newValue) => field.onChange(newValue[0])}
                    aria-label="Flight distance"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? "flight-distance-error"
                        : "flight-distance-range"
                    }
                    min={MIN_DISTANCE}
                    max={MAX_DISTANCE}
                    step={10}
                  />
                  <div
                    id="flight-distance-range"
                    className="flex justify-between text-xs text-muted-foreground"
                  >
                    <span>Min: {formatDistance(MIN_DISTANCE, false)} a</span>
                    <span>Max: {formatDistance(MAX_DISTANCE, false)}</span>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      id="flight-distance-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />

          <FieldSeparator className="my-4 col-span-full">
            Atmospherics
          </FieldSeparator>

          <Controller
            name="atmospherics"
            control={control}
            render={({ field, fieldState }) => {
              const options = [
                { value: "live", label: "live", icon: CloudRain },
                { value: "storm", label: "storm", icon: CloudLightning },
                { value: "tailwind", label: "tailwind", icon: Wind },
                { value: "none", label: "none", icon: CircleSlash2 },
              ];
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 [&_p]:pb-2 col-span-full"
                >
                  <FieldLabel htmlFor="atmospherics" id="atmospherics-label">
                    Atmospherics
                  </FieldLabel>

                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    aria-labelledby="atmospherics-label"
                    aria-describedby={
                      fieldState.invalid ? "atmospherics-error" : undefined
                    }
                    className="grid grid-cols-2 @md:grid-cols-4 gap-3"
                  >
                    {options.map(({ label, value, icon: Icon }) => (
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
                  {fieldState.invalid && (
                    <FieldError
                      id="atmospherics-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <div className="flex flex-col items-center w-full justify-center gap-2">
          <Button
            size="lg"
            type="submit"
            className="w-full transition-all duration-300 group"
            disabled={isPending || isSubmitting || !isValid}
          >
            {isPending ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Submit</span>
              </>
            )}
          </Button>
          <Button
            size="lg"
            className="w-full"
            variant={"secondary"}
            disabled={isPending || isSubmitting}
            type="reset"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Reset</span>
          </Button>
        </div>
      </form>

      <PredictionResultDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        result={data ?? null}
        formData={submittedData}
      />
    </aside>
  );
}
