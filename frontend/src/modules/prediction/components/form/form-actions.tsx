"use client";

import { useFormContext } from "react-hook-form";
import { Loader2, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isPending: boolean;
  onReset: () => void;
}

export function FormActions({ isPending, onReset }: FormActionsProps) {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();

  return (
    <div className="flex flex-col items-center w-full justify-center gap-2 mt-6">
      <Button
        size="lg"
        type="submit"
        className="w-full transition-all duration-300"
        disabled={isPending || isSubmitting || !isValid}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
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
        variant="secondary"
        disabled={isPending || isSubmitting}
        type="reset"
        onClick={(e) => {
          e.preventDefault();
          onReset();
        }}
      >
        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
        <span>Reset</span>
      </Button>
    </div>
  );
}
