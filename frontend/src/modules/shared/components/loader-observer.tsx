"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface LoaderObserverProps {
  action: () => void;
  label?: string;
}

export default function LoaderObserver({
  action,
  label = "Loading...",
}: LoaderObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) action();
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [action]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full py-4"
    >
      <Loader2 className="w-6 h-6 md:w-12 md:h-12 animate-spin text-primary self-center" />
      <p className="text-center text-muted-foreground">{label}</p>
    </div>
  );
}
