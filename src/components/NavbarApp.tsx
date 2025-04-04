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
      <Navbar isBordered classNames={{ wrapper: "max-w-full" }}>
        <NavbarBrand>
          <div>
            <Image src={IMAGES["Logo"]} className="size-20" />
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button radius="sm" variant="bordered" color="secondary">
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
