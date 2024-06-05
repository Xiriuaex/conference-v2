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

import { userType } from "@/components/data-for-lists/data-list";

import Loader from './Loader'; 
import { ShieldCheck, UserCog, UserMinus } from 'lucide-react';
const MemberCore = () => { 

  const [isLoading, setLoading] = useState(true);
  const [getMember, setGetMember] = useState<userType[]>([]);

  useEffect(() => {
    const handleGetMember = async () => {
      try {
        await axios.get('/api/member')
                    .then((res) => {
                      setGetMember(res.data)
                      setLoading(false)
                    }
                  );
        
        await axios.delete('api/member')
                   .then((res) => {
                      console.log("Member Removed Successfully!", res);
                    });
        
      } catch (error) {
        console.log(error);
      }
    }

    handleGetMember();
    
  }, []);

  const handleRemove = (id) => {

  };

  const handleMakeAdmin = (id) => {

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
                <DropdownMenu>
                  <DropdownMenuTrigger className='focus:outline-none'><UserCog /></DropdownMenuTrigger>
                  <DropdownMenuContent className='bg-dark-1 text-white text-2xl'>
                    <DropdownMenuLabel>User Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='hover:bg-dark-4 gap-2' onClick={handleRemove(member?.id)}><UserMinus /> Kick User</DropdownMenuItem>
                    <DropdownMenuItem className='hover:bg-dark-4 gap-2' onClick={handleMakeAdmin(member?.id)}><ShieldCheck />Admin</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                </div>
              </div>
           ))
        } 
      </div> 
    </div>
  )
}

export default MemberCore;
