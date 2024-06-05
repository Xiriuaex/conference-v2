'use server'

import { db } from "./db";

import { auth } from "@/auth"; 

export const currentProfile = async () => {
    const session = await auth();
    const email = <string>session?.user?.email;
    let user = null;
    if(!session?.user) {  
        console.log("from current profile server")
        return user as any;
    };

    user = await db.user.findUnique({
        where: {
            email,
        }
    });
    
    return user as any;
}