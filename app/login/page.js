"use client"
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/AuthContext";
import { set } from 'mongoose';


const page = () => {
    const [message, setmessage] = useState("")
    const {user,setUser} = useAuth();
    const router= useRouter();
    

    useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user,router]);


    async function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target); 
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        const res= await fetch('/api/auth/login',{
            method:'POST',
            headers:{   
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });

        const result=await res.json();  

        
            if(result.success ){
              setUser(result.username);
              router.push('/home');
            }
            else{
                setmessage(result.message);
            }
        }
  return (
    <div>
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col w-1/4 m-auto justify-items-center top-25 position: relative">
        <h1 className="text-center text-2xl font-bold p-2 bg-cyan-900 rounded-t-2xl text-white">Login</h1>
        <div className="flex flex-col  bg-cyan-200 rounded-b-2xl p-6">
        <label htmlFor="username" className=" font-medium text-cyan-900">Username</label>
        <input type="text" id="username" name="username" className="bg-cyan-50 mb-2 p-0.5 rounded-2xl"/>
        <label htmlFor="password" className=" font-medium text-cyan-900">Password</label>
        <input type="password" id="password" name="password" className="bg-cyan-50 mb-2 p-0.5 rounded-2xl"/>
        <div className='flex gap-1 mx-auto mt-4'>
        <button className="bg-cyan-800 text-white p-2 rounded-lg w-1/2  hover:bg-cyan-700 cursor-pointer">Login</button>
        <Link href="/signin" className="bg-cyan-800 text-white p-2 rounded-lg w-1/2 hover:bg-cyan-700"><button className='hover:cursor-pointer' >SignUp</button></Link>
        </div>
        <h1 className="text-red-500 items-center text-center text-l text-bold">{message}</h1>
        </div>
      </form>

    </div>
  )
}

export default page
