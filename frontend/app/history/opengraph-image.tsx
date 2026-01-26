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
  OgPreviewCard,
  OgIcons,
  OG_SIZE,
  ogColors,
} from "@/src/modules/shared/opengraph";

export const alt = "History - Flight Prediction";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgContainer>
      <OgIconBox variant="green">
        <OgIcons.Clock />
      </OgIconBox>

      <OgTitleGroup>
        <OgTitle>Prediction History</OgTitle>
        <OgSubtitle color={ogColors.brandAccent}>
          Flight Delay Tracker
        </OgSubtitle>
      </OgTitleGroup>

      <OgDescription>
        Review your past flight predictions and track delay patterns over time
      </OgDescription>

      <OgPreviewGroup>
        <OgPreviewCard statusColor={ogColors.green500}>
          SKBO → KJFK
        </OgPreviewCard>
        <OgPreviewCard statusColor={ogColors.amber500}>
          EGLL → LEMD
        </OgPreviewCard>
        <OgPreviewCard statusColor={ogColors.red500}>KMIA → TJSJ</OgPreviewCard>
      </OgPreviewGroup>

      <OgFooter dotColor={ogColors.emerald500} />
    </OgContainer>,
    { ...size },
  );
}
