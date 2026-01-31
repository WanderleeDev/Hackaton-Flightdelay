"use client";

import { Logs, History, Plane, Waypoints, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    name: "Simulator",
    href: "/",
    icon: Plane,
  },
  {
    name: "History",
    href: "/history",
    icon: History,
  },
  {
    name: "Collaborators",
    href: "/collaborators",
    icon: Waypoints,
  },
  {
    name: "Features",
    href: "/features",
    icon: Sparkles,
  },
] as const;

const activeStyle =
  "bg-primary/80 font-semibold text-primary-foreground transition-all duration-300 pointer-events-none";

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DropdownMenuDialog() {
  const pathname = usePathname();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Open menu" size="icon-sm">
          <Logs />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Sections</DropdownMenuLabel>
        <DropdownMenuGroup>
          {sections.map((section) => {
            const isActive = isActiveRoute(pathname, section.href);
            return (
              <DropdownMenuItem key={section.name} asChild>
                <Link
                  href={section.href}
                  className={`flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                    isActive ? activeStyle : ""
                  }`}
                >
                  <section.icon
                    className={`hover:text-current ${
                      isActive ? "text-primary-foreground" : ""
                    }`}
                  />
                  <span>{section.name}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
