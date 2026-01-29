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

export function PredictionsFilters({
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
      {/* Search */}
      <div className="relative flex-1 w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by route or airline..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Airline Filter */}
      <Select value={selectedAirline} onValueChange={onAirlineChange}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="All Airlines" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Airlines</SelectItem>
          {airlines.map((airline) => (
            <SelectItem key={airline} value={airline}>
              {airline}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Risk Level Filter */}
      <Select value={selectedRiskLevel} onValueChange={onRiskLevelChange}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="All Risk Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Risk Levels</SelectItem>
          <SelectItem value="low">Low (0-25%)</SelectItem>
          <SelectItem value="medium">Medium (25-50%)</SelectItem>
          <SelectItem value="high">High (50-75%)</SelectItem>
          <SelectItem value="very-high">Very High (75-100%)</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
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

      {/* Export Button */}
      {onExport && (
        <Button variant="outline" onClick={onExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      )}
    </div>
  );
}
