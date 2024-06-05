

import { roomType, userType } from "@/components/data-for-lists/data-list";
import { currentProfile } from "@/lib/current-profile";
import { currentRoom } from "@/lib/current-room";
import { db } from "@/lib/db"; 
import { NextResponse } from "next/server";


//Get all The members:
export async function GET(res: Response) {
    try {
        const user: userType = await currentProfile();
        const room: roomType = await currentRoom();
        if(!user) {
            return new NextResponse("Unauthorized", { status:400 });
        } 

        const member = await db.user.findMany({
          include: {
            room: true,
          },
          where: {
            room: {
                some: {
                    id: room.id 
                }
            }
          }
        });

        return NextResponse.json(member);

    } catch (error) {
        console.log("[SERVERS_COULDN'T_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

//kick a member:
export async function DELETE(res: Response) {
    try {
        const user: userType = await currentProfile();
        const room: roomType = await currentRoom();
        if(!user) {
            return new NextResponse("Unauthorized", { status:400 });
        } 

        await db.room.update({
            where: {
                user: {
                    
                }
            }
        })

        return NextResponse.redirect(`/room/${room.id}`);

    } catch (error) {
        console.log("[SERVERS_COULDN'T_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

//Make admin: