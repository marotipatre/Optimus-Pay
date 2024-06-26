"use client" 
import Intro from "./_components/Intro";
import Features from "./_components/Features";
import StayProductive from "./_components/StayProductive";
import Testimonials from "./_components/Testimonials";
import EarlyAccess from "./_components/EarlyAccess";
import Footer from "./_components/Footer";
import Link from "next/link";
import { useStore } from "zustand";
import { useAuthStore, AuthStore } from "@/store/zustand";

export default function Home() {
  const { domain } = useStore(useAuthStore, (state) => state) as AuthStore;
  return (
    <>
      <div className="fylo">
        <Intro />
      </div>
      <Features />
      <StayProductive />
      
      <EarlyAccess />
      <Footer />
    </>
  );
}
