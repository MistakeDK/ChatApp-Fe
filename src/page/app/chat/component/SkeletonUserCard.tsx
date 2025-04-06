import { log } from "@/util/logger";
import { Card, CardBody, Avatar, Skeleton } from "@heroui/react";
import React from "react";

interface IProps {
  numberLoop: number;
}

export const SkeletonUserCard = ({ numberLoop }: IProps) => {
  log(numberLoop);
  return (
    <React.Fragment>
      {[...Array(numberLoop)].map((_, index) => (
        <Card key={`${index} skeleton`}>
          <CardBody>
            <div className="flex w-full items-center space-x-3">
              <Skeleton className="flex items-center space-x-3 rounded-full">
                <Avatar radius="full" />
              </Skeleton>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 w-3/5" />
              </Skeleton>
            </div>
          </CardBody>
        </Card>
      ))}
    </React.Fragment>
  );
};
