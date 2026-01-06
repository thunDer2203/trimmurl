import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body=await request.json()
    // console.log("hello from server");
    const client= await clientPromise
    const db=client.db("trimmurl")
    const collection=db.collection("url")

    const doc = await collection.findOne({$and: [{shorturl:body.shorturl},{username:body.username}]})
    if(doc){
        return Response.json({success: false, error: true,  message: 'URL already exists!' })
    }

    console.log(body.username);
    const result= await collection.insertOne({
        url:body.url,
        shorturl: body.shorturl,
        username: body.username,
   
    })
    return Response.json({success:true , error:false, message:'URL generated'})
}