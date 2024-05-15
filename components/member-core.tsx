'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'; 

import {  MemberListType } from "@/components/data-for-lists/data-list";

import Loader from './Loader';
import { Button } from './ui/button';
import { currentProfile } from '@/lib/current-profile';

const MemberCore = () => { 

  const [isLoading, setLoading] = useState(true);
  const [getMember, setGetMember] = useState<MemberListType[]>([]);

  

  useEffect(() => {
    const handleGetMember = async () => {
      try {
        await axios.get('/api/member')
                    .then((res) => 
                      {
                        setGetMember(res.data)
                        setLoading(false)
                    }
                  );
        
        
      } catch (error) {
        console.log(error);
      }
    }

    handleGetMember();
    
  }, []);

  if (isLoading) return <Loader />
  
  return ( 
    <div className='bg-dark-3 grid grid-row-[1fr_5fr]'>
        <div className='bg-dark-2 rounded-xl my-4 mx-4 flex justify-evenly items-center p-2'>
            Members
        </div>

      <div className='bg-dark-2 flex-center flex-col rounded-xl mx-4 mb-4'>

         {
          getMember.map((member: MemberListType) => (
              <div className='bg-dark-1 grid grid-cols-[4fr_1fr] p-2 m-2 rounded-xl hover:bg-dark-4'>
                <div>
                  <h1>{member.profileId}</h1>
                </div>
                <div className='flex-center mb-3'>
                  ...
                </div>
              </div>
           ))
        } 
      </div> 
    </div>
  )
}

export default MemberCore;
