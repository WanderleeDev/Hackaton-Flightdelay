"use client";

import { useState, useMemo } from "react";
import { PredictionsFilters } from "./predictions-filters";
import { PredictionsTablePaginated } from "./predictions-table-paginated";
import type { Prediction } from "@/src/modules/history/interfaces";

interface LotePredictionsTableProps {
  predictions: Prediction[];
}

export function LotePredictionsTable({
  predictions,
}: LotePredictionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirline, setSelectedAirline] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [sortBy, setSortBy] = useState("date-newest");

  // Get unique airlines
  const airlines = useMemo(() => {
    const uniqueAirlines = new Set(predictions.map((p) => p.airline));
    return Array.from(uniqueAirlines).sort();
  }, [predictions]);

  // Filter and sort predictions
  const filteredPredictions = useMemo(() => {
    let filtered = [...predictions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.origin.toLowerCase().includes(query) ||
          p.destination.toLowerCase().includes(query) ||
          p.airline.toLowerCase().includes(query),
      );
    }

    // Airline filter
    if (selectedAirline !== "all") {
      filtered = filtered.filter((p) => p.airline === selectedAirline);
    }

    // Risk level filter
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

    // Sort
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
        case "distance-long": {
          const distA =
            typeof a.distanceKm === "string"
              ? parseFloat(a.distanceKm)
              : a.distanceKm;
          const distB =
            typeof b.distanceKm === "string"
              ? parseFloat(b.distanceKm)
              : b.distanceKm;
          return distB - distA;
        }
        case "distance-short": {
          const distA =
            typeof a.distanceKm === "string"
              ? parseFloat(a.distanceKm)
              : a.distanceKm;
          const distB =
            typeof b.distanceKm === "string"
              ? parseFloat(b.distanceKm)
              : b.distanceKm;
          return distA - distB;
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [predictions, searchQuery, selectedAirline, selectedRiskLevel, sortBy]);

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log("Exporting CSV...");
  };

  return (
    <div className="space-y-6">
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

      <PredictionsTablePaginated predictions={filteredPredictions} />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-end text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-green-500" />
          <span>Low Risk (0-25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-yellow-500" />
          <span>Medium (25-50%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-orange-500" />
          <span>High (50-75%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500" />
          <span>Very High (75-100%)</span>
        </div>
      </div>
    </div>
  );
}
