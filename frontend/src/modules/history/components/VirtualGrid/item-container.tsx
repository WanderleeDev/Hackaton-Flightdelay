import { ComponentPropsWithRef } from "react";

export default function ItemContainer({
  ref,
  ...props
}: ComponentPropsWithRef<"div">) {
  return <div ref={ref} {...props} />;
}
