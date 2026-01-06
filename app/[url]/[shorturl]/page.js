import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
    const client= await clientPromise
    const db=client.db("trimmurl")
    const collection=db.collection("url")
    const { url,shorturl } = await params
    console.log("entered redirect page");
    const doc=await collection.findOne({$and:[{shorturl: shorturl},{username: url}]})
    if(doc){
        redirect (doc.url)
    }else
    {
        return Response.json({message: "No URL found"})
    }
  return <div>My Post: {url}</div>
}