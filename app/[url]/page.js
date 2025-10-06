import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {

    const client= await clientPromise
    const db=client.db("trimmurl")
    const collection=db.collection("url")
    const { url } = await params

    const doc=await collection.findOne(({shorturl: url}))
    if(doc){
        redirect (doc.url)
    }else
    {
        redirect(`{NEXT_PUBLIC_HOST}`)
    }
  return <div>My Post: {url}</div>
}