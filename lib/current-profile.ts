'use server'

import { db } from "./db";
import { CreateProfile } from "./create-profile";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const currentProfile = async () => {
    const session = await auth();
    const email = <string>session?.user?.email;
    if(!session?.user) { 
        return new NextResponse("Unauthorized", { status:400 });
    };

    const user = await db.user.findUnique({
        where: {
            email,
        }
    })
    
    console.log(user?.email);
    return user as any;
}