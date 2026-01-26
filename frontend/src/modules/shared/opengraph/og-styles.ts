import { CSSProperties } from "react";

export const ogColors = {
  brandBase: "#1a2b48",
  brandAccent: "#00a8e8",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  emerald600: "#059669",
  emerald500: "#10b981",
  cyan400: "#22d3ee",
  sky500: "#0ea5e9",
  sky400: "#38bdf8",
  violet600: "#7c3aed",
  violet500: "#8b5cf6",
  violet400: "#a855f7",
  violet300: "#c084fc",
  green500: "#22c55e",
  amber500: "#f59e0b",
  red500: "#ef4444",
  teal800: "#134e4a",
  white: "#ffffff",
} as const;

export const ogBaseStyles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, #1a2b48 0%, #0f172a 100%)`,
    fontFamily: "Inter, system-ui, sans-serif",
    position: "relative",
  } as CSSProperties,

  gridPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
  } as CSSProperties,

  title: {
    fontSize: 64,
    fontWeight: 700,
    color: ogColors.white,
    letterSpacing: "-0.02em",
    textShadow: "0 4px 30px rgba(0,0,0,0.3)",
  } as CSSProperties,

  subtitle: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  } as CSSProperties,

  description: {
    fontSize: 20,
    color: ogColors.slate400,
    marginTop: 24,
    textAlign: "center",
    maxWidth: 700,
    lineHeight: 1.5,
  } as CSSProperties,

  footer: {
    position: "absolute",
    bottom: 40,
    display: "flex",
    alignItems: "center",
    gap: 8,
  } as CSSProperties,

  footerText: {
    fontSize: 14,
    color: ogColors.slate500,
    letterSpacing: "0.05em",
  } as CSSProperties,
} as const;

export const createIconContainer = (
  gradientFrom: string,
  gradientTo: string,
  shadowColor: string,
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 100,
  borderRadius: 24,
  background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
  boxShadow: `0 25px 50px -12px ${shadowColor}`,
  marginBottom: 32,
});

export const createDot = (color: string, size = 8): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: "50%",
  background: color,
});

export const createCard = (
  options: { padding?: string; borderRadius?: number } = {},
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: options.padding ?? "12px 20px",
  borderRadius: options.borderRadius ?? 12,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
});

export const createColoredPill = (
  color: string,
  options: { opacity?: number } = {},
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 20px",
  borderRadius: 999,
  background: `rgba(${hexToRgb(color)}, ${options.opacity ?? 0.15})`,
  border: `1px solid rgba(${hexToRgb(color)}, 0.3)`,
});

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255, 255, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
    result[3],
    16,
  )}`;
}
