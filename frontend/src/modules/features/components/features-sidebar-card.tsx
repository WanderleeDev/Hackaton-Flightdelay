import Image from "next/image";
import Link from "next/link";

export default function FeaturesSidebarCard() {
  return (
    <div className="p-6 pt-0">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/50 mb-4 shadow-sm bg-black/20">
        <Image
          src="/app-features-logo-base.png"
          alt="AI Core Engine"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/10 to-transparent flex items-end p-4">
          <p className="text-xs font-semibold text-foreground leading-tight">
            Driven by our advanced AI core engine for high-precision flight
            forecasting.
          </p>
        </div>
      </div>
      <Link href="/features" className="block">
        <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
          Explore Our Features
        </button>
      </Link>
    </div>
  );
}
