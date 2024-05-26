'use client';

import { auth } from '@/auth';
import { roomType, userType } from '@/components/data-for-lists/data-list';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { useEffect, useState } from 'react';


const useGetRoom = () => {

    const [room, setRoom] = useState<roomType>();
    useEffect(() => {
        const getRoom = async () => {
            try { 
            } catch (error) {
                console.log("Can't get Room:", error);
            }
        };

        getRoom();
       
    }, []);

    return { room };
    
}

export default useGetRoom
