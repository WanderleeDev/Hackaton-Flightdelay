"use client";

import {
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import columns from "./columns";
import { Prediction } from "@/src/modules/history/interfaces";
import LegendPredictions from "./LegendPredictions";
import PredictionsFilters from "./PredictionsFilters";
import { useState, useMemo } from "react";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableContent } from "./DataTableContent";

interface LotePredictionsTableProps {
  data: Prediction[];
}

const PAGE_INDEX = 0;
const PAGE_SIZE = 10;

export function LotePredictionsTable({ data }: LotePredictionsTableProps) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirline, setSelectedAirline] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [sortBy, setSortBy] = useState("date-newest");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
  });

  // Get unique airlines for filter
  const airlines = useMemo(() => {
    const uniqueAirlines = new Set(data.map((p) => p.airline));
    return Array.from(uniqueAirlines).sort();
  }, [data]);

  // Filter and Sort Logic
  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.origin.toLowerCase().includes(query) ||
          p.destination.toLowerCase().includes(query) ||
          p.airline.toLowerCase().includes(query),
      );
    }

    if (selectedAirline !== "all") {
      filtered = filtered.filter((p) => p.airline === selectedAirline);
    }

    if (selectedRiskLevel !== "all") {
      filtered = filtered.filter((p) => {
        const prob = p.delayProbability;
        switch (selectedRiskLevel) {
          case "low":
            return prob < 0.25;
          case "medium":
            return prob >= 0.25 && prob < 0.5;
          case "high":
            return prob >= 0.5 && prob < 0.75;
          case "very-high":
            return prob >= 0.75;
          default:
            return true;
        }
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-newest":
          return (
            new Date(b.departureDate).getTime() -
            new Date(a.departureDate).getTime()
          );
        case "date-oldest":
          return (
            new Date(a.departureDate).getTime() -
            new Date(b.departureDate).getTime()
          );
        case "probability-high":
          return b.delayProbability - a.delayProbability;
        case "probability-low":
          return a.delayProbability - b.delayProbability;
        case "distance-long":
          return Number(b.distanceKm) - Number(a.distanceKm);
        case "distance-short":
          return Number(a.distanceKm) - Number(b.distanceKm);
        default:
          return 0;
      }
    });

    return filtered;
  }, [data, searchQuery, selectedAirline, selectedRiskLevel, sortBy]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  const handleExport = () => {
    console.log("Exporting CSV...");
    // Future export implementation
  };

  return (
    <section className="space-y-6">
      <h3 className="sr-only">Predictions table</h3>
      <PredictionsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedAirline={selectedAirline}
        onAirlineChange={setSelectedAirline}
        selectedRiskLevel={selectedRiskLevel}
        onRiskLevelChange={setSelectedRiskLevel}
        sortBy={sortBy}
        onSortChange={setSortBy}
        airlines={airlines}
        onExport={handleExport}
      />
      <DataTableContent table={table} />
      <DataTablePagination table={table} />
      <LegendPredictions />
    </section>
  );
}
