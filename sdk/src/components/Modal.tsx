import { ConnectKitButton } from "connectkit";
import { Transfer } from "./Transfer";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import ModalBG from "../assets/modalBG.png";
import Close from "../assets/close.svg";

const Modal = ({
  open,
  setOpen,
  amount,
  productId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  productId: string;
}) => {
  const { isConnected, address } = useAccount();

  const [state, setState] = useState<"connect" | "transfer" | "success">(
    "connect"
  );

  const getModalContent = (modalType: string) => {
    switch (modalType) {
      case "connect":
        return {
          title: "Connect to a wallet",
          body: (
            <div className="flex flex-col justify-center items-center text-lg h-full py-5 space-y-5 font-sora">
              <button
                onClick={() => {
                  console.log("coming soon");
                }}
                className="bg-[#DBD2EF] text-[#0D0229] font-semibold rounded-xl px-3 py-2 w-[60%] hover:scale-[0.98] transition-transform duration-300 ease-in-out mt-5 "
              >
                Login (Passkey)
              </button>

              <h2 className="font-semibold">OR</h2>

              <ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress, ensName }) => {
                  return (
                    <button
                      onClick={show}
                      className="bg-[#DBD2EF] text-[#0D0229] font-semibold rounded-xl px-3 py-2 w-[60%] hover:scale-[0.98] transition-transform duration-300 ease-in-out  "
                    >
                      {isConnected
                        ? ensName ?? truncatedAddress
                        : "Connect Wallet"}
                    </button>
                  );
                }}
              </ConnectKitButton.Custom>
            </div>
          ),
        };

      case "transfer":
        return {
          title: "Pay in OPTI",
          body: (
            <Transfer
              from={address}
              amount={amount}
              setState={setState}
              productId={productId}
            />
          ),
        };
      case "success":
        return {
          title: "Success!",
          body: (
            <div className="font-sora flex flex-col justify-center items-center text-center space-y-4">
              <h2 className="text-lg font-semibold ">
                You have successfully transferred {amount} OPTI
              </h2>
              <h2>
                Check your transaction here{' '}
                <a
                  href={`https://optimism-sepolia.blockscout.com/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  Click here
                </a>
              </h2>
              <h2 className="px-5">
                Now, chill out and get ready for your product to arrive real
                soon. Cheers to hassle-free transactions and happy deliveries!
              </h2>
            </div>
          ),
        };
    }
  };

  useEffect(() => {
    if (isConnected) {
      setState("transfer");
    } else {
      setState("connect");
    }
  }, [isConnected]);

  return (
    <div
      className={`antialiased z-50 absolute top-0 right-0 flex w-screen h-screen overflow-hidden  bg-black/35 modalBG ${open ? "" : "hidden"
        } backdrop-blur-sm justify-center items-center`}
    >
      <div className="flex relative rounded-xl justify-center w-[85%] aspect-video min-h-fit items-center ">
        <img
          src={ModalBG}
          alt="bg-gradient"
          className="absolute w-[1000px] h-[1000px]"
          aria-disabled
        />
        <div
          className="z-[70] md:w-[30%] min-w-[35%] min-h-[60%] max-h-[68%] mt-10 bg-white border-[0.1px] border-[#ffffff38]  bg-opacity-0 backdrop-blur-xl drop-shadow-2xl relative rounded-xl antialiased
        flex flex-col justify-start space-y-6 w-full items-center text-[#DBD2EF] py-5"
        >
          <button
            className="absolute top-3 right-3"
            onClick={() => {
              setOpen(false);
            }}
          >
            <img src={Close} alt="close" className="w-[15px] h-[15px]" />
          </button>
          <h1 className="text-3xl font-semibold font-sora">
            {getModalContent(state)!.title}
          </h1>
          <div className="w-full">{getModalContent(state)!.body}</div>
        </div>

        <div className="absolute bottom-0 w-full px-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Modal;
