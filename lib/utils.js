import jwt from 'jsonwebtoken';
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export const generateToken = (userId,res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // console.log(token);
    return token;
}


export async function protectedRoute() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("No token");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const client = await clientPromise;
  const db = client.db("trimmurl");
  const collection = db.collection("User");

  const user = await collection.findOne({
    _id: new ObjectId(decoded.id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
