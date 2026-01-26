import {
  Github,
  Link as LinkIcon,
  MapPin,
  Calendar,
  Book,
  ExternalLink,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { ActionIcon } from "@/components/shared/action-icon";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <main className="min-h-screen text-foreground pb-20 overflow-x-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-primary/15 rounded-full blur-[120px] motion-safe:animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation / Back Button */}
        <div className="py-8">
          <Link
            href="/about"
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium w-fit"
          >
            <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Collaborators
          </Link>
        </div>

        {/* Profile Card Shell */}
        <div className="relative group motion-safe:animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Banner */}
          <div className="h-48 md:h-72 w-full rounded-[40px] bg-linear-to-br from-primary/20 via-primary/5 to-card border border-border overflow-hidden relative shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
          </div>

          {/* Profile Info Overlay */}
          <div className="px-8 md:px-12 -mt-24 md:-mt-32 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Avatar Placeholder */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-primary/30 rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-sm" />
                <div className="w-32 h-32 md:w-56 md:h-56 rounded-[40px] border-8 border-background bg-secondary relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
                  <div className="w-full h-full bg-linear-to-tr from-secondary to-card motion-safe:animate-pulse" />
                </div>
              </div>

              {/* Identity Info */}
              <div className="flex-1 space-y-4 pb-4">
                <div className="space-y-2">
                  <div className="h-10 w-64 bg-foreground/10 rounded-xl motion-safe:animate-pulse" />
                  <p className="text-xl text-primary font-semibold tracking-tight">
                    @{username}
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-2 pt-2">
                    <MapPin size={18} className="text-primary" /> Location
                    Placeholder
                  </span>
                  <span className="flex items-center gap-2 pt-2">
                    <LinkIcon size={18} className="text-primary" /> website.dev
                  </span>
                  <span className="flex items-center gap-2 pt-2">
                    <Calendar size={18} className="text-primary" /> Joined ...
                  </span>
                </div>
              </div>

              {/* Social Actions */}
              <div className="flex gap-3 pb-6">
                <ActionIcon
                  href={`https://github.com/${username}`}
                  icon={Github}
                  className="size-14 rounded-2xl"
                  iconClassName="size-7"
                />
                <ActionIcon
                  href="#"
                  icon={Mail}
                  className="size-14 rounded-2xl"
                  iconClassName="size-7"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 motion-safe:animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          {/* Left Column: Bio & Skills */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-card/40 backdrop-blur-sm border border-border rounded-[32px] p-8 space-y-6 hover:border-primary/20 transition-colors">
              <h2 className="text-xl font-bold flex items-center gap-3 text-foreground">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                Biography
              </h2>
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted/40 rounded-full motion-safe:animate-pulse" />
                <div className="h-4 w-[90%] bg-muted/40 rounded-full motion-safe:animate-pulse" />
                <div className="h-4 w-[95%] bg-muted/40 rounded-full motion-safe:animate-pulse" />
                <div className="h-4 w-[70%] bg-muted/40 rounded-full motion-safe:animate-pulse shadow-inner" />
              </div>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border rounded-[32px] p-8 space-y-6 hover:border-primary/20 transition-colors">
              <h2 className="text-xl font-bold flex items-center gap-3 text-foreground">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-primary/5 border border-primary/10 rounded-lg motion-safe:animate-pulse"
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Key Activity / Featured Repos */}
          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                  <Book className="text-primary" size={28} />
                  Featured Projects
                </h2>
                <div className="h-px flex-1 mx-6 bg-border/50" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Repo Placeholder Grid */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="group h-56 bg-card/40 backdrop-blur-sm rounded-[32px] border border-border p-8 flex flex-col justify-between hover:border-primary/30 hover:bg-card/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-wait"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-7 w-3/4 bg-primary/10 rounded-xl" />
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <ExternalLink
                            size={14}
                            className="text-muted-foreground"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted/20 rounded-lg" />
                        <div className="h-4 w-[85%] bg-muted/20 rounded-lg" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                      <div className="h-4 w-20 bg-secondary rounded-full" />
                      <div className="h-4 w-12 bg-secondary rounded-full ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
