"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, formSchemaType } from "../schemas/form.schema";
import { usePrediction } from "../hooks/useprediction";
import { useMapSelection } from "../context/map-context";
import { showCustomToast } from "@/src/modules/shared/components/custom-toast";
import { FieldGroup } from "@/components/ui/field";
import PredictionResultDialog from "./prediction-result-dialog";

import {
  RouteSection,
  DateTimeSection,
  AirlineDistanceSection,
  AtmosphericsSection,
  FormActions,
} from "./form";

export default function PredictForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<formSchemaType | null>(
    null,
  );
  const { restoreDefaultValues } = useMapSelection();

  const methods = useForm<formSchemaType>({
    resolver: zodResolver(formSchema as any),
    mode: "all",
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: new Date(),
      flightDistance: 3_000,
      airline: "",
      atmospherics: "none",
    },
  });

  const { handleSubmit, reset } = methods;
  const { mutate, isPending, data } = usePrediction();

  const onSubmit = handleSubmit(
    async (formData: formSchemaType) => {
      console.log(formData);
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
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className="@container p-2 sm:p-5 md:p-8 w-full gap-2 max-w-3xl mx-auto"
          aria-label="Flight prediction form"
          noValidate
        >
          <FieldGroup className="grid @md:grid-cols-6 gap-4 mb-6">
            <RouteSection />
            <DateTimeSection />
            <AirlineDistanceSection />
            <AtmosphericsSection />
          </FieldGroup>

          <FormActions isPending={isPending} onReset={handleReset} />
        </form>
      </FormProvider>

      <PredictionResultDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        result={data ?? null}
        formData={submittedData}
      />
    </aside>
  );
}
