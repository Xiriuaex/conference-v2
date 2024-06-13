
 
import { currentProfile } from "@/lib/current-profile";
import { currentRoom } from "@/lib/current-room"; 
import { db } from "@/lib/db"; 
import { NextRequest, NextResponse } from "next/server";


//Get all The members:
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const id: string = url.searchParams.get('id') as string;
 
        const user = await currentProfile();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const room = await currentRoom(id);
        if (!room) {
            return new NextResponse("Room not found", { status: 404 });
        }
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
export async function DELETE(req: NextRequest) {
    try {
        const {userId, id} = await req.json();  
        if(!userId) {
            return NextResponse.json({message: "ID not found!"}, {status: 404})
        } 
        console.log(userId);
  
        await db.room.update({
            include: { user: true },
            where: {
              id
            },
            data: {
                user: {
                    disconnect:{
                        id: userId
                    }, 
                }
            }
        });
        
        const member = await db.user.findMany({
            include: {
              room: true,
            },
            where: {
              room: {
                  some: {
                      id 
                  }
              }
            }
          });

        if(!member) {
            await db.room.delete({
                where: {
                    id
                }
            })
            return NextResponse.redirect(new URL(`/user/${userId}`, req.url));
        }

        return NextResponse.redirect(new URL(`/room/${id}`, req.url));

    } catch (error) {
        console.log("[SERVERS_COULDN'T_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

//make admin:
export async function PUT(req: NextRequest) {
    try {
        const {name, id} = await req.json();  
        if(!name) {
            return NextResponse.json({message: "Name not found!"}, {status: 404})
        } 
        console.log("name",name);
  
        await db.room.update({ 
            where: {
              id
            },
            data: {
                admin: name
            }
        });
        
        return NextResponse.json({message: "admin changed"});

    } catch (error) {
        console.log("[SERVERS_COULDN'T_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}


