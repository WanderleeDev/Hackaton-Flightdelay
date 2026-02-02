import { cn } from "@/src/utils/cn";
import { HTMLAttributes } from "react";

interface PredictionCardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function PredictionCardWrapper({
  children,
  className,
  ...props
}: PredictionCardWrapperProps) {
  return (
    <div
      className={cn(
        "bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:border-primary/40 hover:shadow-xl",
        "min-w-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
