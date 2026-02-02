interface ProfileTechStackProps {
  languages: string[];
}
import PredictionCardWrapper from "../../shared/components/prediction-card-wrapper";

export default function ProfileTechStack({ languages }: ProfileTechStackProps) {
  return (
    <PredictionCardWrapper className="p-8 space-y-6">
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
    </PredictionCardWrapper>
  );
}
