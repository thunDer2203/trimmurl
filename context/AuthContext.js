"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([])

  useEffect(() => { 
    async function fetchUser() {
      const res = await fetch("/api/auth", { method: "POST" });
      const data = await res.json();
      console.log("Fetched user:", data);
      setUser(data?.user || "");
      setLoading(false);
    }
    fetchUser();
  }, []);    
  
  
   useEffect(() => {
    if (!user) return;

    async function fetchUrls() {
      try {
        const res = await fetch("/api/auth/database", { method: "POST" });
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setUserData([]);
      }
    }

    fetchUrls();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
