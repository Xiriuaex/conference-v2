'use client';

import { roomType } from '@/components/data-for-lists/data-list';
import { currentRoom } from '@/lib/current-room';
import { useEffect, useState } from 'react';


const useGetRoom = () => {

    const [room, setRoom] = useState<roomType>();
    useEffect(() => {
        const getRoom = async () => {
            try { 
                const room: roomType = await currentRoom();
                setRoom(room);
            } catch (error) {
                console.log("Can't get Room.", error);
            }
        };

        getRoom();
       
        console.log(room?.name)
    }, []);

    return { room };
    
}

export default useGetRoom
