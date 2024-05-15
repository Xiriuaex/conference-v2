'use client'

import CreateRoomForm from "@/components/forms/create-room-form";
import JoinRoomForm from "@/components/forms/join-room-form";

import MyRooms from "@/components/my-rooms"
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button"
import { SignOutButton, SignedIn } from "@clerk/nextjs"
import { useState } from "react"

const UserHome = () => { 

  return (
  <div className="relative">
    <Navbar />
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
          <MyRooms /> 
        
        <SignedIn>
            <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-800">
              <SignOutButton />
            </Button>
        </SignedIn>
      </div>  
    </div>
  </div>

  )
}

export default UserHome
