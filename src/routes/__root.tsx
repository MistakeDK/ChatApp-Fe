import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <TanStackRouterDevtools position="bottom-right" />
      <div className="w-screen h-screen dark text-foreground bg-background overflow-hidden">
        <Outlet />
      </div>
    </React.Fragment>
  );
}
