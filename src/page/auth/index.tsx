import { IMAGES } from "@/config/constant";
import { eFormType } from "@/config/enum";
import { Card, CardBody, Image } from "@heroui/react";
import React, { useState } from "react";
import { LoginCard } from "./component/LoginCard";
import { RegisterCard } from "./component/RegisterCard";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState<eFormType>(eFormType.LOGIN);

  return (
    <React.Fragment>
      <Card
        classNames={{
          body: "flex",
        }}
        className="flex w-2/5 h-3/5 p-2 rounded-lg  shadow-md "
      >
        <CardBody>
          <div></div>
          <div className="flex w-full space-x-4 h-full">
            <div className="w-1/2 flex flex-col h-full items-center justify-center">
              <Image src={IMAGES.Logo} className="size-32" />
              {isLogin === eFormType.LOGIN && (
                <LoginCard
                  changeTypeForm={() => setIsLogin(eFormType.REGISTER)}
                />
              )}
              {isLogin === eFormType.REGISTER && (
                <RegisterCard
                  changeFormType={() => setIsLogin(eFormType.LOGIN)}
                />
              )}
            </div>
            {/* Image Login */}
            <div className="w-1/2 h-full">
              <div className="w-full h-full flex justify-center items-center">
                <Image src={IMAGES.LoginScreen}></Image>
              </div>
            </div>
          </div>
        </CardBody>
        {/* card */}
      </Card>
    </React.Fragment>
  );
};
