import SectionHeader from "@/src/modules/shared/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function FeaturesHero() {
  return (
    <section className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] relative px-6 text-center">
      <div className="absolute top-0 left-1/4 w-[30vw] h-[30vw] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center gap-6 relative z-10 max-w-4xl mx-auto">
        <Badge
          variant="secondary"
          className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <Sparkles className="size-3.5 fill-primary" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">
            Intelligence in the sky
          </span>
        </Badge>

        <SectionHeader
          title="Elevating Flight"
          accentText="Intelligence"
          size="xl"
          className="items-center leading-[0.9] md:text-balance"
        />

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Harnessing advanced machine learning and real-time data to redefine
          how we predict and manage flight disruptions.
        </p>

        <div className="flex flex-col items-center gap-4 pt-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1.5 pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video pointer-events-none -z-20 opacity-[0.05]">
        <Image
          src="/logo.webp"
          alt="Background Logo"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
