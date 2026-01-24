import { COLLABORATORS } from "@/src/modules/shared/data/collaborators";

export function CollaboratorsStatus() {
  return (
    <div className="flex flex-col gap-4 md:items-center">
      <figure className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {COLLABORATORS.map((collaborator) => (
            <div
              key={collaborator.name}
              className="group relative transition-transform hover:scale-110 hover:z-10"
            >
              <img
                src={collaborator.avatar}
                alt={collaborator.name}
                loading="lazy"
                className="size-8 rounded-full border-2 border-background object-cover bg-muted transition-all duration-300 group-hover:border-primary/50"
              />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[9px] font-medium text-foreground bg-background/90 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap pointer-events-none">
                {collaborator.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
        <figcaption className="text-xs font-semibold text-muted-foreground">
          collaborators
        </figcaption>
      </figure>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 w-fit">
        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
          All systems functional
        </span>
      </div>
    </div>
  );
}
