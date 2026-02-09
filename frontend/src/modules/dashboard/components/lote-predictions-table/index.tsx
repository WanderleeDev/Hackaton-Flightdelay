"use client";

import {
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import columns from "./columns";
import { Prediction } from "@/src/modules/history/interfaces";
import LegendPredictions from "./legend-predictions";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableContent } from "./data-table-content";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BaseSelectFilter from "./base-select-filter";

interface LotePredictionsTableProps {
  data: Prediction[];
}

const PAGE_INDEX = 0;
const PAGE_SIZE = 10;

const riskLevelOptions = [
  { value: "25", label: "Low (0-25%)" },
  { value: "50", label: "Medium (25-50%)" },
  { value: "75", label: "High (50-75%)" },
  { value: "100", label: "Very High (75-100%)" },
];

const sortOptions = [
  { value: "date-newest", label: "Date (Newest)" },
  { value: "date-oldest", label: "Date (Oldest)" },
  { value: "probability-high", label: "Probability (High)" },
  { value: "probability-low", label: "Probability (Low)" },
  { value: "distance-long", label: "Distance (Longest)" },
  { value: "distance-short", label: "Distance (Shortest)" },
];

export function LotePredictionsTable({ data }: LotePredictionsTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const uniqueAirlines = Array.from(new Set(data.map((d) => d.airline))).sort();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: { pagination, globalFilter, columnFilters },
  });

  const handleAirlineChange = (value: string) => {
    if (value === "all") {
      return table.getColumn("airline")?.setFilterValue(undefined);
    }
    table.getColumn("airline")?.setFilterValue(value);
  };

  const handleRiskLevelChange = (value: string) => {
    if (value === "all") {
      return table.getColumn("delayProbability")?.setFilterValue(undefined);
    }
    table.getColumn("delayProbability")?.setFilterValue(value);
  };

  return (
    <section className="space-y-6">
      <h3 className="sr-only">Predictions table</h3>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by airline or status..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        <BaseSelectFilter
          value={table.getColumn("airline")?.getFilterValue() as string}
          onValueChange={handleAirlineChange}
          placeholder="All Airlines"
        >
          {uniqueAirlines.map((airline) => (
            <SelectItem key={airline} value={airline}>
              {airline}
            </SelectItem>
          ))}
        </BaseSelectFilter>

        <BaseSelectFilter
          value={
            (table.getColumn("delayProbability")?.getFilterValue() as string) ??
            "all"
          }
          onValueChange={handleRiskLevelChange}
          placeholder="All Risk Levels"
        >
          {riskLevelOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </BaseSelectFilter>

        <BaseSelectFilter
          value={
            (table.getColumn("delayProbability")?.getFilterValue() as string) ??
            "all"
          }
          onValueChange={handleRiskLevelChange}
          placeholder="Sort by"
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </BaseSelectFilter>

        <Button variant="outline" className="gap-2 h-9">
          <Download className="h-4 w-4" />
          <span className="hidden lg:inline">Export CSV</span>
        </Button>
      </div>

      <DataTableContent table={table} />
      <DataTablePagination table={table} />
      <LegendPredictions />
    </section>
  );
}
