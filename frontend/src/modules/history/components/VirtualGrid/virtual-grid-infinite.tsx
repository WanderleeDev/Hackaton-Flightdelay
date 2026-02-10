import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
import PredictionCardSkeleton from "../../skeletons/prediction-card-skeleton";
import GridContainer from "./grid-container";
import ItemContainer from "./item-container";
import GridFooter from "./grid-footer";
import EmptyState from "@/src/modules/shared/components/empty-state";

interface VirtualGridInfiniteProps<T> {
  ref?: React.Ref<VirtuosoGridHandle>;
  data: T[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (index: number, item: T) => React.ReactNode;
  height?: string;
  overscan?: number;
  scrollSeekVelocity?: {
    enter: number;
    exit: number;
  };
}

export default function VirtualGridInfinite<T>({
  ref,
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
  height = "calc(90dvh - 60px)",
  overscan = 10,
  scrollSeekVelocity = { enter: 500, exit: 50 },
}: VirtualGridInfiniteProps<T>) {
  if (data.length === 0) return <EmptyState message="No lotes found" />;

  return (
    <VirtuosoGrid
      ref={ref}
      style={{ height }}
      className="mask-[linear-gradient(to_bottom,transparent,black_40px,black_calc(100%-40px),transparent)]"
      totalCount={data.length}
      data={data}
      components={{
        List: GridContainer,
        Item: ItemContainer,
        Footer: () => <GridFooter {...{ hasNextPage, isFetchingNextPage }} />,
        ScrollSeekPlaceholder: PredictionCardSkeleton,
      }}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > scrollSeekVelocity.enter,
        exit: (velocity) => Math.abs(velocity) < scrollSeekVelocity.exit,
      }}
      itemContent={renderItem}
      endReached={() => hasNextPage && fetchNextPage()}
      overscan={overscan}
    />
  );
}
