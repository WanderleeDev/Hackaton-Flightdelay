export default function LegendPredictions() {
  return (
    <footer className="flex flex-wrap gap-4 justify-end text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-green-500" />
        <span>Low Risk (0-25%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-yellow-500" />
        <span>Medium (25-50%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-orange-500" />
        <span>High (50-75%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-red-500" />
        <span>Very High (75-100%)</span>
      </div>
    </footer>
  );
}
