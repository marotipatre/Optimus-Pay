import React, { useEffect } from "react";
import SingleProduct from "./components/SingleProduct";
import {useParams} from "react-router-dom";
import { products } from "./products";
import { useAuthStore } from "./store/zustand";
const SingleProductPage = () => {
  const { name, address } = useAuthStore();
  const params = useParams();
  const [singleProduct, setSingleProduct] = React.useState({});
  useEffect(() => {
    console.log(params.id);
    const foundProduct = products.find((product) => product.id === params.id);
    setSingleProduct(foundProduct);
  },[params.id]);
  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-[100vh]">
        <SingleProduct data={singleProduct} company={name} />
      </div>
    </>
  );
};

export default SingleProductPage;
