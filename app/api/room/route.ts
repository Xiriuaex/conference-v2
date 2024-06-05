

import { auth } from "@/auth";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db"; 
import { NextResponse } from "next/server";
 
import { v4 as uuidv4 } from "uuid";

interface typeRoom {
    id?: string;
    name?: string;
    imageUrl?: string;
    inviteCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }


//Create a Room:
export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await <typeRoom>currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        }

        const room = await db.room.create({
            data: {
                name,
                imageUrl,
                inviteCode: uuidv4(),
                admin: profile.name, 
                user: {
                    connect: {  
                        id:profile.id,
                    }
                }
            }
        });  

        return NextResponse.json(room);
        
    
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

//Get all The Rooms:
export async function GET(res: Response) {
    try {
        const profile = await <typeRoom>currentProfile();
 
        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        } 

        const room = await db.room.findMany({
          where: {
            user: {
              some: {
                id: profile.id,
              }
            }
          },
          select: { 
            id: true,
            name: true, 
            inviteCode: true,
            user: {  
                select: {
                    id: true
                },
                where: {
                    id: profile?.id,
                  },
            },
          }, 
        });

        return NextResponse.json(room);

    } catch (error) {
        console.log("[SERVERS_COULDN'T_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

//Join a Room:
export async function PUT(req: Request) {
    try {
        const { InviteCode } = await req.json();
        const profile = await <typeRoom>currentProfile();
 
        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        } 

        
        const roomJoined = await db.room.update({
            where: {
                inviteCode: InviteCode
            },
            data: {
                admin: '', 
                user: {
                    connectOrCreate: { 
                        where: {
                            id: profile.id,
                        },
                        create: {
                            id: profile.id,
                        },
                    }
                }
            }
        });

        return NextResponse.json(roomJoined);

    } catch (error) {
        console.log("[SERVERS_COULDN'T_PUT]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}