import { SpinLoadingApp } from "@/components/SpinLoadingApp";
import { getMeApi } from "@/services/auth/auth";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import React, { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, idUser, setUserInfo } = useAuthStore();
  const router = useRouter();

  const { isError, isLoading, isSuccess, data } = useQuery({
    queryKey: ["userInfo", idUser],
    queryFn: () =>
      getMeApi({
        pathVariable: {
          id: idUser as string,
        },
      }),
    enabled: !!idUser,
    retry: false,
  });

  useEffect(() => {
    if (!isAuthenticated || isError) {
      router.navigate({
        to: "/login",
      });
      return;
    }
    if (isSuccess) {
      setUserInfo(data.message);
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated || isLoading) {
    return <SpinLoadingApp />;
  }

  return <>{children}</>;
};
