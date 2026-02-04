import StackingCards from "@/src/modules/features/components/stacking";
import CollaboratorsFooter from "@/src/modules/collaborators/components/collaborators-footer";
import FeaturesHero from "@/src/modules/features/components/features-hero";

export default function FeaturesPage() {
  return (
    <div className="relative">
      <FeaturesHero />
      <StackingCards />
      <div className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto">
        <CollaboratorsFooter />
      </div>
    </div>
  );
}
