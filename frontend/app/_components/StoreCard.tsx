import React from "react";
import Link from "next/link";
import Image from "next/image";

const StoreCard = ({
  name,
  desc,
  slug,
}: {
  name: string;
  desc: string;
  slug: string;
}) => {
  const imgs = ["/store1.jpg", "/store2.jpg", "/store3.jpg"];
  function randomImg() {
    return imgs[Math.floor(Math.random() * imgs.length)];
  }
  return (
    <div className="w-full flex gap-10 py-8">
      <div className="w-[20.5rem] h-[10rem]  flex justify-end rounded-xl relative border border-theme-400">
        <Image
          src={randomImg()}
          alt="Store Image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl brightness-75"
        />
        <div className="w-4/6 py-2 pr-2 flex flex-col justify-center gap-2 relative z-10">
          <h2 className="text-lg font-semibold">{name}</h2>

          <p className="text-sm font-extralight line-clamp-2">{desc}</p>
          <Link
            href={`/store/${slug}`}
            className="bg-light-grad text-bg-1 text-center font-medium py-1 rounded-full border text-zinc"
          >
            Review Store
          </Link>
        </div>
        <div className="absolute rounded-xl inset-0 bg-linear-grad pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StoreCard;
