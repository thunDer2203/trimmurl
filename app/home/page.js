"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";  

export default function Home() {
      const {user, loading,userData} = useAuth();
      const Router = useRouter();

      useEffect(() => {
        try{
        if (!loading && !user) {
          Router.replace("/login");
        }
      }catch(err){
        console.log("User not authenticated");
      }
      }, [user, loading]);
      
      
  return (
     <>
      {!user && <h1 className="text-3xl font-bold text-center position-relative top-10 p-4"></h1>}
      {user &&
      <>
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
          <Link href="/shorten"><button className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 font-bold text-white cursor-pointer'>Try Now</button></Link>
          <Link href="https://github.com/thunDer2203"><button className='bg-cyan-800 rounded-lg shadow-lg p-3 py-1 font-bold text-white cursor-pointer'>GitHub</button></Link>
        </div>
        </div>
        <div className=" flex justify-start relative">
          <Image className="mix-blend-darken" alt="an Image of a vector" src={"/vector.jpg"} fill={true}    />
        </div>

      </section>
        
    </main>
    <div className="font-bold text-2xl text-cyan-800 mx-auto text-center">Your Urls</div>
    <div className="flex flex-col">
      <div className="bg-cyan-200 w-8/10 mx-auto rounded-2xl">
        <div className="flex justify-around mx-auto bg-cyan-950 rounded-t-2xl">
          <h1 className="font-bold text-2xl text-cyan-100">Urls
          </h1>
          <h1 className="font-bold text-2xl text-cyan-100">Short Urls
          </h1>
        </div>
        {Array.isArray(userData) && 
        userData.map((item) => (
          <div key={item._id} className=" rounded-lg flex justify-around mx-10 my-2">
            <h2 className="font-bold text-xl w-1/2 overflow-hidden"><Link href={item.url} target="_blank" className="text-cyan-800 underline">{item.url}</Link></h2>
            <h2 className="font-bold text-xl w-1/2 overflow-hidden"><Link href={`${process.env.NEXT_PUBLIC_HOST}/${item.username}/${item.shorturl}`} target="_blank" className="text-cyan-800 underline">{`${process.env.NEXT_PUBLIC_HOST}/${item.username}/${item.shorturl}`}</Link></h2>
          </div>
        ))}
        </div>
        </div>
    </>
      }
      </>
  );
}