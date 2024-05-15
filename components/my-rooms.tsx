'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {  RoomsListType } from "@/components/data-for-lists/data-list"
import Loader from './Loader'
import { Button } from './ui/button';
import { currentProfile } from '@/lib/current-profile';

const MyRooms = () => { 

  const [isLoading, setLoading] = useState(true);
  const [getRoom, setGetRoom] = useState<RoomsListType[]>([]);

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
 
  if (isLoading) return <Loader />
 
  return (
    <div className='bg-dark-3 grid grid-row-[1fr_5fr] my-6'>
      <div className='bg-dark-2 rounded-xl my-4 mx-4 flex justify-evenly items-center p-2'>
        <div>
          Admin/Member
        </div>
        <div>
          Search
        </div>
      </div>

      <div className='bg-dark-2 flex-center flex-col rounded-xl mx-4 mb-4 overflow-auto'>
        {
          (getRoom.length !== 0) ?
          getRoom.map((getRoom: RoomsListType) => (
            <Button onClick={() => handleRouteToRoom(getRoom.id)}>
              <div className='bg-dark-1 grid grid-cols-[1fr_2fr_1fr] p-2 m-2 rounded-xl hover:bg-dark-4'>
                <div>
                  <h1>{getRoom?.name}</h1>
                </div>
                <div>
                  <h1>{getRoom?.inviteCode}</h1>
                </div>
                <div>
                  delete/quit
                </div>
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
