import { ConnectKitProvider } from "connectkit";
import { createConfig, WagmiConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { optimismSepolia} from "wagmi/chains";
import { Toaster } from "sonner";
import { useAuthStore } from "../store/zustand";
import { useEffect } from "react";

const chains = [optimismSepolia];

export const Provider = ({
  children,
  walletConnectProjectId,
  alchemyId,
  apiKey,
}: {
  children: React.ReactNode;
  walletConnectProjectId: string;
  alchemyId: string;
  apiKey: string;
}) => {
  const { setApiKey, setName, setAddress, setStoreName } = useAuthStore();
  useEffect(() => {
    const name = JSON.parse(atob(apiKey)).name;
    const address = JSON.parse(atob(apiKey)).address;
    const storeName = JSON.parse(atob(apiKey)).storeName;
    setApiKey(apiKey);
    setStoreName(storeName);
    setName(name);
    setAddress(address);
  }, [apiKey]);

  const config = createConfig(
    getDefaultConfig({
      alchemyId,
      walletConnectProjectId,
      autoConnect: false,

      appName: "OPTI",
      appIcon: "https://family.co/logo.png",
      chains,
    })
  );

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <>
          {children}
          <Toaster richColors />
        </>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
