import { cn } from "@/src/utils/cn";
import { Loader2 } from "lucide-react";

interface LoaderStaticProps {
  label?: string;
  className?: string;
}

export default function LoaderStatic({
  label = "Loading...",
  className,
}: LoaderStaticProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-4",
        className,
      )}
    >
      <Loader2 className="w-6 h-6 md:w-12 md:h-12 animate-spin text-primary self-center" />
      <p className="text-center text-muted-foreground">{label}</p>
    </div>
  );
}
