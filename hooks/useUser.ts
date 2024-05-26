'use client';

import { auth } from '@/auth';
import { userType } from '@/components/data-for-lists/data-list';
import { currentProfile } from '@/lib/current-profile';
import { useEffect, useState } from 'react';


const useUser = () => {

    const [user, setUser] = useState<userType>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await currentProfile();
                setUser(user);
            } catch (error) {
                console.log("Can't get user:", error);
            }
        };

        getUser();
        setIsLoaded(true);
    }, []);

    return { user, isLoaded };
    
}

export default useUser
