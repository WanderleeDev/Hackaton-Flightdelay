import { Plane } from "lucide-react";
import { cn } from "@/src/modules/shared/utils/cn";

type PlaneIconBoxVariant = "sm" | "md" | "lg";
type PlaneIconBoxDesign = "solid" | "ghost";

interface PlaneIconBoxProps {
  variant?: PlaneIconBoxVariant;
  design?: PlaneIconBoxDesign;
  className?: string;
}

const variantStyles: Record<
  PlaneIconBoxVariant,
  { container: string; icon: string }
> = {
  sm: {
    container: "p-1 rounded-lg",
    icon: "size-4",
  },
  md: {
    container: "p-1.5 sm:p-2 rounded-xl",
    icon: "size-5 sm:size-6",
  },
  lg: {
    container: "p-2.5 sm:p-3 rounded-2xl",
    icon: "size-7 sm:size-8",
  },
};

const designStyles: Record<
  PlaneIconBoxDesign,
  { container: string; icon: string }
> = {
  solid: {
    container: "bg-primary",
    icon: "text-white fill-primary/10",
  },
  ghost: {
    container: "bg-primary/10",
    icon: "text-primary",
  },
};

export function PlaneIconBox({
  variant = "md",
  design = "solid",
  className,
}: PlaneIconBoxProps) {
  const sizeStyles = variantStyles[variant];
  const colorStyles = designStyles[design];

  return (
    <div className={cn(sizeStyles.container, colorStyles.container, className)}>
      <Plane className={cn(sizeStyles.icon, colorStyles.icon)} />
    </div>
  );
}

export default PlaneIconBox;
