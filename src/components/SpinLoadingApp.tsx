import { Spinner } from "@heroui/react";
import React from "react";

export const SpinLoadingApp = () => {
  return (
    <React.Fragment>
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    </React.Fragment>
  );
};
