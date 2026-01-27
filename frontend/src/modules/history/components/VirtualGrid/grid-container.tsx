import { ComponentPropsWithRef } from "react";

export default function GridContainer({
  ref,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      {...props}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full "
    />
  );
}
