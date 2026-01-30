import SectionHeader from "@/components/shared/section-header";
import StackingCards from "@/src/modules/features/stacking";

export default function FeaturesPage() {
  return (
    <div>
      <section className="flex justify-center items-center h-[calc(100vh-4rem)] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10 " />

        <SectionHeader
          title="Elevating Flight"
          accentText="Intelligence"
          size="xl"
          className="items-center pb-4 text-center"
        />
      </section>
      <StackingCards />
      <section className="flex justify-center items-center h-screen relative">
        Flight Prediction
      </section>
    </div>
  );
}
