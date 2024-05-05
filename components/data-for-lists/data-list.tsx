'use client'

import { ColumnDef } from "@tanstack/react-table";
 
export type RoomsListType = {
    room_id: string;
    name: string;
    role: "ADMIN" | "MEMBER";
    id?: string; 
    imageUrl?: string;
    inviteCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export const columns: ColumnDef<RoomsListType>[] = [
    {
        accessorKey: "room_id",
        header: "Room ID",
      },
      {
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "Role",
        header: "Role",
      },
    
]