"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prediction } from "@/src/modules/history/interfaces";
import {
  CheckCircle2,
  XCircle,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/src/modules/shared/utils/cn";

interface PredictionsTablePaginatedProps {
  predictions: Prediction[];
}

export function PredictionsTablePaginated({
  predictions,
}: PredictionsTablePaginatedProps) {
  const getProbabilityColor = (probability: number) => {
    if (probability < 0.25)
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (probability < 0.5)
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    if (probability < 0.75)
      return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
    return "bg-red-500/10 text-red-700 dark:text-red-400";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDistance = (distance: string | number) => {
    const dist = typeof distance === "string" ? parseFloat(distance) : distance;
    return dist.toLocaleString();
  };

  const columns = useMemo<ColumnDef<Prediction>[]>(
    () => [
      {
        accessorKey: "route",
        header: "Route",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <Plane className="h-4 w-4 text-muted-foreground" />
            <span>
              {row.original.origin} → {row.original.destination}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "airline",
        header: "Airline",
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.airline}</Badge>
        ),
      },
      {
        accessorKey: "departureDate",
        header: "Departure",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.original.departureDate)}
          </span>
        ),
      },
      {
        accessorKey: "distanceKm",
        header: "Distance",
        cell: ({ row }) => (
          <span className="text-sm">
            {formatDistance(row.original.distanceKm)} km
          </span>
        ),
      },
      {
        accessorKey: "delayProbability",
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
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) =>
          row.original.status === "succeeded" ? (
            <Badge
              variant="outline"
              className="gap-1 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
            >
              <CheckCircle2 className="h-3 w-3" />
              Succeeded
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1 bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
            >
              <XCircle className="h-3 w-3" />
              Failed
            </Badge>
          ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: predictions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);

      if (currentPage > 2) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b last:border-0 hover:bg-muted/50 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon-sm"
                onClick={() => table.setPageIndex(page as number)}
                className="min-w-8"
              >
                {(page as number) + 1}
              </Button>
            ),
          )}

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      <p className="text-sm text-muted-foreground text-center">
        Showing {table.getRowModel().rows.length} of {predictions.length}{" "}
        predictions
        {totalPages > 1 && ` (Page ${currentPage + 1} of ${totalPages})`}
      </p>
    </div>
  );
}
