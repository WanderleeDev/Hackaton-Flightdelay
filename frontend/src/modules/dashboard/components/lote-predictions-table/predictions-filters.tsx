"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download } from "lucide-react";

interface PredictionsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedAirline: string;
  onAirlineChange: (value: string) => void;
  selectedRiskLevel: string;
  onRiskLevelChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  airlines: string[];
  onExport?: () => void;
}

export default function PredictionsFilters({
  searchQuery,
  onSearchChange,
  selectedAirline,
  onAirlineChange,
  selectedRiskLevel,
  onRiskLevelChange,
  sortBy,
  onSortChange,
  airlines,
  onExport,
}: PredictionsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-[180px] h-9">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-newest">Date (Newest)</SelectItem>
          <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
          <SelectItem value="probability-high">Probability (High)</SelectItem>
          <SelectItem value="probability-low">Probability (Low)</SelectItem>
          <SelectItem value="distance-long">Distance (Longest)</SelectItem>
          <SelectItem value="distance-short">Distance (Shortest)</SelectItem>
        </SelectContent>
      </Select>

      {onExport && (
        <Button variant="outline" onClick={onExport} className="gap-2 h-9">
          <Download className="h-4 w-4" />
          <span className="hidden lg:inline">Export CSV</span>
        </Button>
      )}
    </div>
  );
}
