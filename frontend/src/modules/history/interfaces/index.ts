export type PredictionStatus = "succeeded" | "delayed" | "failed";

export type AtmosphericType = "live" | "storm" | "tailwind" | "none";

export interface Prediction {
  id: string;
  status: PredictionStatus;
  origin: string;
  destination: string;
  date: string;
  aircraft: string;
  distance: string;
  atmospherics: AtmosphericType;
}

export interface Lote {
  id: string;
  batchName: string;
  histories: Prediction[];
  serialNumber: number;
  total: number;
  createdAt: string;
}

export interface Pagination<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
