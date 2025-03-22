import { decrypt, encrypt } from "@/util/encrypt";

export const encryptedStorage = {
  getItem: (name: string) => {
    const storedData = localStorage.getItem(name as string);
    return storedData ? decrypt(storedData) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name as string, encrypt(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name as string);
  },
};
