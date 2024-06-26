"use client";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./wagmi.config";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import { AuthStore, useAuthStore } from "@/store/zustand";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();


  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default Provider;
