'use server'

import { currentUser } from "@clerk/nextjs";
import { db } from "./db"; 


export const roomIdMember = async () => {

    const user = await currentUser();

    if(!user) {
        return null;
    }

    const memberRoomId = await db.member.findUnique({
        where: {
            id: user.id
        },
        include: {
            rooms: {
                select: {
                    id: true
                }
            }
        },
    }); 

    console.log(memberRoomId);
    return memberRoomId;
}