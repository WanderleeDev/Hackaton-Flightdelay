"use client";
import { Card } from "@/components/ui/card";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  MarkerTooltip,
} from "@/components/ui/map";
import { cn } from "@/src/lib/utils";
import { useMapSelection } from "../context/map-context";
import { useEffect, useState, useMemo } from "react";
import MapLibreGL from "maplibre-gl";
import { getGreatCirclePoints } from "../utils/map-utils";
import { Plane } from "lucide-react";

interface GlobalMapProps {
  className?: string;
}

export default function GlobalMap({ className }: GlobalMapProps) {
  const { origin, destination } = useMapSelection();
  const [mapRef, setMapRef] = useState<MapLibreGL.Map | null>(null);
  const [planePos, setPlanePos] = useState<[number, number] | null>(null);

  // Generate the curved route coordinates (Great Circle)
  const routeCoordinates = useMemo(() => {
    if (origin && destination) {
      return getGreatCirclePoints(
        [origin.lng, origin.lat],
        [destination.lng, destination.lat],
        100,
      );
    }
    return [];
  }, [origin, destination]);

  // Handle map movement and bounds
  useEffect(() => {
    if (!mapRef) return;

    if (origin && destination) {
      const bounds = new MapLibreGL.LngLatBounds();
      bounds.extend([origin.lng, origin.lat]);
      bounds.extend([destination.lng, destination.lat]);
      mapRef.fitBounds(bounds, { padding: 100, duration: 2000 });
    } else if (origin) {
      mapRef.flyTo({
        center: [origin.lng, origin.lat],
        zoom: 6,
        duration: 1500,
      });
    } else if (destination) {
      mapRef.flyTo({
        center: [destination.lng, destination.lat],
        zoom: 6,
        duration: 1500,
      });
    }
  }, [origin, destination, mapRef]);

  // Animation for the airplane flying along the route
  useEffect(() => {
    if (routeCoordinates.length === 0) {
      setPlanePos(null);
      return;
    }

    let startTime: number | null = null;
    const duration = 8000; // 8 seconds for a full trip cycle

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress <= 1) {
        const index = Math.min(
          Math.floor(progress * (routeCoordinates.length - 1)),
          routeCoordinates.length - 1,
        );
        setPlanePos(routeCoordinates[index]);
        requestAnimationFrame(animate);
      } else {
        // Restart animation after a short pause
        setTimeout(() => {
          startTime = null;
          requestAnimationFrame(animate);
        }, 1000);
      }
    };

    const requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [routeCoordinates]);

  // Calculate plane rotation (heading) relative to its path
  const planeRotation = useMemo(() => {
    if (!planePos || routeCoordinates.length < 2) return 0;
    const currentIndex = routeCoordinates.findIndex(
      (p) => p[0] === planePos[0] && p[1] === planePos[1],
    );
    const nextIndex = Math.min(currentIndex + 1, routeCoordinates.length - 1);
    const nextPos = routeCoordinates[nextIndex];

    // Simple atan2 for degree rotation
    const angle =
      (Math.atan2(nextPos[1] - planePos[1], nextPos[0] - planePos[0]) * 180) /
      Math.PI;
    return angle;
  }, [planePos, routeCoordinates]);

  return (
    <Card
      className={cn("h-[600px] lg:h-[600px] p-0 overflow-hidden", className)}
    >
      <Map
        ref={(ref) => setMapRef(ref as MapLibreGL.Map)}
        center={[-74.006, 40.7128]}
        zoom={1}
      >
        <MapControls showLocate showFullscreen />

        {origin && (
          <MapMarker longitude={origin.lng} latitude={origin.lat}>
            <MarkerContent className="bg-primary size-4 rounded-full border-2 border-white shadow-xl" />
            <MarkerLabel
              position="top"
              className="font-bold text-[10px] bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-md border shadow-sm border-primary/20"
            >
              {origin.value}
            </MarkerLabel>
            <MarkerTooltip>
              <div className="flex flex-col gap-1 p-1">
                <span className="font-bold text-xs">{origin.label}</span>
                <span className="text-[10px] opacity-70 italic">
                  {origin.country}
                </span>
              </div>
            </MarkerTooltip>
          </MapMarker>
        )}

        {destination && (
          <MapMarker longitude={destination.lng} latitude={destination.lat}>
            <MarkerContent className="bg-emerald-500 size-4 rounded-full border-2 border-white shadow-xl" />
            <MarkerLabel
              position="top"
              className="font-bold text-[10px] bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-md border shadow-sm border-emerald-500/20"
            >
              {destination.value}
            </MarkerLabel>
            <MarkerTooltip>
              <div className="flex flex-col gap-1 p-1">
                <span className="font-bold text-xs">{destination.label}</span>
                <span className="text-[10px] opacity-70 italic">
                  {destination.country}
                </span>
              </div>
            </MarkerTooltip>
          </MapMarker>
        )}

        {routeCoordinates.length > 0 && (
          <MapRoute
            coordinates={routeCoordinates}
            color="hsl(var(--primary))"
            width={2}
            opacity={0.3}
            dashArray={[4, 4]}
          />
        )}

        {planePos && (
          <MapMarker longitude={planePos[0]} latitude={planePos[1]}>
            <MarkerContent className="drop-shadow-2xl">
              <div
                style={{
                  transform: `rotate(${planeRotation}deg)`,
                  transition: "transform 0.1s linear",
                }}
                className="bg-white/95 p-1.5 rounded-full border border-primary/30 shadow-lg"
              >
                <Plane className="size-4 fill-primary stroke-primary" />
              </div>
            </MarkerContent>
          </MapMarker>
        )}
      </Map>
    </Card>
  );
}
