import styles from "./styles.module.css";
import { Bell, Brain, CloudSun, ShieldCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Brain,
    title: "MCP Integration",
    description:
      "Creation of our own MCP, use our services with your favorite AI provider",
    bg: "bg-sky-600",
    image: "/feature-mcp.png",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Receive instant notifications for flight delays, cancellations, and other critical updates.",
    bg: "bg-red-500",
    image: "/feature-notifications.png",
  },
  {
    icon: ShieldCheck,
    title: "User & Role Management",
    description:
      "Secure authentication and granular role-based access control for all users.",
    bg: "bg-emerald-500",
    image: "/feature-security.png",
  },
  {
    icon: CloudSun,
    title: "Automated Weather Alerts",
    description:
      "Hyper-local forecasts and automated flight plan adjustments for severe weather.",
    bg: "bg-indigo-500",
    image: "/feature-weather.png",
  },
];

export default function StackingCards() {
  return (
    <div
      className={styles.stack}
      style={
        {
          "--total-cards": features.length,
        } as React.CSSProperties
      }
    >
      {features.map(({ icon: Icon, title, description, bg, image }, idx) => {
        return (
          <div
            key={idx}
            className={`${styles["stack-item"]} ${bg}`}
            style={
              {
                "--index": idx + 1,
                animation: `${idx === features.length - 1 ? "none" : ""}`,
                "--rotate-card": `${idx % 2 === 0 ? 5 : -5}deg`,
              } as React.CSSProperties
            }
          >
            <span className={styles["index-watermark"]}>{idx + 1}</span>

            <article className="flex h-[60dvh] md:h-screen flex-col justify-between gap-8 px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-20 lg:px-24 lg:py-28 text-white sticky top-0 z-10">
              <header className="flex justify-between items-center gap-6 border-b border-white/10 pb-6 sm:pb-12">
                <h2
                  className="text-[clamp(1.75rem,8vw,6rem)] leading-[0.95] font-black max-w-[85%] uppercase tracking-tighter"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                    paintOrder: "stroke fill",
                  }}
                >
                  {title}
                </h2>
                <div className={styles["icon-wrapper"]}>
                  <Icon
                    strokeWidth={1.5}
                    className="size-10 sm:size-14 md:size-16 lg:size-20 text-white"
                  />
                </div>
              </header>

              <div className="flex-1 flex flex-col gap-4 md:flex-row justify-between relative z-10">
                <div className="flex flex-col gap-6 w-full md:w-[60%] lg:w-[50%] justify-end md:justify-center pb-12 shrink-0">
                  <div className="space-y-6">
                    <p
                      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug font-light ${styles["stack-text"]}`}
                    >
                      {description}
                    </p>
                    <div className="h-1.5 w-24 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>

              <div className={styles["image-container"]}>
                <Image
                  src={image}
                  alt={title}
                  unoptimized
                  loading="lazy"
                  fill
                  className={styles["stack-image"]}
                />
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
