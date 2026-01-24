"use client";
import { Card } from "@/components/ui/card";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import { cn } from "@/src/lib/utils";
import { useMapSelection } from "../context/map-context";
import { useEffect, useState, useMemo, useRef } from "react";
import MapLibreGL from "maplibre-gl";
import { useTheme } from "next-themes";

interface GlobalMapProps {
  className?: string;
}

const ANIMATION_DURATION = 8000;
const ANIMATION_PAUSE = 1000;
const DEFAULT_CENTER: [number, number] = [-74.006, 40.7128];

export default function GlobalMap({ className }: GlobalMapProps) {
  const { origin, destination } = useMapSelection();
  const [mapRef, setMapRef] = useState<MapLibreGL.Map | null>(null);
  const [planePos, setPlanePos] = useState<[number, number] | null>(null);
  const { resolvedTheme } = useTheme();
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const routeCoordinates = useMemo(() => {
    if (origin && destination) {
      return [
        [origin.lng, origin.lat] as [number, number],
        [destination.lng, destination.lat] as [number, number],
      ];
    }
    return [];
  }, [origin, destination]);

  const routeColor = resolvedTheme === "dark" ? "#00d2ff" : "#3b82f6";
  const routeOpacity = resolvedTheme === "dark" ? 0.8 : 0.6;

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
    } else {
      mapRef.flyTo({ center: DEFAULT_CENTER, zoom: 1, duration: 1500 });
    }
  }, [origin, destination, mapRef]);

  useEffect(() => {
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (routeCoordinates.length === 0) {
      setPlanePos(null);
      return;
    }

    const [start, end] = routeCoordinates;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / ANIMATION_DURATION;

      if (progress <= 1) {
        const lng = start[0] + (end[0] - start[0]) * progress;
        const lat = start[1] + (end[1] - start[1]) * progress;
        setPlanePos([lng, lat]);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        timeoutRef.current = setTimeout(() => {
          startTime = null;
          animationFrameRef.current = requestAnimationFrame(animate);
        }, ANIMATION_PAUSE);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [routeCoordinates]);

  const planeRotation = useMemo(() => {
    if (!planePos || routeCoordinates.length < 2) return 0;
    const [, end] = routeCoordinates;
    const angle =
      (Math.atan2(end[1] - planePos[1], end[0] - planePos[0]) * 180) / Math.PI;
    return 90 - angle;
  }, [planePos, routeCoordinates]);

  return (
    <Card
      className={cn("h-[600px] lg:h-[600px] p-0 overflow-hidden", className)}
    >
      <Map
        ref={(ref) => setMapRef(ref as MapLibreGL.Map)}
        center={DEFAULT_CENTER}
        zoom={1}
      >
        <MapControls showLocate showFullscreen />

        {origin && (
          <MapMarker longitude={origin.lng} latitude={origin.lat}>
            <MarkerContent className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="relative size-3 bg-white rounded-full border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                <span
                  className="absolute left-5 ml-1 text-white text-xs font-bold tracking-tight drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] whitespace-nowrap"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {origin.value}
                </span>
              </div>
            </MarkerContent>
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
            <MarkerContent className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute size-6 bg-blue-500 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "1s" }}
                />
                <div className="relative size-3 bg-white rounded-full border-2 border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <span
                  className="absolute left-5 ml-1 text-white text-xs font-bold tracking-tight drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] whitespace-nowrap"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {destination.value}
                </span>
              </div>
            </MarkerContent>
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
            id={`flight-route-${resolvedTheme}`}
            coordinates={routeCoordinates}
            color={routeColor}
            width={3}
            opacity={routeOpacity}
            dashArray={[3, 2]}
          />
        )}

        {planePos && (
          <MapMarker longitude={planePos[0]} latitude={planePos[1]}>
            <MarkerContent className="drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">
              <div
                style={{
                  transform: `rotate(${planeRotation}deg)`,
                  transition: "transform 0.1s linear",
                }}
                className="flex items-center justify-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                    fill="#f97316"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                </svg>
              </div>
            </MarkerContent>
          </MapMarker>
        )}
      </Map>
    </Card>
  );
}
