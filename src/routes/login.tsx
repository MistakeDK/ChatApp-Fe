import { DefaultLayout } from "@/layout/DefaultLayout";
import { Login } from "@/page/Login";
import { getMeApi } from "@/services/auth/auth";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({
        to: "/",
      });
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full h-full">
      <DefaultLayout>
        <Login></Login>
      </DefaultLayout>
    </div>
  );
}
