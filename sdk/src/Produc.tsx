import React from "react";
import { Button } from "./components";

interface ProductProps {
  productName: string;
  price: number;
  image: string;
}

const Product: React.FC<ProductProps> = ({ productName, price, image }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="details flex flex-col py-8 justify-center items-center rounded-2xl w-96 h-fit m-24 border">
        <img
          src={image}
          className="pic w-52 hover:cursor-pointer hover:-translate-y-1 ease-in-out duration-200"
          alt={productName}
        />
        <div className="info text-center py-4">
          <b>{productName}</b>
          <p>Rs.{price}</p>
        </div>

        <div className="flex flex-col gap-4 py-2">
          <button className="btn px-8 py-1.5 flex mt-2 rounded-3xl  border-2 border-black text-white font-semibold hover:cursor-pointer bg-[#0c0c0ce5] hover:text-white">
            Buy now
          </button>
          <Button
            amount="1"
            productId=""
            className="bg-[#e85454] rounded-xl text-[#0D022] font-medium py-1.5 px-4"
          >
            Buy with OPTI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
