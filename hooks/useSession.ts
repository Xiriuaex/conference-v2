'use client';

import { auth } from '@/auth';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';


const useSession = () => {

    const [session, setSession] = useState<Session | null>();
    useEffect(() => {
        const getSession = async () => {
            try {
                const session = await auth();
                setSession(session);
            } catch (error) {
                console.log("Can't get user:", error);
            }
        };

        getSession();
       
    }, []);

    const sessionId = session?.user?.id
    return { session, sessionId };
    
}

export default useSession;
