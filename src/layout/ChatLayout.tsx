import { NavBarApp } from "@/components/NavbarApp";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const ChatLayout = ({ children }: IProps) => {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full overflow-hidden ">
        <div className="w-full h-[6%]">
          {/* Header */}
          <div className="flex w-full h-full">
            <NavBarApp />
          </div>
        </div>
        <div className="w-full h-[94%] p-2">{children}</div>
      </div>
    </React.Fragment>
  );
};
