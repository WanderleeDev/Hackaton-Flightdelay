import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lote } from "@/src/modules/history/interfaces";
import PredictionCardA from "@/src/modules/history/components/prediction-card-a";

interface BatchResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Lote;
}

export default function BatchResultsDialog({
  open,
  onOpenChange,
  data,
}: BatchResultsDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="max-w-[98vw] w-full max-h-[98vh] overflow-hidden flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Batch Prediction Results
          </DialogTitle>
          <DialogDescription>
            <span className="flex gap-4 mt-2">
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-bold text-sm">
                ✓ {data.histories.length} Predictions
              </span>
              <span className="px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-sm">
                Batch: {data.batchName}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 py-4">
            {data.histories.map((prediction) => (
              <PredictionCardA key={prediction.id} {...prediction} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
