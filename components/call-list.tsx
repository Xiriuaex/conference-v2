
'use client'

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingCard from "./meeting-card";
import Loader from "./Loader";
import { LucideLoaderCircle } from "lucide-react";


const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings'}) => {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  
    const router = useRouter();

    const [recordings, setRocordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return callRecordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No Previous Calls";
            case 'recordings':
                return "No Recordings";
            case 'upcoming':
                return "No Upcoming Calls";
            default:
                return '';
        }
    };
    
    const calls = getCalls();
    const NoCallsMessage = getNoCallsMessage();
    
    if (isLoading) return <LucideLoaderCircle />;

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard 
                    key={meeting?.id}
                    icon={
                        type === 'ended'
                         ? '../icons/previous.svg'
                         : type === 'upcoming'
                           ? '../icons/upcoming.svg'
                           : '../icons/recording.svg'
                    }
                    title={(meeting.state.custom.description.substring(0, 25) || 'No description')}
                    date={meeting.state.startsAt.toLocalString()
                        || meeting.start_time.toLocalString()
                    }
                    isPreviousMeeting={type === 'ended'}
                    buttonIcon1={ type === 'recordings' ? '../icons/play.svg' : undefined}
                    buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    link={
                        type === 'recordings'
                          ? (meeting as CallRecording).url
                          : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                      }
                    handleClick={
                      type === 'recordings'
                        ? () => router.push(`${(meeting as CallRecording).url}`)
                        : () => router.push(`/meeting/${(meeting as Call).id}`)
                    }
                />
            )) :
                <h1 className="text-2xl font-bold text-white">{NoCallsMessage}</h1>
            }
        </div>
    )
}

export default CallList;
