import { DefaultLayout } from "@/layout/DefaultLayout";
import { Login } from "@/page/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full">
      <DefaultLayout>
        <Login></Login>
      </DefaultLayout>
    </div>
  );
}
