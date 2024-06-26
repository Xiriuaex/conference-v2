 
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./middleware"; 
import { currentRooms } from "./lib/current-user-room";
export { auth } from "@/auth"
    
export const middleware = async (request: Request) =>  {
    const session = await auth();
 
    if(session?.user && (request.url.includes("/login")||request.url.includes("/signup"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if(!session?.user && !(request.url.includes("/login")||request.url.includes("/signup"))){
        return NextResponse.redirect(new URL("/Denied", request.url));
    }
    
}

export const config = {   
    matcher: ["/login", "/signup", "/user", "/user/:id*", "/room/:id*", "/meeting/:id*"] 
}