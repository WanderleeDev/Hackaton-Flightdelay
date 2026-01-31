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

export const alt = "About Us - Flight Prediction Team";
export const size = OG_SIZE;
export const contentType = "image/png";

const TEAM_AVATARS = [
  { bg: ogColors.emerald600, initials: "JD" },
  { bg: ogColors.sky500, initials: "SM" },
  { bg: ogColors.amber500, initials: "AR" },
  { bg: ogColors.red500, initials: "LC" },
  { bg: ogColors.violet500, initials: "MK" },
  { bg: "#ec4899", initials: "OP" },
];

export default async function Image() {
  return new ImageResponse(
    <OgContainer>
      <OgIconBox variant="purple">
        <OgIcons.Users />
      </OgIconBox>

      <OgTitleGroup>
        <OgTitle>About Us</OgTitle>
        <OgSubtitle color={ogColors.brandAccent}>Meet Our Team</OgSubtitle>
      </OgTitleGroup>

      <OgDescription>
        The talented minds behind the Flight Prediction AI Engine
      </OgDescription>

      <div style={{ display: "flex", marginTop: 48 }}>
        {TEAM_AVATARS.map((member, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: member.bg,
              border: `3px solid ${ogColors.slate800}`,
              marginLeft: i > 0 ? -16 : 0,
              fontSize: 20,
              fontWeight: 600,
              color: ogColors.white,
            }}
          >
            {member.initials}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 24,
          padding: "10px 24px",
          borderRadius: 999,
          background: "rgba(168, 85, 247, 0.15)",
          border: "1px solid rgba(168, 85, 247, 0.3)",
        }}
      >
        <span
          style={{ color: ogColors.violet300, fontSize: 16, fontWeight: 500 }}
        >
          6+ Collaborators
        </span>
      </div>

      <OgFooter text="Flight Prediction Team" dotColor={ogColors.violet400} />
    </OgContainer>,
    { ...size },
  );
}
