import { BrandLogo } from "@/src/modules/shared/components/brand-logo";

export default function LoadingByLoteId() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full animate-in fade-in duration-700">
      <div className="relative flex flex-col items-center gap-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 blur-[60px] rounded-full animate-pulse" />

        <div className="relative transition-all duration-500 scale-110 md:scale-125">
          <div className="animate-pulse duration-2000">
            <BrandLogo />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
            <div className="size-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
            <div className="size-1.5 rounded-full bg-primary/60 animate-bounce" />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-bold tracking-widest text-foreground/40 uppercase">
              Processing Information
            </p>
            <p className="text-xs text-muted-foreground/60">
              Preparing your prediction batch details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
