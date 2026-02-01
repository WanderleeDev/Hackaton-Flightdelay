"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export default function ErrorSuspenseBoundary({
  children,
  fallback,
  errorFallback,
}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => {
            return errorFallback ? (
              errorFallback
            ) : (
              <div className="flex flex-col items-center py-12 text-center h-full">
                <TriangleAlert className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-xl font-bold mb-2 text-red-500 dark:text-red-600">
                  There was an error!
                </p>
                {error instanceof Error && (
                  <p className="text-muted-foreground mb-2 text-red-400 dark:text-red-200">
                    {error.message}
                  </p>
                )}
                <Button
                  size="lg"
                  type="submit"
                  className="w-full"
                  onClick={() => resetErrorBoundary()}
                >
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                  Try again
                </Button>
              </div>
            );
          }}
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
