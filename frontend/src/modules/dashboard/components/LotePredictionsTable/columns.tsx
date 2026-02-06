import { Prediction } from "@/src/modules/history/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle2, XCircle, MapPin } from "lucide-react";
import { cn } from "@/src/utils/cn";
import { getProbabilityColor, getStatusColor } from "../../calculateColor";

const columnHelper = createColumnHelper<Prediction>();
const columns = [
  columnHelper.display({
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  }),

  columnHelper.display({
    id: "route",
    header: "Route",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">
          {row.original.origin} - {row.original.destination}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor("airline", {
    header: "Airline",
    cell: ({ row }) => <Badge variant="outline">{row.original.airline}</Badge>,
  }),

  columnHelper.accessor("departureDate", {
    header: "Departure",
    cell: ({ row }) =>
      format(row.original.departureDate, "MMM dd, yyyy , hh:mm a"),
  }),

  columnHelper.accessor("distanceKm", {
    header: "Distance",
    cell: ({ row }) => `${row.original.distanceKm.toLocaleString()} km`,
  }),

  columnHelper.accessor("delayProbability", {
    header: "Probability",
    cell: ({ row }) => (
      <Badge
        className={cn(
          "font-semibold",
          getProbabilityColor(row.original.delayProbability),
        )}
      >
        {(row.original.delayProbability * 100).toFixed(1)}%
      </Badge>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={cn("gap-1", getStatusColor(row.original.status))}
      >
        {row.original.status === "succeeded" ? (
          <>
            <CheckCircle2 className="h-3 w-3" /> Succeeded
          </>
        ) : (
          <>
            <XCircle className="h-3 w-3" /> Failed
          </>
        )}
      </Badge>
    ),
  }),
];

export default columns;
