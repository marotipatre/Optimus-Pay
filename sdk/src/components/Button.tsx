"use client";
import React, { useState } from "react";
import Modal from "./Modal";

type CheckoutButtonProps = {
  amount: string;
  productId: string;
} & React.ComponentProps<"button">;

export const Button = ({
  amount,
  productId,
  children,
  ...rest
}: CheckoutButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        {...rest}
        onClick={() => {
          setOpen(true);
        }}
        className="h-14 mt-3 px-6 py-2 font-semibold rounded-xl bg-red-600 hover:bg-red-500 text-white"
      >
        Using Optimus Pay
      </button>
      <Modal
        open={open}
        setOpen={setOpen}
        amount={amount}
        productId={productId}
      />
    </>
  );
};
