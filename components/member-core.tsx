'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'; 

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { roomType, userType } from "@/components/data-for-lists/data-list";

import Loader from './Loader'; 
import { ShieldCheck, UserCog, UserMinus } from 'lucide-react';
import { Button } from './ui/button';
import { useParams } from 'next/navigation'; 
import { currentRoom } from '@/lib/current-room';
import { currentProfile } from '@/lib/current-profile';


const MemberCore = () => { 

  const {id} = useParams();
  
  const [isLoading, setLoading] = useState(true);
  const [getMember, setGetMember] = useState<userType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
 
    const handleGetMember = async () => {
      try {
        await axios.get('/api/member')
                    .then((res) => {
                      setGetMember(res.data)
                      setLoading(false)
                    }
                  );
        
       
      } catch (error) {
        console.log(error);
      }
    }

    const handleAdmin = async()=> {
      try {
        const roomid: string= id as string; 
        const room: roomType = await currentRoom(roomid); 
        const user: userType= await currentProfile();

        if(user.name === room.admin) {
          setIsAdmin(!isAdmin);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    handleGetMember();
    handleAdmin();
    
  }, []);
 
  const handleRemove = async (userId: string) => {
    try { 
      await axios.delete("/api/member", {data: {userId, id}}); 
      window.location.reload();
    } catch (error) {
        console.log(error);
    } 
  };

  const handleMakeAdmin = async(name: string|null) => {
    try { 
      await axios.put("/api/member", {data: {name, id}}); 
      window.location.reload();
    } catch (error) {
        console.log(error);
    } 
  };

  if (isLoading) return <Loader />
  
  return ( 
    <div className='bg-dark-3 grid grid-row-[1fr_5fr]'>
        <div className='bg-dark-2 rounded-xl my-4 mx-4 flex justify-evenly items-center p-2'>
            Members
        </div>

      <div className='bg-dark-2 flex-center flex-col rounded-xl mx-4 mb-4'>

         {
          getMember.map((member: userType) => (
              <div className='bg-dark-1 w-[90%] flex-between p-3 my-3 rounded-xl hover:bg-dark-4'>
                <div>
                  <h1>{member.name}</h1>
                </div>
                <div className='flex-center'>
                {isAdmin ?
                <DropdownMenu>
                  <DropdownMenuTrigger className='focus:outline-none'><UserCog /></DropdownMenuTrigger>
                  <DropdownMenuContent className='bg-dark-1 text-white text-2xl'>
                    <DropdownMenuLabel>User Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='flex flex-col items-start justify-center'>
                      <Button className='hover:bg-dark-4 grid grid-cols-[.3fr_1fr] w-[20vw]' onClick={()=>handleRemove(member.id)}><UserMinus /><h1>Kick</h1></Button>
                      <Button className='hover:bg-dark-4 grid grid-cols-[.3fr_1fr] w-[20vw]' onClick={()=>handleMakeAdmin(member.name)}><ShieldCheck /><h1>Admin</h1></Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                :
                 <></>
                }
                

                </div>
              </div>
           ))
        } 
      </div> 
    </div>
  )
}

export default MemberCore;
