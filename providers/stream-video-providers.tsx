//@ts-nocheck
'use client'
//providers wraps entire components and infused additional functionalities

import { StreamVideo } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader'; 
import useGetClient from '@/hooks/useGetClient';
import { useParams, usePathname, useRouter } from 'next/navigation';

const StreamVideoProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const path = usePathname();
    const {videoClient} = useGetClient();


    if(!videoClient && !path.includes("/login")){
       return <Loader />
    }
 
    return ( 
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>    
  );
};

export default StreamVideoProvider;