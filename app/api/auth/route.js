import { protectedRoute } from '@/lib/utils';

export async function POST (req) {
    console.log("Auth route hit");
    try{
    const user = await protectedRoute();
    return Response.json({user:user.username});
    }catch(err){
        console.log("Error in auth route:", err);  
        return Response.json({user:null});
    }
}