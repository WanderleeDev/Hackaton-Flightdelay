import { ReactNode } from "react";
import {
  ogBaseStyles,
  ogColors,
  createIconContainer,
  createDot,
} from "./og-styles";

// Tamaño estándar para OG images
export const OG_SIZE = {
  width: 1200,
  height: 630,
};

// Props para el contenedor principal
interface OgContainerProps {
  children: ReactNode;
}

export function OgContainer({ children }: OgContainerProps) {
  return (
    <div style={ogBaseStyles.container}>
      <OgGridPattern />
      {children}
    </div>
  );
}

// Patrón de grid decorativo
export function OgGridPattern() {
  return <div style={ogBaseStyles.gridPattern} />;
}

// Contenedor del icono principal
interface OgIconBoxProps {
  children: ReactNode;
  variant?: "green" | "purple" | "cyan" | "amber";
}

const iconVariants = {
  green: {
    from: ogColors.emerald600,
    to: ogColors.emerald500,
    shadow: "rgba(16, 185, 129, 0.35)",
  },
  purple: {
    from: ogColors.violet500,
    to: ogColors.violet400,
    shadow: "rgba(168, 85, 247, 0.35)",
  },
  cyan: {
    from: ogColors.sky500,
    to: ogColors.sky400,
    shadow: "rgba(14, 165, 233, 0.35)",
  },
  amber: {
    from: "#d97706",
    to: ogColors.amber500,
    shadow: "rgba(245, 158, 11, 0.35)",
  },
};

export function OgIconBox({ children, variant = "green" }: OgIconBoxProps) {
  const { from, to, shadow } = iconVariants[variant];
  return <div style={createIconContainer(from, to, shadow)}>{children}</div>;
}

// Título principal
interface OgTitleProps {
  children: ReactNode;
}

export function OgTitle({ children }: OgTitleProps) {
  return <div style={ogBaseStyles.title}>{children}</div>;
}

// Subtítulo
interface OgSubtitleProps {
  children: ReactNode;
  color?: string;
}

export function OgSubtitle({
  children,
  color = ogColors.cyan400,
}: OgSubtitleProps) {
  return <div style={{ ...ogBaseStyles.subtitle, color }}>{children}</div>;
}

// Descripción
interface OgDescriptionProps {
  children: ReactNode;
}

export function OgDescription({ children }: OgDescriptionProps) {
  return <div style={ogBaseStyles.description}>{children}</div>;
}

// Contenedor del título (título + subtítulo)
interface OgTitleGroupProps {
  children: ReactNode;
}

export function OgTitleGroup({ children }: OgTitleGroupProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      {children}
    </div>
  );
}

// Footer con badge
interface OgFooterProps {
  text?: string;
  dotColor?: string;
}

export function OgFooter({
  text = "Powered by AI & Real-time Data",
  dotColor = ogColors.emerald500,
}: OgFooterProps) {
  return (
    <div style={ogBaseStyles.footer}>
      <div style={createDot(dotColor)} />
      <span style={ogBaseStyles.footerText}>{text}</span>
    </div>
  );
}

// Card de preview (para rutas de vuelo, lotes, etc.)
interface OgPreviewCardProps {
  children: ReactNode;
  statusColor?: string;
}

export function OgPreviewCard({
  children,
  statusColor = ogColors.green500,
}: OgPreviewCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={createDot(statusColor, 10)} />
      <span style={{ color: ogColors.white, fontSize: 16 }}>{children}</span>
    </div>
  );
}

// Contenedor para cards de preview
interface OgPreviewGroupProps {
  children: ReactNode;
  marginTop?: number;
}

export function OgPreviewGroup({
  children,
  marginTop = 40,
}: OgPreviewGroupProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        marginTop,
      }}
    >
      {children}
    </div>
  );
}

// Iconos SVG reutilizables
export const OgIcons = {
  Airplane: () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
};

// Re-exportar colores para uso directo
export { ogColors };
