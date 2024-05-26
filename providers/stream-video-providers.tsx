'use client'

//providers wraps entire components and infused additional functionalities

import { StreamCall, StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk';

import { useEffect, useState } from 'react';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';  
import useUser from '@/hooks/useUser';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;


const StreamVideoProvider = ({ children }: {children: React.ReactNode}) => {
    
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser();

    useEffect(()=> {
            console.log(user?.name);
       
            if(!isLoaded || !user) return;
            if(!API_KEY) throw new Error("Stream API key is missing");

            const clientUser: User = {
                id: user.id,
                name: user.name || user.id,
                image: user.image || undefined,
            }
            //creating a new stream video client:
            const client = new StreamVideoClient({
                apiKey: API_KEY,
                tokenProvider,
                user: clientUser
            });
            if(client) console.log(client)

            setVideoClient(client); 
    }, [user, isLoaded]);
  
    if(!videoClient) return <Loader />
 
    return (
    <StreamVideo client={videoClient}> 
        { children } 
    </StreamVideo>
  );
};

export default StreamVideoProvider;