'use client'

//providers wraps entire components and infused additional functionalities

import {
    Call,
    CallingState, 
    StreamCall, 
    StreamVideo, 
    StreamVideoClient, 
    useCall, 
    useCallStateHooks, 
    User 
} from '@stream-io/video-react-sdk';

import { useEffect, useState } from 'react';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';  
import useUser from '@/hooks/useUser'; 

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY; 
// const callId = crypto.randomUUID();

const StreamVideoProvider = ({ children }: {children: React.ReactNode}) => {
    
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    // const [callDetails, setCallDetails] = useState<Call>();
    const {user} = useUser();

    // useEffect(()=> {
        
    //         if(!user) return;
    //         if(!API_KEY) throw new Error("Stream API key is missing");

    //         try {
    //             //creating a new stream video client:
    //             const client = new StreamVideoClient({
    //                 apiKey: API_KEY,
    //                 user: {
    //                     id: user.id,
    //                     name: user.name || user.id,
    //                     image: user.image || undefined,
    //                 },
    //                 tokenProvider
    //             });
    //             setVideoClient(client); 

    //             // //create a new stream call:
    //             // const call = client.call('default', callId);
    //             // if(!call) throw new Error("Failed to create call!");
                
    //             // call.join({ create: true });

    //             // setCallDetails(call);

    //         } catch (error) {
    //             console.error('Error initializing Stream Video client:', error);
    //         }
    // }, [user]);
  
    // if(!videoClient) return <Loader />
 
    return ( 
            { children }         
  );
};

export default StreamVideoProvider;