"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const page = () => {
    const [message, setmessage] = useState("")
    async function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target); 
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email')
        };

        const res= await fetch('/api/auth/signup',{
            method:'POST',
            headers:{   
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });

        const result=await res.json();
        console.log(result);
            if(result.success){
                 window.location.href='/home';
            }
            else{
                setmessage(result.message);
            }
        }
  return (
    <div>
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col w-1/4 m-auto justify-items-center top-25 position: relative">
        <h1 className="text-center text-2xl font-bold p-2 bg-cyan-900 rounded-t-2xl text-white">SignUp</h1>
        <div className="flex flex-col  bg-cyan-200 rounded-b-2xl p-6">
        <label htmlFor="username" className=" font-medium text-cyan-900">Username</label>
        <input type="text" id="username" name="username" className="bg-cyan-50 mb-2 p-0.5 rounded-2xl"/>
        <label htmlFor="password" className=" font-medium text-cyan-900">Password</label>
        <input type="password" id="password" name="password" className="bg-cyan-50 mb-2 p-0.5 rounded-2xl"/>
        <label htmlFor="email" className=" font-medium text-cyan-900">Email</label>
        <input type="email" id="email" name="email" className="bg-cyan-50 mb-2 p-0.5 rounded-2xl"/>
        <div className='flex gap-1 mx-auto mt-4'>
        <button className="bg-cyan-800 text-white p-2 rounded-lg w-1/2  hover:bg-cyan-700 cursor-pointer">SignUp</button>
        <Link href="/login" className="bg-cyan-800 text-white p-2 rounded-lg w-1/2 hover:bg-cyan-700"><button className='hover:cursor-pointer' >Login</button></Link>
        </div>
        <h1 className="text-red-500 items-center text-center text-l text-bold">{message}</h1>
        </div>
      </form>

    </div>
  )
}

export default page
