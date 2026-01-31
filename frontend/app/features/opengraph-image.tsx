import { ImageResponse } from "next/og";
import {
  OgContainer,
  OgIconBox,
  OgTitle,
  OgSubtitle,
  OgDescription,
  OgFooter,
  OgTitleGroup,
  OgIcons,
  OG_SIZE,
  ogColors,
} from "@/src/modules/shared/opengraph";

export const alt = "Features - Flight Prediction";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgContainer>
      <OgIconBox variant="cyan">
        <OgIcons.Airplane />
      </OgIconBox>

      <OgTitleGroup>
        <OgTitle>Platform Features</OgTitle>
        <OgSubtitle color={ogColors.brandAccent}>
          Advanced AI Tooling
        </OgSubtitle>
      </OgTitleGroup>

      <OgDescription>
        Explore our comprehensive suite of flight analysis tools, MCP
        integrations, and real-time monitoring systems.
      </OgDescription>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
          marginTop: 48,
          maxWidth: 900,
        }}
      >
        <FeaturePill color={ogColors.sky400} label="MCP Integration" />
        <FeaturePill color={ogColors.red500} label="Real-time Alerts" />
        <FeaturePill color={ogColors.emerald500} label="Role Management" />
        <FeaturePill color={ogColors.violet400} label="Weather Analysis" />
        <FeaturePill color={ogColors.amber500} label="Delay Predictions" />
      </div>

      <OgFooter dotColor={ogColors.brandAccent} />
    </OgContainer>,
    { ...size },
  );
}

function FeaturePill({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 28px",
        borderRadius: 999,
        background: "rgba(255, 255, 255, 0.03)",
        border: `1px solid ${color}44`,
        boxShadow: `0 4px 15px -3px ${color}22`,
      }}
    >
      <span style={{ color, fontSize: 18, fontWeight: 600 }}>{label}</span>
    </div>
  );
}
