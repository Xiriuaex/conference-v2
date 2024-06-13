'use client'
import { userType } from '@/components/data-for-lists/data-list';
import { currentProfile } from '@/lib/current-profile';
import { useEffect, useState } from 'react';


const useUser = () => {

    const [user, setUser] = useState<userType>();
    useEffect(() => {
        const getUser = async () => {
            try {
                const user: userType | undefined = await currentProfile();
                if(!user) {
                    return;
                } else {
                    setUser(user);
                }
               
            } catch (error) {
                console.log("Can't get user.", error);
            }
        };

        getUser();
    }, []);

    return { user };
    
}

export default useUser
