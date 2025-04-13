import { IMAGES } from "@/config/constant";
import { logoutApi } from "@/services/auth/auth";
import { useAuthStore } from "@/store/auth.store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export const NavBarApp = () => {
  const { userInfo, logout } = useAuthStore();
  const logOutMutation = useMutation({
    mutationFn: () =>
      logoutApi({
        notifyConfig: {
          success: "Logout success",
          error: false,
        },
      }),
    onSuccess: () => {
      logout();
    },
    retry: false,
  });
  return (
    <React.Fragment>
      <Navbar classNames={{ wrapper: "max-w-full bg-blue-300 rounded-xl" }}>
        <NavbarBrand>
          <Image src={IMAGES["Logo"]} className="size-16 " />
        </NavbarBrand>
        <NavbarContent justify="end">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  radius="sm"
                  variant="solid"
                  startContent={
                    <Icon icon="solar:user-bold" width="24" height="24" />
                  }
                >
                  {userInfo?.name}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu>
              <DropdownItem
                onPress={() => {
                  logOutMutation.mutate();
                }}
                key={"logout"}
              >
                Log out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </React.Fragment>
  );
};
