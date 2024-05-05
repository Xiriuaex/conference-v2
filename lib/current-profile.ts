'use server'

import { auth, currentUser } from "@clerk/nextjs";

import { db } from "./db";
import { CreateProfile } from "./create-profile";

export const currentProfile = async () => {

    const  user = await  currentUser();

    if(!user) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user?.id
        }
    }); 

    if(!profile) { 
         CreateProfile(); 
         
    }

    return profile;
}