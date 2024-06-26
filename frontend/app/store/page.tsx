"use client";

import React, { useEffect } from "react";
import StoreCard from "../_components/StoreCard";
import Image from "next/image";
import { Input } from "../_components/ui/input";
import { Check, ImagePlus } from "lucide-react";
import { Textarea } from "../_components/ui/textarea";
import { Button } from "../_components/ui/button";
import axios from "axios";
import { useStore } from "zustand";
import { AuthStore, useAuthStore } from "@/store/zustand";
import { toast } from "sonner";
import Navbar from "../_components/Navbar";

const Store = () => {
  const { aaAddress } = useStore(useAuthStore, (state) => state) as AuthStore;

  const [storeName, setStoreName] = React.useState("");
  const [storeDesc, setStoreDesc] = React.useState("");

  const [storeData, setStoreData] = React.useState<
    {
      name: string;
      desc: string;
      owner: string;
      slug: string;
      sales: string;
    }[]
  >([]);

  const handleCreateStore = async () => {
    if (!storeName || !storeDesc) {
      toast.error("Please fill all fields");
      return;
    }
    const existingStores = JSON.parse(localStorage.getItem('stores')) || [];
    const newStore = {
      owner: aaAddress,
      name: storeName,
      desc: storeDesc,
      slug: storeName.toLowerCase().replace(/\s/g, "-"),
    };
    existingStores.push(newStore);
    localStorage.setItem('stores', JSON.stringify(existingStores));

    console.log('Updated stores array:', existingStores);
    toast.success("Store created successfully");


    // await axios
    //   .post("/api/store/addShop", {
    //     owner: aaAddress,
    //     name: storeName,
    //     desc: storeDesc,
    //     slug: storeName.toLowerCase().replace(/\s/g, "-"),
    //   })
    //   .then((res) => {
    //     if (res.data?.message === "Success") {
    //       toast.success("Store created successfully");
    //       setStoreName("");
    //       setStoreDesc("");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Something went wrong");
    //     console.log(err);
    //     setStoreName("");
    //     setStoreDesc("");
    //   });
    const getStores = JSON.parse(localStorage.getItem('stores')) || [];
    setStoreData(getStores);
  };

  useEffect(() => {
    if (!aaAddress) return;


    const fetchStores = async () => {
      const existingStores = JSON.parse(localStorage.getItem('stores')) || [];
      setStoreData(existingStores);
    //   await axios
    //     .post(`/api/store/fetchShop/`, {
    //       owner: aaAddress,
    //     })
    //     .then((res) => {
    //       console.log(res.data?.data);
    //       setStoreData(res.data?.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    };
    fetchStores();
  }, [aaAddress]);

  return (
    <>
      <div className="w-max-screen px-20 m-auto">
        <Navbar show={false} />
        {storeData.length > 0 ? (
          <div className="py-2 mt-8 border px-10">
            <h2 className="text-3xl font-semibold">Your Stores </h2>
            <div className="grid grid-cols-3">
              {storeData.map(({ name, desc, slug, sales }, index) => (
                <StoreCard key={index} name={name} desc={desc} slug={slug} />
              ))}
            </div>
          </div>
        ) : (
          <h2 className="h-20 m-auto pt-5 text-left text-red-500 mt-2">No stores created</h2>
        )}
        <div className="flex py-6 w-[100%]">
          <div className="w-full ml-auto text-lg font-thin flex flex-col gap-6 border px-10 py-4">
            <h2 className="text-3xl font-semibold">Store creator</h2>
            <div className="bg-bg-2 font-extralight relative py-5 rounded-2xl px-4">
              <p>
                Open your{" "}
                <span className="font-bold text-green-500">Store</span>
              </p>
              <p>
                Manage your{" "}
                <span className="font-bold text-green-500">Products</span>
              </p>
              <p>
                Get paid instantly in{" "}
                <span className="font-bold text-green-500">Opti Tokens</span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Type your store name</h2>
              <div className="flex items-center px-2 rounded-full h-9">
                <Input
                  type="name"
                  placeholder="Name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="rounded-full rounded-r-none border-none h-full bg-theme-200-30 text-black placeholder:text-black w-full"
                />
                <Check className="rounded-full rounded-l-none h-full flex items-center justify-center w-16 py-1 text-bg-1 bg-theme-200" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">
                Add details to your store
              </h2>
              <div className="w-full flex justify-center items-center  gap-5">
                <div className="relative flex justify-center items-center w-5/12 h-40 border border-theme-400 rounded-xl">
                  <div className="absolute flex flex-col gap-2 justify-center items-center w-11/12 h-5/6 rounded-xl bg-bg-1-60 text-theme-300 placeholder:text-theme-300 cursor-pointer">
                    <ImagePlus
                      strokeWidth={2}
                      className="w-10 h-10 text-theme-200"
                    />
                    <Input
                      id="picture"
                      className="border-none ring-none"
                      type="file"
                    />
                  </div>
                </div>
                <Textarea
                  onChange={(e) => setStoreDesc(e.target.value)}
                  placeholder="Type your store description"
                  className=" border-none resize-none rounded-xl h-full text-md bg-theme-200-30 text-black placeholder:text-black w-full"
                />
              </div>
              <div className="w-full  flex py-1.5 px-3 rounded-full bg-dark-grad">
                <Button
                  className="w-fit ml-auto text-bg-1 rounded-full px-8 bg-theme-200 hover:bg-theme-200"
                  onClick={handleCreateStore}
                >
                  Create Your store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
