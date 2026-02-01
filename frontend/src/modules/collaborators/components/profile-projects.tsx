import { Book } from "lucide-react";
import ProjectCard from "./project-card";
import { Repository } from "../interfaces";

interface ProfileProjectsProps {
  items: Repository[];
  total_count: number;
}

export default function ProfileProjects({
  items,
  total_count,
}: ProfileProjectsProps) {
  return (
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
          <Book className="mx-auto text-muted-foreground/30 mb-4" size={64} />
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
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
