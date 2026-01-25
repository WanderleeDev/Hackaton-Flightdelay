import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lote } from "@/src/modules/history/interfaces";

interface BatchUploadSuccessProps {
  data: Lote;
  onReset: () => void;
}

export default function BatchUploadSuccess({
  data,
  onReset,
}: BatchUploadSuccessProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-3 text-center w-full"
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-10" />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-primary">Batch Processed!</h3>
        <p className="text-xs text-muted-foreground">
          Processed {data.total} flights
        </p>
        <div className="flex gap-4 justify-center mt-2 text-xs">
          <span className="text-primary font-bold">
            ✓ {data.histories.length} Success
          </span>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onReset} className="mt-2">
        Upload Another
      </Button>
    </motion.div>
  );
}
