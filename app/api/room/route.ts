
import { currentProfile } from "@/lib/current-profile"; 
import { db } from "@/lib/db";   
import { NextRequest, NextResponse } from "next/server";
 
import { v4 as uuidv4 } from "uuid";

//Get all The Rooms:
export async function GET(res: NextResponse) {
    try {
        const profile = await currentProfile();
 
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
            admin: true,
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
};

//Create a Room:
export async function POST(req: NextRequest) {
    try {
        const { name, description } = await req.json();
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        }

        const room = await db.room.create({
            data: {
                name,
                description,
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
};

//Join/update room:
export async function PUT(req: NextRequest, res:NextResponse) {

    const {searchParams} = new URL(req.url);
    const updateType = searchParams.get('update');
    
    if (updateType === "join-room") {
        try {
            const { InviteCode } = await req.json();
            const profile = await currentProfile();

              if (!profile) {
                return new NextResponse("Unauthorized", { status: 400 });
            }
            
            const roomJoined = await db.room.update({
                where: {
                    inviteCode: InviteCode
                },
                data: {
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
            return new NextResponse("Internal Error", { status: 500 });
        }
        
    } else if (updateType === "update-details") {
        
        try {
            const { id, Name, Description } = await req.json();
            
            const profile = await currentProfile();
            
            if (!profile) {
                console.log("Err")
                return new NextResponse("Unauthorized", { status: 400 });
            }

            await db.room.update({
                where: {
                    id
                },
                data: {
                    name: Name,
                    description: Description,
                }
            });
    
            return NextResponse.json({ message: "Room details updated", status: 200 });

         } catch (error) {
            console.log("[SERVERS_COULDN'T_PUT]", error);
            return NextResponse.json({ message: "Internal Error", status: 500 });
        }
    } else {
        return new NextResponse("Invalid update type", { status: 400 });
    }
};

//Delete A room:
export async function DELETE(req: NextRequest) {
    try {
        const {id} = await req.json();  
        if(!id) {
            return NextResponse.json({message: "ID not found!"}, {status: 404})
        }  

        await db.room.delete({
            where: {
                id
            }
        });
            
        return NextResponse.json({message: "room deleted successfully!", status: 400})

    } catch (error) {
        console.log("[SERVERS_COULDN'T_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

