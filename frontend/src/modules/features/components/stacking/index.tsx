import { features } from "../../data/features";
import styles from "./styles.module.css";
import Image from "next/image";

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
      {features.map(
        ({ icon: Icon, title, description, bg, image, inDevelopment }, idx) => {
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

                {inDevelopment && (
                  <div className="absolute bottom-[15%] sm:bottom-[20%] right-0 z-20 pointer-events-none scale-90 sm:scale-110 origin-right">
                    <div className="bg-amber-500/95 backdrop-blur-3xl border-y border-l border-white/40 pl-6 sm:pl-10 pr-10 sm:pr-14 py-3 sm:py-5 rounded-l-full shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex items-center gap-3 sm:gap-4 translate-x-2 sm:translate-x-4 transition-transform group-hover:translate-x-0">
                      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white"></span>
                      </span>
                      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.9)] antialiased whitespace-nowrap">
                        In Development
                      </p>
                    </div>
                  </div>
                )}
              </article>
            </div>
          );
        },
      )}
    </div>
  );
}
