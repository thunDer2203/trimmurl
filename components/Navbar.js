"use client"

import React from 'react'
import Image from 'next/image'
import logo from "@/public/OIP-removebg-preview.png"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {

const pathname = usePathname(); // Get the current route

  const isActive = (href) => pathname === href;

  return (
    <nav className='bg-cyan-900 flex h-14 justify-between   p-3'>
        <Link href='/' className='logo flex text-white gap-2 text-2xl '>
            <div>trimUrl</div>
        <Image src={logo} width={40}
      height={50} className='' alt="Logo of a Scissor" />
        </Link>
   <ul className='flex gap-3 justify-center items-center text-white p-2'>
    <Link className={isActive('/') ? ' bg-cyan-800 p-4' : ''} href='/'><li>Home</li></Link>
    <Link href='/' className={isActive('/contact') ? ' bg-cyan-800 p-4' : ''}><li>Contact Us</li></Link>
    <Link href='/' className={isActive('/about') ? ' bg-cyan-800 p-4' : ''}><li>About</li></Link>
    <Link href='/shorten' className={isActive('/shorten') ? ' bg-cyan-800 p-4' : ''}><li>Shorten</li></Link>
    <li className='flex gap-2'>
        <Link href='/shorten'><button className='rounded-lg bg-cyan-800 shadow-lg p-1 cursor-pointer'>Try Now</button></Link>
        <Link href='https://github.com/thunDer2203'><button className='rounded-lg bg-cyan-800 shadow-lg p-1 cursor-pointer'>GitHub</button></Link>
    </li>
   </ul>
   </nav>
  )
}

export default Navbar
