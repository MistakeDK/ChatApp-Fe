import { IUserSearch } from "@/services/user/user.interface";
import { Avatar, Card, CardBody } from "@heroui/react";
import React from "react";

interface IProps {
  userInfo: IUserSearch;
}

export const UserCard = ({ userInfo }: IProps) => {
  return (
    <React.Fragment>
      <div className="w-full">
        <Card className="flex w-full">
          <CardBody>
            <div className="flex w-full items-center space-x-3">
              <Avatar />
              <span>{userInfo.name}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};
