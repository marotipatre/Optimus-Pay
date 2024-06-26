"use client";
import React, { useEffect } from "react";
import { useAuthStore, AuthStore } from "@/store/zustand";
import { toast } from "sonner";
import {  ClipboardCopy } from "lucide-react";
import {
  // prepareWriteContract,
  // waitForTransaction,
  // writeContract,
  fetchBalance,
} from "wagmi/actions";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";
import OptiToken from "../_constant/OptiTokenAbi.json";
import Navbar from "../_components/Navbar";
import {useAccount} from "wagmi";
const page = () => {
  const { domain, aaAddress } = useStore(
    useAuthStore,
    (state) => state
  ) as AuthStore;

  const [optiBalance, setOptiBalance] = React.useState("0");
    const {address} = useAccount();
  useEffect(() => {
    if (!aaAddress) return;
    const getBalance = async () => {
      const balance = await fetchBalance({
        address: aaAddress as `0x${string}`,
        token: OptiToken.address,
      });
      console.log(balance,"Balance");
      setOptiBalance(balance.formatted);
    };

    getBalance();
  }, [aaAddress]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className=" text-white shadow  p-2 flex items-center justify-between border">
          <div className="flex items-center">
            <div className="flex items-center text-xl font-bold">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="images/logo.png"
                alt="Rounded avatar"
              />
              Optimus Pay{" "}
            </div>
            <div className="md:hidden flex items-center">
              <button id="menuBtn">
                <i className="fas fa-bars text-gray-500 text-lg"></i>
              </button>
            </div>
          </div>

          <div className="space-x-5">
            <button>
              <i className="fas fa-bell text-white text-lg"></i>
            </button>

            <button>
              <i className="fas fa-user text-white text-lg"></i>
            </button>
            <button className="text-teal-500 font-normal text-xl">
            <p className="text-lg ">
          {domain ? (
            <button
              className="flex items-center gap-2"
              onClick={() => {
                window.localStorage.removeItem("auth");
                window.location.replace("/auth");
              }}
            >
              <LogOutIcon size={22} />
              {domain}
            </button>
          ) : (
            <Link href="/auth">Get started</Link>
          )}
        </p>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-wrap border">
          <div
            className="p-2  w-full md:w-60 flex flex-col md:flex border"
            id="sideNav"
          >
            <nav>
              <a
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="#"
              >
                <i className="fas fa-home mr-2"></i>Home
              </a>
              <a
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="/store"
              >
                <i className="fas fa-file-alt mr-2"></i>Store
              </a>
              <a
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="/transfer"
              >
                <i className="fas fa-users mr-2"></i>Transfer
              </a>
              <a
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="/borrow"
              >
                <i className="fas fa-store mr-2"></i>Borrow
              </a>
              <a
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="/stake"
              >
                <i className="fas fa-exchange-alt mr-2"></i>Stake
              </a>
              <a
                className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                href="/p2p"
              >
                <i className="fas fa-exchange-alt mr-2"></i>P2P
              </a>
            </nav>

            <a
              className="block font-bold py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 text-white mt-auto"
              href="#"
            >
               <div className="flex items-center text-xl font-bold">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="images/logo.png"
                alt="Rounded avatar"
              />
              Optimus Pay{" "}
            </div>
            </a>

            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
          </div>

          <div className="flex-1 p-4 w-full md:w-1/2">
            <div className="relative max-w-md w-full">
              <h1 className="text-blue-400 text-3xl font-extrabold">
                Total Opti Balance: {optiBalance}
              </h1>
            </div>
            <button
                className="flex text-md font-extralight py-1.5 bg-theme-200 rounded-full text-bg-1 px-2 truncate"
                onClick={() => {
                  navigator.clipboard.writeText(
                    aaAddress
                  );
                  toast.success("Copied to clipboard");
                }}
              >
                <h2 className="truncate bg-yellow-200 text-black px-2 rounded-md">
                  Smart Account Address : {aaAddress.slice(0, 10) + "..." + aaAddress.slice(-10)}
                  {address}
                </h2>

                <ClipboardCopy className="w-5 h-5 ml-2 mb-2" />
              </button>

            <div className="mt-8  p-4 shadow rounded-lg">
              <h2 className="text-white text-lg font-semibold pb-4">
                Transaction History
              </h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      SNO
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      Account
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      Amount
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      TRXID
                    </th>

                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      Chain
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      Token Address
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-white border-b border-grey-light">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 border-grey-light mx-8 ">
                      <img
                        className="w-10 h-10 rounded-full border-white border"
                        src="https://s3.coinmarketcap.com/static-gravity/image/c18a828ad21e4661be37560bf93f64db.png"
                        alt="Rounded avatar"
                      />
                    </td>
                    <td className="py-2 mx-8   text-white ">Juan Pérez</td>
                    <td className="py-2 mx-8   text-white ">Comercio</td>
                    <td className="py-2 mx-8   text-white ">Juan Pérez</td>
                    <td className="py-2 mx-8  text-white ">Comercio</td>
                    <td className="py-2 mx-8   text-white ">Juan Pérez</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
