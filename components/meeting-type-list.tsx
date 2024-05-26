//@ts-nocheck
'use client'

import { useRouter } from "next/navigation";
import HomeCard from "./home-card";
import { useEffect, useState } from "react";
import MeetingModal from "./meeting-modal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { currentProfile } from "@/lib/current-profile"; 


const MeetingTypeList = () => {

    //all the states:
    const [user, setUser] = useState();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(undefined);
   
     
    //get user from currentProfile:
    useEffect(() => {
        const funct = async () => {
            const currentUser = await currentProfile();
            setUser(currentUser);
        };

        funct();
    },[]);
    
    //toast and useRouter:
    const { toast } = useToast();
    const router = useRouter();

    //get the client created:
    const client = useStreamVideoClient();
    
    //intial values of a call:
    const initialValues = {
        dateTime: new Date(),
        description: '',
        link: '',
    };
    const [values, setValues] = useState(initialValues);

    const [callDetails, setCallDetails] = useState<Call>();
    
    //creates meeting call:
    const createMeeting= async () => {
        if(!client || !user ) return;

        try {
            const callId = crypto.randomUUID();
            //create a call:
            const call = client.call("default", callId);
            if(!call) throw new Error("Failed to create call!");
            
            //meeting start time and description of the call:
            const startsAt = initialValues.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = initialValues.description || "Instant Meeting";
            
            
            if(!initialValues.dateTime) {
                toast({
                    title: "Please select a date and time",
                  });
                  return;
            }

            await call.getOrCreate({
                data: { 
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });

            setCallDetails(call);

            toast({ title: "Meeting Created!" });

            if(!initialValues.description) {
                router.push(`/meeting/${call.id}`);
            };

        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create Meeting!",
              })
        }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/room/[roomId]/meeting/${callDetails?.id}`;


  return (
    <section className="grid grid-rows-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-5">
        <HomeCard
            img="..//icons/add-meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingState('isInstantMeeting')}
        />
        <HomeCard
            img="..//icons/join-meeting.svg"
            title="Join Meeting"
            description="via invitation link"
            className="bg-blue-1"
            handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <HomeCard 
            img="..//icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            className="bg-purple-1"
            handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
            img="..//icons/recordings.svg"
            title="View Recordings"
            description="Meeting Recordings"
            className="bg-yellow-1"
            handleClick={() => router.push('/recordings')}
        />

        {!callDetails ? ( 
            <MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={()=> setMeetingState(undefined)}
                title={"Create Meeting"}
                handleClick={createMeeting} 
            >
                 <div className="flex flex-col gap-2.5">
                    <label className="text-base font-normal leading-[22.4px] text-sky-2">
                    Add a description
                    </label>
                    <Textarea
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) =>
                        setValues({ ...values, description: e.target.value })
                    }
                    />
                </div>
                <div className="flex w-full flex-col gap-2.5">
                    <label className="text-base font-normal leading-[22.4px] text-sky-2">
                    Select Date and Time
                    </label>
                    <DatePicker
                        selected={values.dateTime}
                        onChange={({date} : {date: Date}) => setValues({ ...values, dateTime: date! })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                    />
                </div>
            </MeetingModal>
        ) :         
          (  <MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={()=> setMeetingState(undefined)}
                title={"Meeting Created"}
                className="text-center"
                handleClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({ title: 'Linked copied'})
                }} 
                image="icons/checked.svg"
                buttonIcon="icons/copy.svg"
                buttonText="Copy Meeting Link"
            />)
        }
        <MeetingModal
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={()=> setMeetingState(undefined)}
            title={"Start an Instant Meeting"}
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting} 
        />
    </section>

  )
}

export default MeetingTypeList
