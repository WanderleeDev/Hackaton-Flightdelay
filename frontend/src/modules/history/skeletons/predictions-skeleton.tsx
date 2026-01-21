import PredictionCardSkeleton from "./prediction-card-skeleton";

export default function PredictionsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
      {[...Array(8)].map((_, i) => (
        <PredictionCardSkeleton key={i} />
      ))}
    </div>
  );
}
