import clientPromise from "@/lib/mongodb";
import { protectedRoute } from '@/lib/utils';

export async function POST (req) {
    try{
    const client= await clientPromise
    const db=client.db("trimmurl")
    const collection=db.collection("url")
    const user = await protectedRoute();
    const userUrl=await collection.find({username: user.username}).toArray()
    return Response.json(userUrl);
    }catch(err){
        console.log("Error in auth database route:", err);  
        return Response.json([]);
    }
}