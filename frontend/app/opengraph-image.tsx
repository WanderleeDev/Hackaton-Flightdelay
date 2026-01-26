import { ImageResponse } from "next/og";
import {
  OgContainer,
  OgIconBox,
  OgTitle,
  OgSubtitle,
  OgDescription,
  OgFooter,
  OgTitleGroup,
  OgPreviewGroup,
  OgIcons,
  OG_SIZE,
  ogColors,
} from "@/src/modules/shared/opengraph";

export const alt = "Flight Prediction - AI-Powered Search Engine";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgContainer>
      {/* Globe decoration */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: `2px solid rgba(0, 168, 232, 0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `2px solid rgba(0, 168, 232, 0.3)`,
          }}
        />
      </div>

      <OgIconBox variant="cyan">
        <OgIcons.Airplane />
      </OgIconBox>

      <OgTitleGroup>
        <OgTitle>Flight Prediction</OgTitle>
        <OgSubtitle color={ogColors.brandAccent}>AI-Powered Engine</OgSubtitle>
      </OgTitleGroup>

      <OgDescription>
        Predict flight delays and safety with cutting-edge artificial
        intelligence and real-time atmospheric data
      </OgDescription>

      {/* Feature pills */}
      <OgPreviewGroup>
        <FeaturePill color={ogColors.brandAccent} label="Real-time Data" />
        <FeaturePill color={ogColors.cyan400} label="Delay Prediction" />
        <FeaturePill color={ogColors.violet400} label="AI Analysis" />
      </OgPreviewGroup>

      <OgFooter dotColor={ogColors.emerald500} />
    </OgContainer>,
    { ...size },
  );
}

// Componente local para pills de características
function FeaturePill({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        background: `rgba(${hexToRgb(color)}, 0.15)`,
        border: `1px solid rgba(${hexToRgb(color)}, 0.3)`,
      }}
    >
      <span style={{ color, fontSize: 14, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255, 255, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
    result[3],
    16,
  )}`;
}
