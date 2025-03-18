import { eEnvKey } from "@/config/enum";
import { getEnv } from "@/util/getEnv";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: getEnv(eEnvKey.API_URL),
});
