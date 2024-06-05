'use server'

import { db } from "./db"; 
import { auth } from "@/auth";
import { NextResponse } from "next/server";
export const currentRoom = async () => {
    const session = await auth();
    const email = <string>session?.user?.email; 

    if(!session?.user) { 
        return new NextResponse("Unauthorized", { status:400 });
    };

    const room = await db.room.findMany({
        where: {
            user: {
                some: {
                    email
                }
            }
        },
    });


    return room as any;
}