import { AnimatePresence } from "motion/react";
import { Download } from "lucide-react";
import { cn } from "@/src/utils/cn";
import { Lote } from "@/src/modules/history/interfaces";
import BatchUploadEmptyState from "./batch-upload-empty-state";
import BatchUploadSuccess from "./batch-upload-success";
import BatchFilePreview from "./batch-file-preview";
import Link from "next/link";
import { getApiBaseUrl } from "@/src/utils/getEnv";

interface BatchDropZoneProps {
  file: File | null;
  batchName: string;
  status: "idle" | "pending" | "success" | "error";
  errorMessage?: string;
  data?: Lote;
  dragActive: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectFile: () => void;
  onBatchNameChange: (name: string) => void;
  onUpload: () => void;
  onRemove: () => void;
}

export default function BatchDropZone({
  file,
  batchName,
  status,
  errorMessage,
  data,
  dragActive,
  inputRef,
  onDrag,
  onDrop,
  onChange,
  onSelectFile,
  onBatchNameChange,
  onUpload,
  onRemove,
}: BatchDropZoneProps) {
  return (
    <div className="p-4 sm:p-6 w-full rounded-2xl border bg-card/40 backdrop-blur-sm transition-all duration-300">
      <div
        className={cn(
          "relative group flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-300",
          dragActive
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-border hover:border-primary/50",
          status === "success" && "border-primary/50 bg-primary/5",
          status === "error" && "border-destructive/50 bg-destructive/5",
        )}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".csv"
          onChange={onChange}
        />

        <AnimatePresence mode="wait">
          {status === "success" && data ? (
            <BatchUploadSuccess data={data} onReset={onRemove} />
          ) : file ? (
            <BatchFilePreview
              file={file}
              batchName={batchName}
              onBatchNameChange={onBatchNameChange}
              onRemove={onRemove}
              onUpload={onUpload}
              status={status}
              errorMessage={errorMessage}
            />
          ) : (
            <BatchUploadEmptyState
              onSelectFile={onSelectFile}
              errorMessage={status === "error" ? errorMessage : undefined}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
        <span>Max 100 routes</span>
        <Link
          className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
          href={`${getApiBaseUrl()}/flight_batch_template.csv`}
          download="flight_batch_template.csv"
        >
          <span>Download Template</span>
          <Download className="size-3 mb-0.5" />
        </Link>
      </div>
    </div>
  );
}
