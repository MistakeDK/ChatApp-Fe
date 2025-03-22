import { eEnvKey, eLocalKey } from "@/config/enum";
import { getEnv } from "@/util/getEnv";
import Cryptr from "cryptr";
import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: eLocalKey,
  defaultValue?: T,
  isEncrypt = true
) => {
  const keyDecrypt = getEnv(eEnvKey.ENCRYPT_KEY);
  const cryptr = new Cryptr(keyDecrypt);
  const [data, setData] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return isEncrypt
          ? JSON.parse(cryptr.decrypt(storedValue))
          : JSON.parse(storedValue);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return defaultValue ?? null;
  });

  useEffect(() => {
    try {
      const valueToStore = isEncrypt
        ? cryptr.encrypt(JSON.stringify(data))
        : JSON.stringify(data);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, data, isEncrypt]);

  return [data, setData] as const;
};
