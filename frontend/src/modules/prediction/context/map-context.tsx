"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Airport } from "../data/airports";

interface MapContextType {
  origin: Airport | null;
  destination: Airport | null;
  setOrigin: (airport: Airport | null) => void;
  setDestination: (airport: Airport | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);

  return (
    <MapContext.Provider
      value={{ origin, destination, setOrigin, setDestination }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapSelection() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapSelection must be used within a MapProvider");
  }
  return context;
}
