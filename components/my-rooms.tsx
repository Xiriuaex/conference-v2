'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { roomType, userType } from "@/components/data-for-lists/data-list"
import Loader from './Loader'
import { Button } from './ui/button';
import { currentProfile } from '@/lib/current-profile'; 
import useUser from '@/hooks/useUser';
import { Pencil, Search, Settings, Trash2 } from 'lucide-react';

const MyRooms = () => { 

  
  const {user} = useUser();
  const [isLoading, setLoading] = useState(true);
  const [getRoom, setGetRoom] = useState<roomType[]>([]);

  const router = useRouter();
  

  useEffect(() => {
    const handleGetRoom = async () => {
      try {
        await axios.get('/api/room')
                    .then((res) => 
                      {
                        setGetRoom(res.data)
                        setLoading(false)
                    }
                  ); 
      } catch (error) {
        console.log(error);
      }
    }

    handleGetRoom();
    
  }, []);

  const handleDelete = (id: string) => {

  };

  const handleEdit = (id: string) => {

  }


  
  const handleRouteToRoom = async (roomId: string) => {
    const profile = await currentProfile(); 
    try {
      if(profile){
        router.push(`/room/${roomId}`);
      }     
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className='bg-dark-3 grid grid-row-[1fr_5fr]'>
      <div className='bg-dark-2 font-semibold rounded-xl m-4 p-2 grid grid-cols-[1fr_.1fr]'>
        <div><h1 className='uppercase pl-5'>My rooms</h1></div>
        <div><Search /></div>
      </div>

      <div className='bg-dark-2 flex flex-col rounded-xl mx-4 mb-4 overflow-auto h-[40vh]'>
        { isLoading ? <Loader /> :
          (getRoom.length !== 0) ?
          getRoom.map((getRoom: roomType) => (
            <Button className='bg-dark-1 grid grid-cols-[1fr_2fr_1fr] p-2 m-2 rounded-xl hover:bg-dark-4' onClick={() => handleRouteToRoom(getRoom.id)}>
                <div className='flex justify-start px-2'>
                  <h1>{getRoom?.name}</h1>
                </div>
                <div className='flex justify-start'>
                  <h1>{getRoom?.inviteCode}</h1>
                </div>
                <div className='flex justify-center'> 
                  {(getRoom.admin === user?.name) ? (
                    <h1>Admin</h1>
                  ):
                    <h1>Member</h1>
                  }
                 
                </div>
                <div>
                {(getRoom.admin === user?.name) ?
                  <DropdownMenu>
                    <DropdownMenuTrigger className='focus:outline-none'><Settings /></DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-dark-1 text-white text-2xl'>
                      <DropdownMenuLabel>Room Settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className='flex flex-col items-start justify-center'>
                        <Button className='hover:bg-dark-4 grid grid-cols-[.3fr_1fr] w-[20vw]' onClick={()=>handleDelete(getRoom.id)}><Trash2 /><h1>Delete</h1></Button>
                        <Button className='hover:bg-dark-4 grid grid-cols-[.3fr_1fr] w-[20vw]' onClick={()=>handleEdit(getRoom.id)}><Pencil /><h1>Edit</h1></Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  :
                  <></>
                }
                </div>
            </Button>
          )) : 
          <div>You are not a member of any room</div>
        }
        
      </div>
    </div>
  )
}

export default MyRooms
