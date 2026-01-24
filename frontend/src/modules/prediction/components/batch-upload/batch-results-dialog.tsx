import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Prediction } from "@/src/modules/history/interfaces";
import PredictionCardA from "@/src/modules/history/components/prediction-card-a";

interface BatchResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  predictions: Prediction[];
  title: string;
  children?: React.ReactNode;
}

export default function BatchResultsDialog({
  open,
  onOpenChange,
  predictions,
  title,
  children,
}: BatchResultsDialogProps) {
  if (predictions.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="max-w-[98vw] w-full max-h-[98vh] overflow-hidden flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {title}
          </DialogTitle>
          <DialogDescription>
            <span className="flex gap-4 mt-2">
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-bold text-sm">
                ✓ {predictions.length} Prediction
                {predictions.length > 1 ? "s" : ""}
              </span>
              {children}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            {predictions.map((prediction) => (
              <PredictionCardA key={prediction.id} {...prediction} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
