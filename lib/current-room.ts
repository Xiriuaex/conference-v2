'use server'

import { auth } from "@/auth";
import { db } from "./db";
import { NextResponse } from "next/server";
import { roomType } from "@/components/data-for-lists/data-list";

export const currentRoom = async(id: string): Promise<roomType | any> => {

    const session = await auth(); 

    if(!session?.user) {
        return NextResponse.json({message: "No user Found", status:403});
    }

    const room = await db.room.findUnique({
        where: {
            id: id as string
        }, 
    });
    return room as roomType | any;
}
