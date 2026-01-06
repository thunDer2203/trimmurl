import { cookies } from "next/headers";

export async function POST(request) {
    const cookieStore = await cookies();
            cookieStore.set("jwt"," ", {
                maxAge: 0,
            });
    return Response.json({message: "You have been signed out successfully"});
}