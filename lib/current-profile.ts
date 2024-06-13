'use server'

import { userType } from "@/components/data-for-lists/data-list";
import { db } from "./db";

import { auth } from "@/auth";  

export const currentProfile = async () => {
    const session = await auth();
    const email = <string>session?.user?.email;
    try {
        if(!session?.user) {  
            console.log("from current profile server")
            return;
        } else {
            const user = await db.user.findUnique({
                where: {
                    email,
                }
            });
            
            return user as userType;
        }
    } catch (error) {
        console.log("Error fetching user!", error);
    }
    
}