'use client'

import { useState } from "react";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/meeting-room";
import MeetingSetup from "@/components/meeting-setup";
import { useGetCallById } from "@/hooks/useGetCallById";

import { StreamCall, StreamTheme, useConnectedUser } from "@stream-io/video-react-sdk";

const Meeting = ({ params: { id } }: { params: { id:string } }) => {

  //Here we check for the video and audio setup completed or not:
    const [ isSetupComplete, setIsSetupComplete ] = useState(true);
     
    const { call, isCallLoading } = useGetCallById(id);
    
    if(isCallLoading) return <Loader />

   if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      There are no Call Found
    </p>
  );

  //first check in which call we are in: using custom hooks
  return (
    <main className="h-screen w-full">
        <StreamCall call={call}> 
            <StreamTheme>
                {!isSetupComplete ? (
                    <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
                ):
                    <MeetingRoom />
                }
            </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default Meeting
