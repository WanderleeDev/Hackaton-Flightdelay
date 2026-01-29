"use client";

import { useState, useMemo } from "react";
import { Lote, Pagination } from "@/src/modules/history/interfaces";
import { LoteHeader } from "./lote-header";
import { LoteMetrics } from "./lote-metrics";
import { ProbabilityDistribution } from "./probability-distribution";
import { TopRoutesChart } from "./top-routes-chart";
import { PredictionsFilters } from "./predictions-filters";
import { PredictionsTable } from "./predictions-table";
import { Button } from "@/components/ui/button";

interface LoteDetailContentProps {
  lote: Pagination<Lote>;
}

export function LoteDetailContent({
  lote: paginatedLote,
}: LoteDetailContentProps) {
  // Extract the first lote from the paginated response
  const lote = paginatedLote.content[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirline, setSelectedAirline] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [sortBy, setSortBy] = useState("date-newest");

  // Get unique airlines
  const airlines = useMemo(() => {
    const uniqueAirlines = new Set(lote.histories.map((p) => p.airline));
    return Array.from(uniqueAirlines).sort();
  }, [lote.histories]);

  // Filter and sort predictions
  const filteredPredictions = useMemo(() => {
    let filtered = [...lote.histories];

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
  }, [lote.histories, searchQuery, selectedAirline, selectedRiskLevel, sortBy]);

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log("Exporting CSV...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <LoteHeader
        batchName={lote.batchName}
        serialNumber={lote.serialNumber}
        createdAt={lote.createdAt}
        totalPredictions={lote.total}
      />

      {/* Metrics */}
      <LoteMetrics predictions={lote.histories} totalPredictions={lote.total} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProbabilityDistribution predictions={lote.histories} />
        <TopRoutesChart predictions={lote.histories} />
      </div>

      {/* Filters */}
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

      {/* Table */}
      <PredictionsTable predictions={filteredPredictions} />

      {/* Footer */}
      <div className="flex flex-col items-center gap-4 py-4">
        <Button variant="outline" size="lg">
          Load More Predictions
        </Button>
        <p className="text-sm text-muted-foreground">
          Showing {filteredPredictions.length} of {lote.total} predictions
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-end text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>Low Risk (0-25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span>Medium (25-50%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-orange-500" />
          <span>High (50-75%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span>Very High (75-100%)</span>
        </div>
      </div>
    </div>
  );
}
