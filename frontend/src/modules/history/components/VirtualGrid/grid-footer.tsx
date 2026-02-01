import LoaderStatic from "@/src/modules/shared/components/loader-static";

interface GridFooterProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function GridFooter({
  hasNextPage,
  isFetchingNextPage,
}: GridFooterProps) {
  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <LoaderStatic
      label="Loading predictions..."
      className="col-span-full py-4"
    />
  );
}
