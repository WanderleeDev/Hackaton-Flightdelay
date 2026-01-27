import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
import PredictionCardSkeleton from "../../skeletons/prediction-card-skeleton";
import GridContainer from "./grid-container";
import ItemContainer from "./item-container";
import GridFooter from "./grid-footer";

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
  const Footer = () => (
    <GridFooter
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );

  return (
    <VirtuosoGrid
      ref={ref}
      style={{ height }}
      totalCount={data.length}
      data={data}
      components={{
        List: GridContainer,
        Item: ItemContainer,
        Footer,
        ScrollSeekPlaceholder: PredictionCardSkeleton,
      }}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > scrollSeekVelocity.enter,
        exit: (velocity) => Math.abs(velocity) < scrollSeekVelocity.exit,
      }}
      itemContent={renderItem}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      overscan={overscan}
    />
  );
}
