import CryptoJS from "crypto-js";
import { getEnv } from "./getEnv";
import { eEnvKey } from "@/config/enum";
export const encrypt = (data: any): string => {
  const secretKey = getEnv(eEnvKey.ENCRYPT_KEY);
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decrypt = (encryptedData: string): any => {
  try {
    const secretKey = getEnv(eEnvKey.ENCRYPT_KEY);
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
