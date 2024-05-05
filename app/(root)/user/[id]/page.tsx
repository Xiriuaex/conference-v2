'use client'

import CreateRoomForm from "@/components/forms/create-room-form"
import MyRooms from "@/components/my-rooms"
import { Button } from "@/components/ui/button"
import { SignOutButton, SignedIn } from "@clerk/nextjs"
import { useState } from "react"

const UserHome = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex-center flex-col">
      <div>
        <Button className="bg-dark-3 hover:bg-dark-4 text-white text-2xl transition-all rounded-lg" onClick={() => setOpenDialog(!openDialog)}>
          +
        </Button>
        {
          openDialog ? 
            <CreateRoomForm />
            :
            <MyRooms />
        }
      </div> 
    
      <SignedIn>
        <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-800">
          <SignOutButton />
        </Button>
      </SignedIn>
      
    </div>

  )
}

export default UserHome
