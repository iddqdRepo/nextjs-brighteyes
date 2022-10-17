import React from "react";

export const FormPageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center w-3/6">
      <div className="m-3 mt-10 text-2xl font-medium text-center text-gray-900 font-poppins">
        {title}
      </div>
    </div>
  );
};
export const FormikFormContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full p-8 bg-white border rounded-md shadow-md 2xl:w-11/12">
        {children}
      </div>
    </div>
  );
};
