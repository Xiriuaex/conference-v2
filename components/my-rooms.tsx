// @ts-nocheck

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import React, { useEffect } from 'react'

import {  columns } from "@/components/data-for-lists/data-list"
import { DataTable } from "./data-table"

const MyRooms = async () => { 

  useEffect(() => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  })
 

  return (
    <div className='w-[45vw] h-[50vh] rounded-xl my-5'>
       <DataTable columns={columns} data={getRoom} />
    </div>
  )
}

export default MyRooms
