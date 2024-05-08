import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
 
import { v4 as uuidv4 } from "uuid";


//Create a Room:
export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        }
 
        const member = await db.member.findUnique({
            where: {
                profileId: profile?.id
            }
        })

        if(!member) {
            await db.member.create({
                data: {
                    profileId: profile.id
                }
            })
         }
        const room = await db.room.create({
            data: {
                name,
                imageUrl,
                inviteCode: uuidv4(), 
                members: {
                    connect: { 
                            profileId: profile.id,
                            role: "ADMIN"
                    }
                }
            }
        })

        return NextResponse.json(room);
        
    
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

//Get all The Rooms:
export async function GET(res: Response) {
    try {
        const profile = await currentProfile();
 
        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        } 

        const room = await db.room.findMany({
          where: {
            members: {
              some: {
                profileId: profile?.id
              }
            }
          },
          select: { 
            id: true,
            name: true, 
            inviteCode: true,
            members: {  
                select: {
                    role: true
                },
                where: {
                    profileId: profile?.id,
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