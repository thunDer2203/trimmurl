"use client";

import Image from "next/image";
import logo from "@/public/OIP-removebg-preview.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, setUser } = useAuth();
  if (loading) return null;

  const isActive = (href) => pathname === href;

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      setUser(null);              
      router.replace("/");  
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  return (
    <nav className="bg-cyan-900 flex h-14 justify-between p-3">
      <Link href="/" className="flex text-white gap-2 text-2xl">
        <div>trimUrl</div>
        <Image src={logo} width={40} height={50} alt="Logo" />
      </Link>

      <ul className="flex gap-3 items-center text-white p-2">
        {user && (
          <>
            <Link
              href="/home"
              className={isActive("/home") ? "bg-cyan-800 p-4" : ""}
            >
              <li>Home</li>
            </Link>

            <Link
              href="/shorten"
              className={isActive("/shorten") ? "bg-cyan-800 p-4" : ""}
            >
              <li>Shorten</li>
            </Link>
          </>
        )}

        <Link href="https://github.com/thunDer2203">
          <button className="rounded-lg bg-cyan-800 p-1 hover:cursor-pointer">GitHub</button>
        </Link>

        {user && (
          <button
            onClick={handleSignOut}
            className="rounded-lg bg-cyan-800 p-1 hover:cursor-pointer"
          >
            Sign Out
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
