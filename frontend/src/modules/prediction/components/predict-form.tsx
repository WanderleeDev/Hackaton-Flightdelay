"use client";
import { formSchema, Schema } from "../schemas/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { motion } from "motion/react";
import {
  Check,
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
import { cn, formatDistance } from "@/src/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { serverAction } from "@/app/actions";

const MIN_DISTANCE = 3_000;
const MAX_DISTANCE = 13_500;

export default function PredictForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  });
  const formAction = useAction(serverAction, {
    onSuccess: () => {
      form.reset();
    },
    onError: () => {},
  });
  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    console.log(data);
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;
  if (hasSucceeded) {
    return (
      <div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full py-6 px-3"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
            aria-hidden="true"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="text-center text-2xl text-pretty font-bold mb-2">
            Thank you
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Form submitted successfully, we will get back to you soon
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <aside className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="@container p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto overflow-y-scroll custom-scrollbar"
        aria-label="Flight prediction form"
        noValidate
      >
        <FieldGroup className="grid @md:grid-cols-6 gap-4 mb-6">
          <FieldSeparator className="my-4 col-span-full">
            Route Parameters
          </FieldSeparator>

          <Controller
            name="origin"
            control={form.control}
            render={({ field, fieldState }) => {
              const options = [
                { value: "option-1", label: "Option 1" },
                { value: "option-2", label: "Option 2" },
                { value: "option-3", label: "Option 3" },
                { value: "option-4", label: "Option 4" },
              ];
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 @md:col-span-3"
                >
                  <FieldLabel htmlFor="origin">
                    Origin <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
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
                          {option.label}
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
            control={form.control}
            render={({ field, fieldState }) => {
              const options = [
                { value: "option-1", label: "Option 1" },
                { value: "option-2", label: "Option 2" },
                { value: "option-3", label: "Option 3" },
                { value: "option-4", label: "Option 4" },
                { value: "option_1767573558829", label: "Option 5" },
              ];
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 @md:col-span-3"
                >
                  <FieldLabel htmlFor="destination">
                    Destination <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
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
                          {option.label}
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
            control={form.control}
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
                            "w-full justify-start text-start font-normal active:scale-none",
                            !selectedDate && "text-muted-foreground font-medium"
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
                            form.setValue(field.name, newDate!, {
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
                          form.resetField("departureDate");
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
            Aircraft & Physics
          </FieldSeparator>

          <Controller
            name="aircraftModel"
            control={form.control}
            render={({ field, fieldState }) => {
              const options = [
                { value: "option-1", label: "Option 1" },
                { value: "option-2", label: "Option 2" },
                { value: "option-3", label: "Option 3" },
                { value: "option-4", label: "Option 4" },
              ];
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1 col-span-full"
                >
                  <FieldLabel htmlFor="aircraft-model">
                    Aircraft Model <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="aircraft-model"
                      className="w-full"
                      aria-required="true"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.invalid ? "aircraft-model-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select a model" />
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
                      id="aircraft-model-error"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="flightDistance"
            control={form.control}
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
                    value={[field.value || MIN_DISTANCE]}
                    defaultValue={[MIN_DISTANCE]}
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
                    <span>Min: {formatDistance(MIN_DISTANCE)}</span>
                    <span>Max: {formatDistance(MAX_DISTANCE)}</span>
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
            defaultValue="none"
            control={form.control}
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
                            "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-200",
                            field.value === value &&
                              "border-primary bg-primary/5 text-primary shadow-sm"
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
            className="w-full"
            disabled={isExecuting}
          >
            {isExecuting ? (
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
            disabled={isExecuting}
            type="reset"
            onClick={() => form.reset()}
          >
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Reset</span>
          </Button>
        </div>
      </form>
    </aside>
  );
}
