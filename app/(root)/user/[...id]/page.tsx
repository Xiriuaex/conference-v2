'use client'

import CreateRoomForm from "@/components/forms/create-room-form"
import MyRooms from "@/components/my-rooms"
import { Button } from "@/components/ui/button"
import { SignOutButton, SignedIn } from "@clerk/nextjs"
import { useState } from "react"

const UserHome = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
  <div className="flex-center">
    <div className='grid grid-rows-[1fr_4fr] w-[45vw] h-[50vh] my-5 text-white'>
      <div className='grid grid-cols-2'>
        <div className='flex-center flex-col'>
          <Button className="bg-dark-3 hover:bg-dark-4 text-white text-2xl transition-all rounded-lg" onClick={() => setOpenDialog(!openDialog)}>
              +
          </Button>
          {
            openDialog ? 
              <CreateRoomForm />
              :
              <div></div>
          }
        </div>
        <div className='flex-center'>
          Join a Room
        </div>
      </div> 
        <MyRooms /> 
      
      <SignedIn>
          <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-800">
            <SignOutButton />
          </Button>
      </SignedIn>
    </div>  
  </div>
   
      

  )
}

export default UserHome
