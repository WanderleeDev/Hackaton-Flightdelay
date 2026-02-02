import { motion } from "motion/react";
import { UploadCloud, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BatchUploadEmptyStateProps {
  onSelectFile: () => void;
  errorMessage?: string;
}

export default function BatchUploadEmptyState({
  onSelectFile,
  errorMessage,
}: BatchUploadEmptyStateProps) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <div className="p-4 rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
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
        onClick={onSelectFile}
        className="mt-2 font-bold"
      >
        Select File
      </Button>
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-destructive mt-2 text-[10px] font-bold uppercase tracking-wider">
          <AlertCircle className="size-3" />
          {errorMessage}
        </div>
      )}
    </motion.div>
  );
}
