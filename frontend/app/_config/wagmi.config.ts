import { configureChains, createConfig } from "wagmi";
import { optimismSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const chains = [optimismSepolia];

export const {
  chains: chainsWithMainnet,
  publicClient,
  webSocketPublicClient,
} = configureChains([...chains], [publicProvider()]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
