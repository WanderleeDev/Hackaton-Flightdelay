import { Github, Globe } from "lucide-react";
import { Repository } from "../interfaces";
import PredictionCardWrapper from "../../shared/components/prediction-card-wrapper";
import { ActionIcon } from "../../shared/components/action-icon";

interface ProjectCardProps {
  repo: Repository;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <PredictionCardWrapper className="h-auto min-h-56 p-8 flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {repo.name}
            </h3>
            {repo.language && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  {repo.language}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {repo.homepage && (
              <ActionIcon
                href={repo.homepage}
                icon={Globe}
                className="size-10 rounded-xl bg-secondary/50 hover:bg-primary/10"
                iconClassName="size-5"
                title="View Demo"
              />
            )}
            <ActionIcon
              href={repo.html_url}
              icon={Github}
              className="size-10 rounded-xl bg-secondary/50 hover:bg-primary/10"
              iconClassName="size-5"
              title="View Repository"
            />
          </div>
        </div>

        {repo.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {repo.description}
          </p>
        )}

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border/50 pt-6 mt-4">
        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
          Last Update
        </span>
        <span className="text-xs font-medium text-muted-foreground/60">
          {new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </PredictionCardWrapper>
  );
}
