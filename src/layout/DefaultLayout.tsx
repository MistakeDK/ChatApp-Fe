import React from "react";

type IProps = {
  children?: React.ReactNode;
};
export const DefaultLayout = ({ children }: IProps) => {
  return (
    <React.Fragment>
      <div className="w-full h-full">{children}</div>
    </React.Fragment>
  );
};
