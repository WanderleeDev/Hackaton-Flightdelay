import { DropdownMenuDialog } from "./dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { BrandLogo } from "./brand-logo";

export default function HeaderPage() {
  return (
    <header
      className="absolute top-0 z-50 w-full border-b border-primary/10 bg-background/60 backdrop-blur-xl shadow-sm"
      style={{
        animation: "re-reveal linear forwards",
        animationTimeline: "view(block)",
        animationRange: "exit-crossing 200% exit-crossing 350%",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <BrandLogo />

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-4 w-px bg-muted mx-1 sm:mx-2 hidden sm:block" />
          <ModeToggle />
          <DropdownMenuDialog />
        </div>
      </div>
    </header>
  );
}
