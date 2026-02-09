"use client";

import {
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import columns from "./columns";
import { Prediction } from "@/src/modules/history/interfaces";
import LegendPredictions from "./legend-predictions";
import { useState, useMemo, useCallback } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableContent } from "./data-table-content";
import { Download, Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import BaseSelectFilter from "./base-select-filter";
import { useDebounce } from "@/src/modules/shared/hooks/use-debounce";

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
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter: debouncedSearchValue,
      columnFilters,
      sorting,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchValue,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const uniqueAirlines = useMemo(
    () => Array.from(new Set(data.map((d) => d.airline))).sort(),
    [data],
  );

  const handleAirlineChange = useCallback((value: string) => {
    const filterValue = value === "all" ? undefined : value;
    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== "airline");
      return filterValue
        ? [...otherFilters, { id: "airline", value: filterValue }]
        : otherFilters;
    });
  }, []);

  const handleRiskLevelChange = useCallback((value: string) => {
    const filterValue = value === "all" ? undefined : value;
    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== "delayProbability");
      return filterValue
        ? [...otherFilters, { id: "delayProbability", value: filterValue }]
        : otherFilters;
    });
  }, []);

  const handleSortChange = useCallback((value: string) => {
    let newSorting: SortingState = [];
    switch (value) {
      case "date-newest":
        newSorting = [{ id: "departureDate", desc: true }];
        break;
      case "date-oldest":
        newSorting = [{ id: "departureDate", desc: false }];
        break;
      case "probability-high":
        newSorting = [{ id: "delayProbability", desc: true }];
        break;
      case "probability-low":
        newSorting = [{ id: "delayProbability", desc: false }];
        break;
      case "distance-long":
        newSorting = [{ id: "distanceKm", desc: true }];
        break;
      case "distance-short":
        newSorting = [{ id: "distanceKm", desc: false }];
        break;
      default:
        newSorting = [];
    }
    setSorting(newSorting);
  }, []);

  const currentSortValue = useMemo(() => {
    const sort = sorting[0];
    if (!sort) return "all";
    if (sort.id === "departureDate")
      return sort.desc ? "date-newest" : "date-oldest";
    if (sort.id === "delayProbability")
      return sort.desc ? "probability-high" : "probability-low";
    if (sort.id === "distanceKm")
      return sort.desc ? "distance-long" : "distance-short";
    return "all";
  }, [sorting]);

  const handleReset = useCallback(() => {
    setColumnFilters([]);
    setSorting([]);
    setSearchValue("");
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  const handleExport = () => {
    // TODO : backend need to implement export csv
  };
  return (
    <section className="space-y-6">
      <h3 className="sr-only">Predictions table</h3>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by airline or status..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
          value={currentSortValue}
          onValueChange={handleSortChange}
          placeholder="Sort by"
        >
          <SelectItem value="all">Default Sort</SelectItem>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </BaseSelectFilter>

        <Button
          variant="outline"
          className="gap-2 h-9 border-dashed"
          onClick={handleReset}
          title="Reset filters and sorting"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden lg:inline">Reset</span>
        </Button>
        <Button variant="outline" className="gap-2 h-9" onClick={handleExport}>
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
