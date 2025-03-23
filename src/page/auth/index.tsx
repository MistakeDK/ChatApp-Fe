import { IMAGES } from "@/config/constant";
import { eFormType } from "@/config/enum";
import { Image } from "@heroui/react";
import React, { useState } from "react";
import { LoginCard } from "./component/LoginCard";
import { RegisterCard } from "./component/RegisterCard";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState<eFormType>(eFormType.LOGIN);

  return (
    <React.Fragment>
      <div className="flex w-2/5 h-3/5  space-x-4 p-3 rounded-lg border shadow-md bg-white">
        {/* card */}
        <div className="w-1/2 flex h-full items-center justify-center">
          {isLogin === eFormType.LOGIN && (
            <LoginCard changeTypeForm={() => setIsLogin(eFormType.REGISTER)} />
          )}
          {isLogin === eFormType.REGISTER && (
            <RegisterCard changeFormType={() => setIsLogin(eFormType.LOGIN)} />
          )}
        </div>
        {/* Image Login */}
        <div className="w-1/2 h-full">
          <div className="w-full h-full flex justify-center items-center">
            <Image src={IMAGES.LoginScreen}></Image>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
