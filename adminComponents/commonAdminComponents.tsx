import React from "react";

export function PageContainerComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-col w-full ">{children}</main>;
}
