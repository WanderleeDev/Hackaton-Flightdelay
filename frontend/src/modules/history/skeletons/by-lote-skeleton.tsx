import LoteSectionSkeleton from "@/src/modules/history/skeletons/lote-section-skeleton";

export default function ByLoteSkeleton() {
  return (
    <div className="flex flex-col gap-8 relative z-10">
      <LoteSectionSkeleton />
      <LoteSectionSkeleton />
    </div>
  );
}
