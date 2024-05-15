'use server'

import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db"; 
import { currentProfile } from "./current-profile";


export const CurrentMember = async () => {

    const user = await currentUser();

    if( !user ){ 
        return redirectToSignIn();
    };

    const profile = await currentProfile();
    
    const member = await db.member.findUnique({
        where: {
            profileId: profile?.id,
        },
        select: {
            profileId: true,
            rooms: {
                select: {
                    id: true
                }
            }
        }
    })
    

    if(!member) {
        const newMember = await db.member.create({
            data: {
                profileId: profile?.id!, 
            },
            select: {
                profileId: true,
                rooms: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return newMember;
    }
    return member;
}