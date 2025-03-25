import { DefaultLayout } from "@/layout/DefaultLayout";
import { Auth } from "@/page/auth";
import { useAuthStore } from "@/store/auth.store";
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
        to: "/home",
      });
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full h-full">
      <DefaultLayout>
        <Auth></Auth>
      </DefaultLayout>
    </div>
  );
}
