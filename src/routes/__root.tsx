import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="w-screen h-screen overflow-hidden">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </React.Fragment>
  );
}
