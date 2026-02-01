interface ProfileTechStackProps {
  languages: string[];
}

export default function ProfileTechStack({ languages }: ProfileTechStackProps) {
  return (
    <section className="bg-card/40 backdrop-blur-sm border border-border rounded-[32px] p-8 space-y-6 hover:border-primary/20 transition-colors">
      <h2 className="text-xl font-bold flex items-center gap-3 text-foreground">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        Tech Stack
      </h2>
      <div className="flex flex-wrap gap-2">
        {languages.length > 0 ? (
          languages.map((lang) => (
            <span
              key={lang}
              className="px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              {lang}
            </span>
          ))
        ) : (
          <p className="text-muted-foreground text-sm italic">
            No languages detected
          </p>
        )}
      </div>
    </section>
  );
}
