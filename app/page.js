"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";  

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
  if(!loading && user){
    router.replace("/home");
  }
}, [user, loading]);


  return (
    <div>
      {user ? (
        <h1 className="text-3xl font-bold text-center mt-12">
          Welcome, {user}!
        </h1>
      ) : (
        <div>
          <main className="bg-cyan-200">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className={`text-3xl font-bold `}>
            The best personal URL shortener in the Market
          </p>
          <p className=" text-center">
            We are the most straightfoward URL Shortener in the world. Most of the url shorteners will track you. We understand your needs and hence we have created this URL shortener
          </p>
          <div className='flex gap-3 justify-start'>
          <Link href="/signin"><button className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 font-bold text-white cursor-pointer'>Login/SignUp</button></Link>
          <Link href="https://github.com/thunDer2203"><button className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 font-bold text-white cursor-pointer'>GitHub</button></Link>
        </div>
        </div>
        <div className=" flex justify-start relative">
          <Image className="mix-blend-darken" alt="an Image of a vector" src={"/vector.jpg"} fill={true}    />
        </div>

      </section>

    </main>
        </div>
      )}
    </div>
  );
}
