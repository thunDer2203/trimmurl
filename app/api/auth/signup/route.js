import clientPromise from "@/lib/mongodb";
// import User from "@/models/user";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";


export async function POST(request) {
    const body=await request.json()
    console.log("hello from server");
    const client= await clientPromise
    const db=client.db("trimmurl")
    const collection=db.collection("User")
    try{
        let password=body.password;
        let email=body.email;
        let username=body.username;
    
        if(!email || !password || !username){
            return Response.json({message: "Email, password and username are required"});
        } 
        if(password.length < 6){
            return Response.json({message: "Password must be at least 6 characters long"});
        }   


        const doc = await collection.findOne({$or:[{email:email}, {username:username}]})
    if(doc){
        return Response.json({success: false, error: true,  message: 'User already exists!' })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const newUser={
        email:email,
        password: hashedPassword,
        username: username
    }
    
    if(newUser){
        await collection.insertOne(newUser);
        const token = generateToken(newUser._id);
        console.log(username);
const cookieStore = await cookies();
  cookieStore.set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });


    
    return Response.json({success: true, message: "User signed up successfully"});


    }
    else{
        return Response.json({message: "Error signing up user"});         
    }
}catch(error){
    return Response.json({message: "Error signing up user", error: error.message});         
}
}