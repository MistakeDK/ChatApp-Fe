// socket.ts
import { io } from "socket.io-client";
import { getEnv } from "@/util/getEnv";
import { eEnvKey } from "@/config/enum";

const socket = io(getEnv(eEnvKey.SOCKET_URL), {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
