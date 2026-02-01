interface ProfileBioProps {
  bio: string;
}

export default function ProfileBio({ bio }: ProfileBioProps) {
  return (
    <section className="bg-card/40 backdrop-blur-sm border border-border rounded-[32px] p-8 space-y-6 hover:border-primary/20 transition-colors">
      <h2 className="text-xl font-bold flex items-center gap-3 text-foreground">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        Biography
      </h2>
      <p className="text-muted-foreground leading-relaxed">{bio}</p>
    </section>
  );
}
