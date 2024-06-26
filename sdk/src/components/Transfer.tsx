import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
  fetchBalance,
} from "wagmi/actions";
import { parseEther } from "viem";
import OptiToken from "../constant/OptiTokenABI.json";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import ProfilePic from "../assets/codeZero.png";
import { ConnectKitButton } from "connectkit";
import { useAuthStore } from "../store/zustand";

type TransferProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: `0x${string}` | any;
  amount: string;
  productId: string;
  setState: React.Dispatch<
    React.SetStateAction<"connect" | "transfer" | "success">
  >;
};

export const Transfer = ({
  amount,
  from,
  setState,
  productId,
}: TransferProps) => {
  const [transfer, setTransfer] = useState(false);
  const { isConnected } = useAccount();

  const [optiBalance, setOptiBalance] = useState<string>("0");

  useEffect(() => {
    if (!isConnected) {
      setState("connect");
    }
  }, [isConnected]);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await fetchBalance({
        address: from,
        token: OptiToken.address as `0x${string}`,
      });
      setOptiBalance(balance.formatted);
    };

    getBalance();
  }, [from]);

  const { name, address } = useAuthStore();

  const handleClick = async () => {
    if (amount === "0") {
      toast.error("Please enter a valid amount");
      return;
    }
    setTransfer(true);

    const { request } = await prepareWriteContract({
      address: OptiToken.address as `0x${string}`,
      abi: OptiToken.abi,
      functionName: "transfer",
      args: [address, parseEther(amount)],
    });
    const { hash: uploadyERC } = await writeContract(request);
    toast.loading("Waiting for confirmation", {
      id: "loading",
    });
    await waitForTransaction({ hash: uploadyERC })
      .then(() => {
        toast.dismiss("loading");
        toast.success("Transaction confirmed");
        console.log("transaction confirmed");
        setTransfer(false);
        setState("success");
        console.log(productId);
      })
      .catch((error) => {
        toast.dismiss("loading");
        toast.error("Something went wrong, please try again");
        setTransfer(false);
        console.log("error", error);
      });

    setTransfer(false);
  };

  return (
    <div className="flex flex-col font-sora  justify-center items-center w-full text-[#DBD2EF] antialiased">
      <img
        src={ProfilePic}
        className="h-[5.5rem] w-[5.5rem] rounded-full object-fill shadow-md border  border-[#ffffff60]  "
      />
      <h1 className="text-lg font-normal my-2">You are Paying</h1>
      <h2 className="text-lg font-normal bg-white bg-opacity-10 backdrop-blur-md px-3 py-1.5 rounded-lg">
        {name}
      </h2>
      <h2 className="text-xl font-medium pb-4 mt-4">{amount} OPTI</h2>
      <span className="w-full h-[1px] bg-[#ffffff60]" />
      <div className="flex justify-center items-center my-3 space-x-2 px-2 border rounded-lg border-[#ffffff60]">
        <h2 className=" text-lg font-regular border-r px-3 py-1 border-[#ffffff60]">
          {optiBalance} OPTI
        </h2>

        <ConnectKitButton.Custom>
          {({ show, truncatedAddress, ensName }) => {
            return (
              <button onClick={show} className="text-lg px-2 ">
                {ensName ?? truncatedAddress}
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      </div>

      {transfer ? (
        <div className="flex items-center justify-center space-x-2 repeat-infinite skew-y-10 h-12">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={`h-3 w-3 bg-[#fcfaff] rounded-full transition delay-[${
                i * 100
              }] animate-bounce-2 translate-y-96  mr-1`}
            />
          ))}
        </div>
      ) : (
        <button
          type="submit"
          className="border py-1.5 w-3/4 flex h-12 items-center justify-center bg-[#d0bdfa] text-black font-medium rounded-xl  shadow-xl"
          onClick={handleClick}
        >
          Confirm
        </button>
      )}
    </div>
  );
};
