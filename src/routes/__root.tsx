import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="w-screen h-screen">
        <TanStackRouterDevtools />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
