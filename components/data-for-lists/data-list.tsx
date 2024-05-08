'use client'

import { ColumnDef } from "@tanstack/react-table";
 
export type RoomsListType = {
    id: string;
    name: string;
    role: 'ADMIN' | 'MEMBER'; 
    imageUrl?: string;
    inviteCode: string;
    createdAt?: Date;
    updatedAt?: Date;
};
 