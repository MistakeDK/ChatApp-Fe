import { ProtectedRoute } from "@/context/authContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <ProtectedRoute>
        <RouteComponent></RouteComponent>
      </ProtectedRoute>
    );
  },
});

function RouteComponent() {
  return <div></div>;
}
