

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db"; 
import { NextResponse } from "next/server";


//Get all The members:
export async function GET(res: Response) {
    try {
        const profile = await currentProfile();
 
        if(!profile) {
            return new NextResponse("Unauthorized", { status:400 });
        } 

        const member = await db.member.findMany({
          where: {
            NOT: {
                profileId: profile.id
            }
          },
           
        });

        return NextResponse.json(member);

    } catch (error) {
        console.log("[SERVERS_COULDN'T_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

