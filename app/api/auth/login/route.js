import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";

export async function POST(request) {

    const body=await request.json()
    // console.log("hello from server");
    const client= await clientPromise
    const db=client.db("trimmurl")
    const collection=db.collection("User")
    // console.log(body);
    const username=body.username
    const password=body.password
    if(!username || !password){
        return Response.json({message: "Username and password are required"});
    } 
    try{
        const doc = await collection.findOne({username})
        if(!doc){
            console.log(username);
            return Response.json({success: false, error: true,  message: 'Invalid Credentials' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, doc.password)

        if(!isPasswordCorrect){
            return Response.json({success: false, error: true,  message: 'Invalid Credentials' })
        }
        const token = generateToken(doc._id);

        const cookieStore = await cookies();
        cookieStore.set("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
        });

        return Response.json({success: true, message: "User logged in successfully", username: doc.username});
    }
    

    catch(error){
        return Response.json({message: "Error logging in user", error: error.message});         
    }
}