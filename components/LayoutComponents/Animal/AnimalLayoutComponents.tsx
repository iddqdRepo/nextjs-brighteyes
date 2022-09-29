import React from "react";

export const DetailContainer = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
      <span className="font-semibold">{text}:&nbsp;</span>
      {children}
    </div>
  );
};

export const Divider = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-5/6 border border-b-1 border-b-slate-200"></div>
    </div>
  );
};
