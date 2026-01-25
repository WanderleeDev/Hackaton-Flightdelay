import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PlaneIconBox } from "./plane-icon-box";

interface BrandLogoProps {
  title?: string;
  subtitle?: string;
  version?: string;
  href?: string;
}

export function BrandLogo({
  title = "Flight Prediction",
  subtitle = "AI Prediction Engine",
  version = "v1.0",
  href = "/",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
    >
      <PlaneIconBox
        variant="md"
        className="group-hover:bg-primary/80 transition-all duration-300 transform group-hover:rotate-12"
      />
      <div className="flex flex-col">
        <h1 className="text-lg sm:text-xl font-black tracking-tight leading-none capitalize bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="hidden sm:flex items-center gap-2 mt-1">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {subtitle}
          </span>
          <Badge
            aria-hidden="true"
            variant="outline"
            className="h-4 px-1.5 text-[8px] font-black border-primary/30 bg-primary/5 text-primary uppercase select-none"
          >
            {version}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

export default BrandLogo;
