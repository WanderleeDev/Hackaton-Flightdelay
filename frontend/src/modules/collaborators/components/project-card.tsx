import { ExternalLink, Book } from "lucide-react";
import Link from "next/link";
import { Repository } from "../interfaces";

interface ProjectCardProps {
  repo: Repository;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-auto min-h-56 bg-card/40 backdrop-blur-sm rounded-[32px] border border-border p-8 flex flex-col justify-between hover:border-primary/30 hover:bg-card/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02]"
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
          {new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
