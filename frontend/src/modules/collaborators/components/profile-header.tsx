import { MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { GitHubUser } from "../interfaces";
import { randomGradientGenerator } from "@/src/utils/gradientGenerator";

interface ProfileHeaderProps {
  user: GitHubUser;
  children?: React.ReactNode;
}

export default function ProfileHeader({ user, children }: ProfileHeaderProps) {
  const {
    avatar_url,
    name,
    login: username,
    public_repos,
    followers,
    following,
    location,
    blog,
    created_at,
  } = user;

  const bannerGradient = randomGradientGenerator({
    type: "complex",
    opacity: 0.6,
  });

  return (
    <div className="relative group motion-safe:animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div
        className="h-48 md:h-72 w-full rounded-3xl border border-border overflow-hidden relative shadow-2xl shadow-primary/5"
        style={bannerGradient}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>

      <div className="px-4 md:px-8 -mt-20 md:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-56 md:h-56 rounded-3xl border-4 md:border-8 border-background bg-secondary relative overflow-hidden transition-transform duration-500 shadow-2xl">
              <Image
                src={avatar_url}
                alt={`${name || username}'s avatar`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 224px"
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 pb-4 text-left w-full">
            <div className="space-y-2">
              {name && (
                <h1 className="text-3xl md:text-4xl lg:-translate-y-4 lg:text-5xl font-extrabold text-foreground">
                  {name}
                </h1>
              )}
              <p className="text-lg md:text-xl lg:-translate-y-4 text-primary font-semibold tracking-tight">
                @{username}
              </p>
              <div className="flex flex-wrap items-center justify-start gap-3 md:gap-6 text-sm font-medium">
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{public_repos}</strong>{" "}
                  repos
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{followers}</strong>{" "}
                  followers
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{following}</strong>{" "}
                  following
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
              {location && (
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" /> {location}
                </span>
              )}
              {blog && (
                <a
                  href={blog.startsWith("http") ? blog : `https://${blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <LinkIcon size={16} className="text-primary" />{" "}
                  {blog.replace(/^https?:\/\//, "")}
                </a>
              )}
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> Joined{" "}
                {new Date(created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-start md:justify-end">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
