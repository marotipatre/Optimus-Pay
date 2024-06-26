"use client";
import Image from "next/image";
import React from "react";
import { TurnkeySigner } from "@turnkey/ethers";
import OptiToken from "../_constant/OptiTokenAbi.json";
import {
  ECDSAProvider,
  convertEthersSignerToAccountSigner,
} from "@zerodev/sdk";
import { AuthStore, useAuthStore } from "@/store/zustand";
import { getTurnkeyHttpClient } from "@/config/turnkey-client";
import { useStore } from "zustand";
import { toast } from "sonner";
import { encodeFunctionData, parseEther, Hex } from "viem";

const Transfer = () => {
  const [sendGho, setSendGho] = React.useState();
  const [senderAddress, setSenderAddress] = React.useState("");

  const { organizationId, walletAddress } = useStore(
    useAuthStore,
    (state) => state
  ) as AuthStore;

  const handleTransfer = async () => {
    if (!senderAddress || !sendGho) {
      toast.error("Please fill all fields");
      return;
    }

    let toastID = toast.loading("Transfering OPTI...");

    const turnkeySigner = new TurnkeySigner({
      client: getTurnkeyHttpClient(window.location.hostname),
      organizationId,
      signWith: walletAddress!,
    });

    const zerodevSigner = await ECDSAProvider.init({
      projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT ?? "",
      owner: convertEthersSignerToAccountSigner(turnkeySigner),
    });

    const { hash } = await zerodevSigner.sendUserOperation({
      target: OptiToken.address as Hex,
      data: encodeFunctionData({
        abi: OptiToken.abi,
        functionName: "transfer",
        args: [senderAddress, parseEther(sendGho)],
      }),
    });
    console.log(hash);

    setTimeout(() => {
      toast.success("OPTI Transfered Successfully", { id: toastID });
      setSendGho("");
      setSenderAddress("");
    }, 1000);
  };

  return (
    <div className="w-10/12 m-auto px-10 h-[100vh]">
      <div className="flex items-center text-xl font-bold mt-10">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={"../images/logo.png"}
            alt="Rounded avatar"
          />
          Optimus Pay Transfer
        </div>
      <div className=" min-h-[70vh] mt-5 m-auto flex flex-col justify-center items-center">
        <div className="flex justify-center items-center h-full">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-6 p-6  bg-bg-2 rounded-xl ">
              <h3 className="text-2xl ">
                <span className="font-semibold">Transfer OPTI</span> instantly
                to your Address with{" "}
                <span className="font-semibold">Zero fees</span>
              </h3>
              <div className="gap-6  w-full flex ">
                <input
                  type="text"
                  placeholder="Type receiver ens or EOA address"
                  value={senderAddress}
                  name="senderAddress"
                  onChange={(e) => setSenderAddress(e.target.value)}
                  className="bg-black px-3 py-3 ring-none w-full  text-white placeholder:text-gray-400 border rounded-md"
                />
              </div>
              <div className="gap-6  w-full flex ">
                <input
                  placeholder="Type OPTI amount"
                  value={sendGho}
                  type="number"
                  name="sendGho"
                  onChange={(e) => setSendGho(e.target.value)}
                  className="bg-black px-3 py-3 ring-none w-full  text-white placeholder:text-gray-400 border rounded-md"
                />
              </div>
              <div className="w-full gap-1 flex justify-between flex-col">
                <button
                  className="px-4 py-3 text-bg-1 bg-blue-400 rounded-md"
                  onClick={handleTransfer}
                >
                  Send
                </button>
                <code className="font-thin text-sm mx-2 mt-2 text-gray-400">
                  Estimated deposit time 0 seconds
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
