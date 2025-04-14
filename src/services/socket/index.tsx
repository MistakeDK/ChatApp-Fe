import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import socket from "./socket";

interface IMessageReceive {
  conversationId: string;
  sender: string;
  content: string;
  receiver: string;
}

export const WebSocketApp = () => {
  const { idUser, accessToken } = useAuthStore();

  useEffect(() => {
    socket.auth = { token: accessToken };
    socket.connect();

    socket.emit("storeIdUser", { id: idUser });

    socket.on("receiveMessage", (message: IMessageReceive) => {
      console.log("message", message);
    });

    return () => {
      socket.disconnect();
    };
  }, [idUser, accessToken]);

  return null;
};
