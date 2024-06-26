import { create } from "zustand";

type AuthStore = {
  apiKey: string;
  name: string;
  address: string;
  storeName: string;
  setStoreName: (storeName: string) => void;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setApiKey: (apiKey: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  apiKey: "",
  name: "",
  storeName: "",
  address: "",
  setStoreName: (storeName) => set({ storeName }),
  setName: (name) => set({ name }),
  setAddress: (address) => set({ address }),
  setApiKey: (apiKey) => set({ apiKey }),
}));
