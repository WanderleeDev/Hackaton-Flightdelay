"use client";

import { useState, useRef } from "react";
import {
  FileUp,
  UploadCloud,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { batchPredictionAction } from "@/app/actions/batch-prediction.action";
import { downloadCSVTemplate } from "@/src/lib/csv-template";
import { BatchPredictionResponse } from "@/src/modules/prediction/types/batch-prediction.types";

export default function CSVBatchPredictor() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [result, setResult] = useState<BatchPredictionResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (
      selectedFile.type === "text/csv" ||
      selectedFile.name.endsWith(".csv")
    ) {
      setFile(selectedFile);
      setStatus("idle");
      setErrorMessage("");
    } else {
      setStatus("error");
      setErrorMessage("Invalid file type. Please upload a CSV file.");
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await batchPredictionAction(formData);

      if (response.success && response.data) {
        setStatus("success");
        setResult(response.data);
      } else {
        setStatus("error");
        setErrorMessage(response.error || "Failed to process batch predictions");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus("idle");
    setErrorMessage("");
    setResult(null);
  };

  const handleDownloadTemplate = () => {
    downloadCSVTemplate();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 sm:p-6 w-full rounded-2xl border bg-card/40 backdrop-blur-sm transition-all duration-300">
        <div
          className={cn(
            "relative group flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-300",
            dragActive
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-border hover:border-primary/50",
            status === "success" && "border-emerald-500/50 bg-emerald-500/5",
            status === "error" && "border-destructive/50 bg-destructive/5"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleChange}
          />

          <AnimatePresence mode="wait">
            {status === "success" && result ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 text-center w-full"
              >
                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="size-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-emerald-500">
                    Batch Processed!
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Processed {result.totalProcessed} flights
                  </p>
                  <div className="flex gap-4 justify-center mt-2 text-xs">
                    <span className="text-emerald-500 font-bold">
                      ✓ {result.successCount} Success
                    </span>
                    {result.errorCount > 0 && (
                      <span className="text-destructive font-bold">
                        ✗ {result.errorCount} Errors
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="mt-2"
                >
                  Upload Another
                </Button>
              </motion.div>
            ) : file ? (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border w-full">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileSpreadsheet className="size-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={removeFile}
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="size-4" />
                  </Button>
                </div>

                {status === "error" && errorMessage && (
                  <div className="flex items-center gap-2 text-destructive text-xs font-bold p-3 rounded-lg bg-destructive/10 w-full">
                    <AlertCircle className="size-4" />
                    {errorMessage}
                  </div>
                )}

                <Button
                  className="w-full font-bold"
                  disabled={status === "uploading"}
                  onClick={handleUpload}
                >
                  {status === "uploading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <UploadCloud className="size-4" />
                      </motion.div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileUp className="mr-2 size-4" />
                      Calculate Batch
                    </>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <UploadCloud className="size-10" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold">Drop your CSV here</p>
                  <p className="text-xs text-muted-foreground max-w-[200px]">
                    Drag and drop or click to browse flight batch files
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onButtonClick}
                  className="mt-2 font-bold"
                >
                  Select File
                </Button>
                {status === "error" && errorMessage && (
                  <div className="flex items-center gap-1.5 text-destructive mt-2 text-[10px] font-bold uppercase tracking-wider">
                    <AlertCircle className="size-3" />
                    {errorMessage}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          <span>Max 100 routes</span>
          <button
            onClick={handleDownloadTemplate}
            className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          >
            <Download className="size-3" />
            Download Template
          </button>
        </div>
      </div>

      {/* Results Display */}
      {result && result.predictions.length > 0 && (
        <div className="p-4 sm:p-6 w-full rounded-2xl border bg-card/40 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Prediction Results
              </h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-bold">
                  {result.successCount} Success
                </span>
                {result.errorCount > 0 && (
                  <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive font-bold">
                    {result.errorCount} Errors
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {result.predictions.map((prediction, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    prediction.error
                      ? "bg-destructive/5 border-destructive/20"
                      : prediction.forecast === "Delayed"
                        ? "bg-amber-500/5 border-amber-500/20"
                        : "bg-emerald-500/5 border-emerald-500/20"
                  )}
                >
                  {prediction.error ? (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-4 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-destructive">Error</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {prediction.error}
                        </p>
                        {prediction.airline && (
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {prediction.airline} • {prediction.origin} → {prediction.destination}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">
                            {prediction.airline}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {prediction.origin} → {prediction.destination}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "text-xs font-bold px-2 py-1 rounded-md",
                            prediction.forecast === "Delayed"
                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                              : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          )}
                        >
                          {prediction.forecast}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                        <span>
                          Distance: {prediction.distanceKm?.toLocaleString()} km
                        </span>
                        {prediction.probability !== null && (
                          <span>
                            Probability: {(prediction.probability * 100).toFixed(1)}%
                          </span>
                        )}
                        {prediction.departureDate && (
                          <span>
                            {new Date(prediction.departureDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
