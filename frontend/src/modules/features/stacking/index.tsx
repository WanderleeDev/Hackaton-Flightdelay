import styles from "./styles.module.css";
import { Brain, CloudSun, Map, ShieldCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Brain,
    title: "MCP Integration",
    description:
      "Creation of our own MCP, use our services with your favorite AI provider",
    bg: "bg-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "User & Role Management",
    description:
      "Granular access control with user authentication and role-based authorization. Define permissions, enforce security policies, and ensure that each user interacts with the system according to their assigned role.",
    bg: "bg-emerald-500",
  },
  {
    icon: Map,
    title: "Global Route Mapping",
    description:
      "Interactive 3D visualization of transatlantic and domestic routes, providing a geographical context to every prediction.",
    bg: "bg-emerald-500",
  },
  {
    icon: CloudSun,
    title: "Atmospheric Intelligence",
    description:
      "Deep integration with real-time meteorological data, accounting for storms, tailwinds, and localized weather phenomena.",
    bg: "bg-amber-500",
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
      {features.map(({ icon: Icon, title, description, bg }, idx) => {
        return (
          <div
            key={idx}
            className={`${styles["stack-item"]} ${bg}`}
            style={
              {
                "--index": idx + 1,
                animation: `${idx === features.length - 1 ? "none" : ""}`,
                "--rotate-card": `${idx % 2 === 0 ? 8 : -8}deg`,
              } as React.CSSProperties
            }
          >
            <article className="flex h-screen flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-24 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-20 text-[#1e1e1e] sticky top-0">
              <header className="flex justify-between items-start gap-4">
                <h2 className="text-[clamp(2.5rem,12vw,7rem)] sm:text-[clamp(3rem,10vw,6rem)] md:text-[clamp(3.5rem,8vw,5.5rem)] lg:text-[7vw] leading-[0.9] font-bold max-w-[70%] sm:max-w-[75%] lg:max-w-none">
                  {title}
                </h2>
                <Icon className="size-12 sm:size-16 md:size-20 lg:size-24 xl:size-28 shrink-0" />
              </header>
              <div className="flex h-full justify-between flex-col md:flex-row gap-8 md:gap-12">
                <p className="w-full self-end text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed md:w-1/2 lg:w-1/3">
                  {description}
                </p>
                <div className="flex h-full w-full gap-3 sm:gap-4 md:gap-5 self-end md:w-1/2 lg:w-1/3 relative min-h-[200px] sm:min-h-[250px] md:min-h-0">
                  <span
                    className="hidden md:block text-[clamp(4rem,12vw,10rem)] lg:text-[17vw] leading-none font-bold absolute -translate-x-full left-0 ml-8 lg:ml-16 z-10 top-1/2 -translate-y-1/2"
                    style={{
                      WebkitTextStroke: "clamp(0.2rem, 0.5vw, 0.5rem) #fff",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl min-h-[inherit]">
                    <Image
                      src="/app-features-logo-base.png"
                      alt="Platform Showcase"
                      unoptimized
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`${styles["stack-image"]}`}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
