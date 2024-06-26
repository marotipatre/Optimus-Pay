
import { Hex } from "viem";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TurnkeyAuthContext = {
  organizationId: string;
  walletAddress: Hex;
};

export type DomainContext = {
  domain: string;
  domainName: string;
  domainTld: string;
};

type TurnkeyStore = {
  authContext: TurnkeyAuthContext | null;
  setAuthContext: (authContext: TurnkeyAuthContext | null) => void;
};

type DomainStore = {
  domainContext: DomainContext | null;
  setDomainContext: (domainContext: DomainContext | null) => void;
};

export const useTurnkeyStore = create<TurnkeyStore>((set) => ({
  authContext: null,
  setAuthContext: (authContext: TurnkeyAuthContext | null) =>
    set({ authContext }),
}));

export const useDomainStore = create<DomainStore>((set) => ({
  domainContext: null,
  setDomainContext: (domainContext: DomainContext | null) =>
    set({ domainContext }),
}));

export type AuthStore = {
  organizationId: string;
  walletAddress: Hex | null;
  aaAddress: Hex | null;
  setAaAddress: (walletAddress: Hex | null) => void;

  domain: string;
  setDomain: (domain: string) => void;
  setOrganizationId: (organizationId: string) => void;
  setWalletAddress: (walletAddress: Hex | null) => void;
};

export const useAuthStore = create(
  persist(
    (set) => ({
      organizationId: "",
      walletAddress: null,
      domain: "",
      aaAddress: null,
      setAaAddress: (aaAddress: Hex | null) => set({ aaAddress }),
      setDomain: (domain: string) => set({ domain }),
      setOrganizationId: (organizationId: string) => set({ organizationId }),
      setWalletAddress: (walletAddress: Hex | null) => set({ walletAddress }),
    }),
    { name: "auth" }
  )
);
