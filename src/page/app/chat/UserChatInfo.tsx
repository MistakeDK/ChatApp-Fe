import { useChatStore } from "@/store/chat.store";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export const UserChatInfo = () => {
  const { chatName } = useChatStore();
  return (
    <React.Fragment>
      <div className="flex flex-col w-full h-full bg-slate-600 space-y-2 rounded-lg">
        <Card
          radius="none"
          classNames={{
            base: "rounded-t-lg",
          }}
        >
          <CardBody>
            <div className="flex flex-col justify-center items-center w-full h-full space-y-2">
              <Avatar size="lg" />
              <span className="text-xl">{chatName}</span>
              <Button title="block" radius="full" size="sm" isIconOnly>
                <Icon icon="material-symbols:block" width="24" height="24" />
              </Button>
            </div>
          </CardBody>
        </Card>

        <Listbox className="p-2">
          <ListboxItem>
            <div className="w-full flex justify-between">
              <span>Search message</span>
              <Icon
                icon="material-symbols-light:search"
                width="24"
                height="24"
              />
            </div>
          </ListboxItem>
          <ListboxItem>
            <div className="w-full flex justify-between">
              <span>Image</span>
              <Icon icon="material-symbols:image" width="24" height="24" />
            </div>
          </ListboxItem>
        </Listbox>
      </div>
    </React.Fragment>
  );
};
