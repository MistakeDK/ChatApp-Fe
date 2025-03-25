import { ProtectedRoute } from "@/context/authContext";
import { ChatLayout } from "@/layout/ChatLayout";
import { ChatBox } from "@/page/app/chat/ChatBox";
import { SideChat } from "@/page/app/chat/SideChat";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/home")({
  component: () => {
    return (
      <ProtectedRoute>
        <RouteComponent></RouteComponent>
      </ProtectedRoute>
    );
  },
});

function RouteComponent() {
  return (
    <React.Fragment>
      <ChatLayout>
        <div className="flex w-full h-full">
          <div className="flex w-1/5 h-full">
            {/* Side chat */}
            <SideChat />
          </div>
          <div className="flex w-4/5 h-full">
            {/* Chat Box */}
            <ChatBox />
          </div>
        </div>
      </ChatLayout>
    </React.Fragment>
  );
}
