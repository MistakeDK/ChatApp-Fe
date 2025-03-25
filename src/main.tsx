import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "@/style/index.css";
import "@/style/app.css";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/toast";
import { ApiConfig } from "./services";
const router = createRouter({ routeTree });
const queryClient = new QueryClient();
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ApiConfig />
        <ToastProvider placement="top-right" />
        <RouterProvider router={router} />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
