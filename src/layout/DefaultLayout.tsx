import { IMAGES } from "@/config/constant";
import React from "react";

type IProps = {
  children?: React.ReactNode;
};
export const DefaultLayout = ({ children }: IProps) => {
  return (
    <React.Fragment>
      <div
        className={`w-full h-full flex justify-center items-center bg-no-repeat bg-cover bg-center`}
        style={{
          backgroundImage: `url(${IMAGES.BackGroundLoginScreen})`,
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};
