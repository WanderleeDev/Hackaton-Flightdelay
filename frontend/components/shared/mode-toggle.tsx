"use client";

import { Moon, Sun, Check, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";

type ThemeOption = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const activeStyle =
  "bg-primary/80 font-semibold text-primary-foreground transition-all duration-300 pointer-events-none";
const checkStyle = "size-4 stroke-3 text-background";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              theme === option.value && activeStyle
            )}
          >
            <div className="flex items-center gap-2">
              <option.icon className="size-4 text-current" />
              <span>{option.label}</span>
            </div>
            {theme === option.value && <Check className={checkStyle} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
