import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface LoteHeaderProps {
  batchName: string;
  serialNumber: number;
  createdAt: string;
  totalPredictions: number;
}

export function LoteHeader({
  batchName,
  serialNumber,
  createdAt,
  totalPredictions,
}: LoteHeaderProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link href="/history/byLote">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Batches
        </Button>
      </Link>

      {/* Title Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {batchName}{" "}
          <span className="text-muted-foreground">
            #{serialNumber.toString().padStart(4, "0")}
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Created: {formattedDate} • {totalPredictions} total predictions
        </p>
      </div>
    </div>
  );
}
