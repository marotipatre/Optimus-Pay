"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import Navbar from "../_components/Navbar";
import { TurnkeySigner } from "@turnkey/ethers";
import {
  ECDSAProvider,
  convertEthersSignerToAccountSigner,
} from "@zerodev/sdk";
import axios from "axios";
import {
  TurnkeyGetWalletAddressRequestSchema,
  TurnkeyGetWalletAddressResponseSchema,
} from "../api/turnkey/walletAddress/types";
import { Fingerprint, Loader } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "../_components/ui/button";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "../_components/ui/form";
import createPasskeyAccount from "@/lib/functions/create-passkey";
import { AuthStore, useAuthStore } from "@/store/zustand";
import { getTurnkeyHttpClient } from "@/config/turnkey-client";
import { useStore } from "zustand";
import { isHex } from "viem";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Invalid name" })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: "Name must not contain spaces or special symbols",
    }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [name, setName] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("name");
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (activeTab === "name") {
      toast.success("Domain created successfully");
      setActiveTab("authenticate");
      setName(values.name + ".opti");
    }
    if (activeTab === "authenticate") {
      handleCreatePasskeyAccount();
    }
  }

  const { setDomain, setOrganizationId, setWalletAddress, setAaAddress } =
    useStore(useAuthStore, (state) => state) as AuthStore;

  const handleCreatePasskeyAccount = async () => {
    setIsLoading(true);
    try {
      const { authContext } = await createPasskeyAccount(name);
      console.log(authContext, "Auth Context");
      const turnkeySigner = new TurnkeySigner({
        client: getTurnkeyHttpClient(window.location.hostname),
        organizationId: authContext.organizationId,
        signWith: authContext.walletAddress,
      });
      toast.success("Created local passkey account");

      const zerodevSigner = await ECDSAProvider.init({
        projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT ?? "",
        owner: convertEthersSignerToAccountSigner(turnkeySigner),
      });

      const address = await zerodevSigner.getAddress();

      setDomain(name);
      setOrganizationId(authContext.organizationId);
      setWalletAddress(authContext.walletAddress);
      setAaAddress(address);

      toast.success("Domain configured successfully");

      toast.info("Redirecting to dashboard");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Passkey account");
    }
    setIsLoading(false);
  };

  const handleSignin = async () => {
    setIsLoading(true);

    try {
      // Turnkey API: `/public/v1/query/whoami`
      const turnkeyClient = getTurnkeyHttpClient(window.location.hostname);

      const { organizationId, organizationName, userId } =
        await turnkeyClient.getWhoami({
          organizationId: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID ?? "",
        });

      if (!organizationId || !organizationName || !userId)
        throw new Error("Invalid whoami response");

      // Fetch wallet id & address via api route to prevent 3x Passkey-signing
      const res = await axios.post<TurnkeyGetWalletAddressResponseSchema>(
        "/api/turnkey/walletAddress",
        { organizationId } satisfies TurnkeyGetWalletAddressRequestSchema
      );
      const { walletAddress } = res.data;
      if (!isHex(walletAddress)) throw new Error("Invalid wallet address");

      const domain = organizationName;
      setDomain(domain);
      setOrganizationId(organizationId);
      setWalletAddress(walletAddress);

      toast.success("Successfully authenticated, setting up your wallet…");
      const turnkeySigner = new TurnkeySigner({
        client: getTurnkeyHttpClient(window.location.hostname),
        organizationId,
        signWith: walletAddress,
      });

      const zerodevSigner = await ECDSAProvider.init({
        projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT ?? "",
        owner: convertEthersSignerToAccountSigner(turnkeySigner),
      });

      const address = await zerodevSigner.getAddress();
      setAaAddress(address);

      toast.success(`Successfully authenticated, redirecting…`);
      //   // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error while signing-in:", error);
      toast.error(`Couldn't sign-in, try a different Passkey`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
 
      <div className="h-[100vh] mx-auto w-fit flex flex-col items-center gap-10 pt-[5%]">
      <Navbar show={false} />
        <div>
          <Tabs defaultValue={"name"} value={activeTab} className="w-[35vw]">
            <TabsList className="w-full justify-start my-2 py-2">
              <TabsTrigger
                value="name"
                onClick={() => setActiveTab("name")}
                className="w-1/2 py-3"
              >
                1. Select name
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setActiveTab("authenticate")}
                value="authenticate"
                className="w-1/2 py-3"
                disabled={isDisabled}
              >
                2. Authenticate
              </TabsTrigger>
            </TabsList>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="pt-2 pb-6 px-4 bg-bg-2-60 bg-white bg-opacity-10 backdrop-blur-md drop-shadow-lg relative rounded-xl">
                  <TabsContent value="name" className="">
                    <h2 className="text-xl font-semibold">Select a name</h2>
                    <p className="text-sm py-2 font-light">
                      Create a name for your wallet. This will be used to as a
                      Smart Account for your wallet.
                    </p>
                    <br />
                    <h2 className="text-md font-light pb-2">Wallet Name:</h2>
                    <div className="flex">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex w-full text-black items-center border-none h-fit">
                            <FormControl>
                              <Input
                                type="name"
                                placeholder="Name"
                                {...field}
                                className="rounded-r-none text-black border-none bg-theme-200-30 text-theme-300 placeholder:text-black h-9 w-full"
                              />
                            </FormControl>
                            <FormDescription />
                          </FormItem>
                        )}
                      />
                      <span className="rounded-r-md border h-7 py-2  px-4 text-bg-1">
                        .Opti
                      </span>
                    </div>
                    {/* already taken */}
                    <p>{true ? "" : ""}</p>
                    <br />
                    <button
                      className="w-full border py-4 rounded-full bg-light-grad text-bg-1"
                      type="submit"
                    >
                      Select Your Domain
                    </button>
                  </TabsContent>
                  <TabsContent value="authenticate" className="">
                    <h2 className="text-xl font-semibold">
                      Authenticate Domain
                    </h2>
                    <p className="text-sm py-4 font-light">
                      Your bio-metric passkey will grant you access to your
                      brand new Smart Wallet.
                    </p>

                    <Button
                      className="w-full rounded-full bg-light-grad text-bg-1"
                      type="submit"
                    >
                      <Fingerprint className="mr-4" size={20} />
                      Authenticate
                      <Loader
                        className={`self-end animate-spin ease-in-out ml-2 ${isLoading ? "" : "hidden"}`}
                        size={20}
                      />
                    </Button>
                  </TabsContent>
                </div>
              </form>
            </Form>
          </Tabs>
        </div>
        {activeTab === "authenticate" ? (
          ""
        ) : (
          <div className="flex justify-between items-center gap-24 p-1.5 border-theme-400 border px-3 bg-bg-2-60 bg-white bg-opacity-10 backdrop-blur-md font-thin drop-shadow-lg relative rounded-full">
            <p>Already have an account?</p>
            <Button
              onClick={handleSignin}
              className="rounded-3xl bg-light-grad text-bg-1 font-medium px-5 py-1.5"
            >
              Sign In
              <Loader
                className={`self-end animate-spin ease-in-out ml-2 ${isLoading ? "" : "hidden"}`}
                size={20}
              />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
