import { getWebAuthnAttestation } from "@turnkey/http";
import axios from "axios";
import { isHex } from "viem";

import getAccountFromAuthContext from "./get-account-from-auth";
import {
  TurnkeyCreateRequestSchema,
  TurnkeyCreateResponseSchema,
  turnkeyCreateResponseSchema,
} from "@/app/api/turnkey/create/types";
import { TurnkeyAuthContext } from "@/store/zustand";
import { SITE_METADATA } from "@/config/metadata";

const generateRandomBuffer = (): ArrayBuffer => {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return arr.buffer;
};

const base64UrlEncode = (challenge: ArrayBuffer): string => {
  return Buffer.from(challenge)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export default async function createPasskeyAccount(domain: string) {
  const challenge = generateRandomBuffer();
  const id = generateRandomBuffer();
  

  const attestation = await getWebAuthnAttestation({
    publicKey: {
      rp: {
        id: window.location.hostname,
        name: SITE_METADATA.title,
      },
      challenge,
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      user: { id, name: domain, displayName: domain },
    },
  });


  const response = await axios.post<TurnkeyCreateResponseSchema>(
    "/api/turnkey/create",
    {
      subOrgName: domain,
      attestation,
      challenge: base64UrlEncode(challenge),
    } satisfies TurnkeyCreateRequestSchema
  );

  const parsedResponse = turnkeyCreateResponseSchema.safeParse(response?.data);
  if (!parsedResponse.success) throw new Error("Invalid response from server");
  if (!isHex(parsedResponse.data.walletAddress))
    throw new Error("Invalid wallet address");

  const authContext: TurnkeyAuthContext = {
    organizationId: parsedResponse.data.organizationId,
    walletAddress: parsedResponse.data.walletAddress,
  };
  const account = await getAccountFromAuthContext(authContext);

  return { account, authContext };
}
