'use client';

import { roomType } from '@/components/data-for-lists/data-list';
import { currentRooms } from '@/lib/current-user-room';
import { useEffect, useState } from 'react';


const useGetRoom = () => {

    const [room, setRoom] = useState<roomType>();
    useEffect(() => {
        const getRoom = async () => {
            try { 
                const room: roomType = await currentRooms();
                setRoom(room);
            } catch (error) {
                console.log("Can't get Room.", error);
            }
        };

        getRoom();
       
    }, []);

    return { room };
    
}

export default useGetRoom
