import { motion } from "motion/react";
import {
  FileSpreadsheet,
  X,
  FileUp,
  UploadCloud,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BatchFilePreviewProps {
  file: File;
  batchName: string;
  onBatchNameChange: (name: string) => void;
  onRemove: () => void;
  onUpload: () => void;
  status: "idle" | "pending" | "success" | "error";
  errorMessage?: string;
}

export default function BatchFilePreview({
  file,
  batchName,
  onBatchNameChange,
  onRemove,
  onUpload,
  status,
  errorMessage,
}: BatchFilePreviewProps) {
  return (
    <motion.div
      key="file-selected"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border w-full transition-colors duration-200">
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
          onClick={onRemove}
          className="rounded-full hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="w-full space-y-2">
        <label
          htmlFor="batch-name"
          className="text-xs font-bold text-muted-foreground uppercase tracking-wider"
        >
          Batch Name
        </label>
        <Input
          id="batch-name"
          type="text"
          placeholder="Enter batch name..."
          value={batchName}
          onChange={(e) => onBatchNameChange(e.target.value)}
          className="w-full"
          disabled={status === "pending"}
        />
      </div>

      {status === "error" && errorMessage && (
        <div className="flex items-center gap-2 text-destructive text-xs font-bold p-3 rounded-lg bg-destructive/10 w-full">
          <AlertCircle className="size-4" />
          {errorMessage}
        </div>
      )}

      <Button
        className="w-full font-bold"
        disabled={status === "pending" || !batchName.trim()}
        onClick={onUpload}
      >
        {status === "pending" ? (
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
  );
}
