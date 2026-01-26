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

export const alt = "History by Lote - Batch Flight Predictions";
export const size = OG_SIZE;
export const contentType = "image/png";

const LOTE_PREVIEWS = [
  { id: "42", status: ogColors.green500, flights: 2 },
  { id: "12", status: ogColors.amber500, flights: 2 },
  { id: "08", status: ogColors.sky500, flights: 5 },
];

export default async function Image() {
  return new ImageResponse(
    <OgContainer>
      <OgIconBox variant="cyan">
        <OgIcons.Layers />
      </OgIconBox>

      <OgTitleGroup>
        <OgTitle>History by Lote</OgTitle>
        <OgSubtitle color={ogColors.brandAccent}>Batch Predictions</OgSubtitle>
      </OgTitleGroup>

      <OgDescription>
        View and manage your flight predictions organized in batches
      </OgDescription>

      <OgPreviewGroup>
        {LOTE_PREVIEWS.map((lote) => (
          <LoteCard key={lote.id} {...lote} />
        ))}
      </OgPreviewGroup>

      <OgFooter dotColor={ogColors.sky500} />
    </OgContainer>,
    { ...size },
  );
}

// Componente local para cards de lote
function LoteCard({
  id,
  status,
  flights,
}: {
  id: string;
  status: string;
  flights: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px 24px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: status,
          }}
        />
        <span style={{ color: ogColors.white, fontSize: 16, fontWeight: 600 }}>
          Lote #{id}
        </span>
      </div>
      <span style={{ color: ogColors.slate500, fontSize: 14 }}>
        {flights} flights
      </span>
    </div>
  );
}
