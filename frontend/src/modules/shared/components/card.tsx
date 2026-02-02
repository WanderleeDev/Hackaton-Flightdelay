import * as React from "react";
import { cn } from "@/src/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline";
  hover?: "none" | "lift" | "glow";
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = "none",
      interactive = false,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: "bg-card border-border",
      glass: "bg-card/40 backdrop-blur-md border-border/40",
      outline: "bg-transparent border-2 border-border/50",
    };

    const hoverEffects = {
      none: "",
      lift: "hover:-translate-y-1 hover:shadow-lg hover:border-primary/40",
      glow: "hover:shadow-[0_0_20px_rgba(0,168,232,0.15)] hover:border-primary/50",
    };

    const interactiveStyles = interactive
      ? "focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 outline-none cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border transition-[transform,border-color,box-shadow,background-color] duration-normal",
          variants[variant],
          hoverEffects[hover],
          interactiveStyles,
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export { Card };
