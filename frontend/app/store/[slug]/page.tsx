"use client";

import SalesTable from "@/app/_components/SalesTable";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Slider } from "@/app/_components/ui/slider";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import OptiToken from "../../_constant/OptiTokenAbi.json";
import {
  // prepareWriteContract,
  // waitForTransaction,
  // writeContract,
  fetchBalance,
} from "wagmi/actions";
import React, { useEffect } from "react";
import { useAuthStore, AuthStore } from "@/store/zustand";
import { Store, ClipboardCopy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { toast } from "sonner";
import Navbar from "@/app/_components/Navbar";
const Shop = ({ params }: { params: { slug: string } }) => {
  const { domain, aaAddress } = useStore(
    useAuthStore,
    (state) => state
  ) as AuthStore;
  const topStores = ["shoes.opti", "stickers.opti"];
  const [storeData, setStoreData] = React.useState<{
    name: string;
    desc: string;
    owner: string;
    slug: string;
    sales: string;
  }>();

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!params.slug) return;
    setLoading(true);
    const fetchStores = () => {
      const stores = JSON.parse(localStorage.getItem("stores")) || [];
      const foundStore = stores.find((store) => store.slug === params.slug);

      setStoreData(foundStore);
    };
    fetchStores();
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader2 className="w-10 h-10 text-theme-300 animate-spin ease-in-out" />
      </div>
    );
  }

  const calStoreApi = ({
    name,
    slug,
    address,
  }: {
    name: string;
    slug: string;
    address: string;
  }) => {
    const apiKey = window.btoa(JSON.stringify({ name, slug, address }));
    console.log(apiKey);
    return apiKey;
  };
  const [optiBalance, setOptiBalance] = React.useState("0");
  useEffect(() => {
    if (!aaAddress) return;
    const getBalance = async () => {
      const balance = await fetchBalance({
        address: aaAddress as `0x${string}`,
        token: OptiToken.address,
      });
      console.log(balance, "Balance");
      setOptiBalance(balance.formatted);
    };

    getBalance();
  }, [aaAddress]);
  return (
    <>
      <div className="w-10/12 m-auto py-6 flex flex-col gap-6">
        <div className="flex items-center text-xl font-bold">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={"../images/logo.png"}
            alt="Rounded avatar"
          />
          Optimus Pay{" "}
        </div>
        <div className="flex justify-between flex-col relative h-fit px-6 py-5">
          <Link
            href={"/store"}
            className="flex h-fit rounded-full z-10 px-6 py-1 bg-light-grad text-bg-1 "
          >
            <Store className="w-5 h-5 mr-2" />
            Back to store
          </Link>
          <div className="z-10 mt-10 w-8/12 gap-4 flex flex-col justify-center border px-8 py-4 rounded-md">
            <h2 className="text-4xl font-semibold">
              {storeData?.name ?? "The Shoe King"}
            </h2>
            <p className="text-xl font-extralight">
              {storeData?.desc ??
                "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, tenetur pariatur non ea corrupti reiciendis quibusdam repellat voluptatum maxime, atque dolore sunt modi, impedit neque accusamus recusandae illum vitae."}
            </p>
            <div className="w-full rounded-xl flex flex-col gap-3 bg-bg-1 py-5">
              <h1 className="text-blue-400 text-3xl font-extrabold">
                Total Opti Balance: {optiBalance}
              </h1>
              <h4 className="text-xl font-medium">This Store API key</h4>
              <button
                className="flex text-md font-extralight py-1.5 bg-theme-200 rounded-full text-bg-1 px-2 truncate"
                onClick={() => {
                  navigator.clipboard.writeText(
                    calStoreApi({
                      name: storeData?.name!,
                      slug: storeData?.slug!,
                      address: storeData?.owner!,
                    })
                  );
                  toast.success("Copied to clipboard");
                }}
              >
                <h2 className="truncate bg-yellow-200 text-black px-2 rounded-md">
                  {calStoreApi({
                    name: storeData?.name!,
                    slug: storeData?.slug!,
                    address: storeData?.owner!,
                  }).slice(0, 10) +
                    "..." +
                    calStoreApi({
                      name: storeData?.name!,
                      slug: storeData?.slug!,
                      address: storeData?.owner!,
                    }).slice(-10)}
                </h2>

                <ClipboardCopy className="w-5 h-5 ml-2 mb-2" />
              </button>
              <h4 className="text-xl font-medium">Smart Account Address </h4>
              <button
                className="flex text-md font-extralight py-1.5 bg-theme-200 rounded-full text-bg-1 px-2 truncate"
                onClick={() => {
                  navigator.clipboard.writeText(
                    aaAddress
                  );
                  toast.success("Copied to clipboard");
                }}
              >
                <h2 className="truncate bg-green-200 text-black px-2 rounded-md">
                   {aaAddress.slice(0, 10) + "..." + aaAddress.slice(-10)}

                </h2>

                <ClipboardCopy className="w-5 h-5 ml-2 mb-2" />
              </button>
            </div>
          </div>
          <div className="absolute rounded-xl inset-0 bg-linear-grad pointer-events-none"></div>
        </div>
        {/* Transfer */}
        <div className="flex gap-4 w-full rounded-xl p-2 bg-bg-2">
          <div className="w-7/12 rounded-lg flex flex-col gap-3 bg-bg-1 py-5 px-4">
            <h2 className="text-xl font-semibold">Quick Transfer</h2>
            <Input
              placeholder="Type address or ens"
              className="rounded-full border-none text-lg font-thin py-2 bg-theme-200-30 text-theme-300 placeholder:text-theme-300 w-full"
            />
            <div className="flex gap-4 ">
              <div className="flex gap-4 flex-col items-center  flex-1">
                <Input
                  placeholder="Type GHO amount"
                  className="bg-theme-200-30 ring-none border-none text-theme-300 placeholder:text-theme-300 py-1 w-full rounded-full px-2"
                />
                <Slider
                  defaultValue={[33]}
                  max={100}
                  step={1}
                  className="bg-theme-200 rounded-full"
                />
                <div className="flex justify-between w-full">
                  <p>0%</p>
                  <p>25%</p>
                  <p>50%</p>
                  <p>75%</p>
                  <p>Max</p>
                </div>
              </div>
              <div className="w-fit gap-1 flex justify-between flex-col">
                <Button className="bg-light-grad w-full text-bg-1 rounded-full">
                  Send
                </Button>
                <p className="font-thin text-sm">Estimated deposit time</p>
                <p className="text-sm font-thin text-right">20 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
