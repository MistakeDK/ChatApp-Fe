import { eEnvKey } from "@/config/enum";

export const getEnv = (key: eEnvKey): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not defined`);
    return "";
  }
  return value;
};
