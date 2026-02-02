interface ProfileBioProps {
  bio: string;
}
import PredictionCardWrapper from "../../shared/components/prediction-card-wrapper";

export default function ProfileBio({ bio }: ProfileBioProps) {
  return (
    <PredictionCardWrapper className="p-8 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-3 text-foreground">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        Biography
      </h2>
      <p className="text-muted-foreground leading-relaxed">{bio}</p>
    </PredictionCardWrapper>
  );
}
