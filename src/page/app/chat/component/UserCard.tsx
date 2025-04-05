import { IUserSearch } from "@/services/user/user.interface";
import { Avatar, Card, CardBody } from "@heroui/react";
import React from "react";

interface IProps {
  userInfo: IUserSearch;
}

export const UserCard = ({ userInfo }: IProps) => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="flex w-full items-center space-x-3">
            <Avatar />
            <span>{userInfo.name}</span>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
