'use client';

import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react'
import useUser from './useUser';
import { tokenProvider } from '@/actions/stream.actions';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY; 

const useGetClient = () => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user} = useUser();

    useEffect(()=> {
        if(!user) return;
        if(!API_KEY) throw new Error("Stream API key is missing");

        try {
            //creating a new stream video client:
            const client = new StreamVideoClient({
                apiKey: API_KEY,
                user: {
                    id: user.id,
                    name: user.name || user.id,
                    image: user.image || undefined,
                },
                tokenProvider
            });
            setVideoClient(client);
        } catch (error) {
            console.error('Error initializing Stream Video client:', error);
        }
    }, [user]);
  return videoClient;
}

export default useGetClient
