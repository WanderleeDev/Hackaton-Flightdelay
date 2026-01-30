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
import Image from "next/image";
import { getRepositoriesByTopic } from "@/src/modules/about/services/getRepositoriesByTopic";
import { getUserGithubData } from "@/src/modules/about/services/getUserGithubData";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const [
    {
      avatar_url,
      bio,
      blog,
      name,
      location,
      email,
      created_at,
      public_repos,
      followers,
      following,
    },
    { items, total_count },
  ] = await Promise.all([
    getUserGithubData(username),
    getRepositoriesByTopic(username),
  ]);

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
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-primary/30 rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-sm" />
                <div className="w-32 h-32 md:w-56 md:h-56 rounded-[40px] border-8 border-background bg-secondary relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
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

              {/* Identity Info */}
              <div className="flex-1 space-y-4 pb-4">
                <div className="space-y-2">
                  {name && (
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {name}
                    </h1>
                  )}
                  <p className="text-xl text-primary font-semibold tracking-tight">
                    @{username}
                  </p>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">
                        {public_repos}
                      </strong>{" "}
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

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium">
                  {location && (
                    <span className="flex items-center gap-2 pt-2">
                      <MapPin size={18} className="text-primary" /> {location}
                    </span>
                  )}
                  {blog && (
                    <a
                      href={blog.startsWith("http") ? blog : `https://${blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 pt-2 hover:text-primary transition-colors"
                    >
                      <LinkIcon size={18} className="text-primary" />{" "}
                      {blog.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  <span className="flex items-center gap-2 pt-2">
                    <Calendar size={18} className="text-primary" /> Joined{" "}
                    {new Date(created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
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
                {email && (
                  <ActionIcon
                    href={`mailto:${email}`}
                    icon={Mail}
                    className="size-14 rounded-2xl"
                    iconClassName="size-7"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 motion-safe:animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          {/* Left Column: Bio & Skills */}
          <div className="lg:col-span-4 space-y-8">
            {bio && (
              <section className="bg-card/40 backdrop-blur-sm border border-border rounded-[32px] p-8 space-y-6 hover:border-primary/20 transition-colors">
                <h2 className="text-xl font-bold flex items-center gap-3 text-foreground">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  Biography
                </h2>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </section>
            )}

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
                {total_count > 0 && (
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {total_count} {total_count === 1 ? "repo" : "repos"}
                  </span>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <Book
                    className="mx-auto text-muted-foreground/30 mb-4"
                    size={64}
                  />
                  <p className="text-xl text-muted-foreground font-medium">
                    No pinned repositories found
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-2">
                    This user hasn't pinned any repositories yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((repo) => (
                    <Link
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group h-auto min-h-[14rem] bg-card/40 backdrop-blur-sm rounded-[32px] border border-border p-8 flex flex-col justify-between hover:border-primary/30 hover:bg-card/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {repo.name}
                          </h3>
                          <div className="p-2 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors shrink-0">
                            <ExternalLink
                              size={14}
                              className="text-muted-foreground group-hover:text-primary transition-colors"
                            />
                          </div>
                        </div>
                        {repo.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {repo.topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs font-medium text-primary"
                              >
                                {topic}
                              </span>
                            ))}
                            {repo.topics.length > 3 && (
                              <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs font-medium text-muted-foreground">
                                +{repo.topics.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 border-t border-border/50 pt-6 mt-4">
                        {repo.language && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                              {repo.language}
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground/60 ml-auto">
                          Updated{" "}
                          {new Date(repo.updated_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
