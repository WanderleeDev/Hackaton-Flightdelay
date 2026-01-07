import PlaneIconBox from "./plane-icon-box";

export function FooterBrandInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 cursor-default">
        <PlaneIconBox variant="sm" design="ghost" />
        <span className="text-lg font-black tracking-tight capitalize">
          Flight Prediction
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
        Next-generation AI engine for flight prediction and atmospheric
        analysis. Providing real-time insights for global aviation.
      </p>
    </div>
  );
}
