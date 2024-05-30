'use client'
//providers wraps entire components and infused additional functionalities

import { StreamVideo } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader'; 
import useGetClient from '@/hooks/useGetClient';

const StreamVideoProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    
    const {videoClient} = useGetClient();

    if(!videoClient) return <Loader />
 
    return ( 
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>    
  );
};

export default StreamVideoProvider;