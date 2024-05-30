'use client'

import { useState } from "react";
import { useParams } from "next/navigation";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/meeting-room";
import MeetingSetup from "@/components/meeting-setup";
import { Alert } from "@/components/ui/alert";

import { useGetCallById } from "@/hooks/useGetCallById";
import useUser from "@/hooks/useUser";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

const Meeting = () => {

  const { id } = useParams();
  const { user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (isCallLoading) return <Loader />;

   if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      There are no Call
    </p>
  );

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;


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
