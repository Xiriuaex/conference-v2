// @ts-nocheck

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import React from 'react'

import {  columns } from "@/components/data-for-lists/data-list"
import { DataTable } from "./data-table"

const MyRooms = async () => { 
  const profile = await currentProfile();

  const getRoom = await db.room.findMany({
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
      members: {
        select: {
          role: true,
        }
      }
    } 
  })

  return (
    <div className='w-[45vw] h-[50vh] rounded-xl my-5'>
       <DataTable columns={columns} data={getRoom} />
    </div>
  )
}

export default MyRooms
