'use client'

import CreateRoomForm from "@/components/forms/create-room-form";
import JoinRoomForm from "@/components/forms/join-room-form";
import MyRooms from "@/components/my-rooms";
import useUser from "@/hooks/useUser";


import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const UserHome = (params: { userId: string }) => { 
//
  return (
    <div className="relative"> 
      <div className="flex-center pt-28">
        <div className='grid grid-rows-[1fr_4fr] w-[45vw] h-[50vh] my-5 text-white'>
          <div className='grid grid-cols-2'>
            <div className="m-2">
                <CreateRoomForm />
            </div>
            <div className='m-2 flex-center'>
              <JoinRoomForm />
            </div>
          </div> 
            <MyRooms/>  
        </div>  
      </div>
    </div>
  )
}

export default UserHome
