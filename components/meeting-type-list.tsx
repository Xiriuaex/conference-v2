/* eslint-disable camelcase */

'use client'

import { useParams, useRouter } from "next/navigation";
import HomeCard from "./home-card";
import { useEffect, useState } from "react";
import MeetingModal from "./meeting-modal";
import { Call, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import useGetClient from "@/hooks/useGetClient";
import useUser from "@/hooks/useUser";
import Loader from "./Loader";
import { Input } from "./ui/input";
import Meeting from "@/app/(root)/(main)/room/[id]/meeting/[meetid]/page";
import MemberCore from "./member-core";
import { roomType } from "./data-for-lists/data-list";
import { currentRoom } from "@/lib/current-room";

//intial values of a call:
const initialValues = {
    dateTime: new Date(),
    description: '',
    link: '',
};

const MeetingTypeList = () => {
    const {user} = useUser();  
    const now = new Date(); 
    const {id} = useParams();
    const rid: string= id as string;
    const [room, setRoom]= useState<roomType>();

    useEffect(()=> {
        const getRoom = async () => {
            const room = await currentRoom(rid);
            setRoom(room);
        } 
        getRoom();
       
    }, []);
   
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

    //toast and useRouter:
    const { toast } = useToast();
    const router = useRouter();

    const {videoClient} = useGetClient();  

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(undefined);
    const [callPage, setCallPage] = useState(false);
 
    
    const [values, setValues] = useState(initialValues);
    const [callDetails, setCallDetails] = useState<Call>();
    
    //creates meeting call:
    const createMeeting= async () => {
        if(!videoClient) {
            console.log("no video client");
        };
        if(!user) return;

        try {
            if (!values.dateTime) {
                toast({ title: 'Please select a date and time' });
                return;
            }

            const id = crypto.randomUUID();
            //create a call:
            const call = videoClient.call('default', id);
            if (!call) throw new Error('Failed to create meeting');


            //meeting start time and description of the call:
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';
            await call.getOrCreate({
                data: {
                starts_at: startsAt,
                custom: {
                    description,
                },
                },
            });
            
            setCallDetails(call);
            if (!values.description) {
                setCallPage(!callPage);
                toast({
                    title: 'Meeting Created',
                });
            }
        } catch (error) {
            console.log("this is error",error);
            toast({
                title: "Failed to create Meeting!",
              })
        }
    }; 

    if (!videoClient || !user) return <Loader />;

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
    console.log(meetingLink);
return ( 
<>
    {callPage ?
            callDetails ? (
                <Meeting callid={callDetails.id}  onleave={callPage} setOnLeave={setCallPage}/>
            ) : 
            ( 
                <Loader />
            )
        :
        <>
        <div className="grid grid-cols-2  h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 space-y-3">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {room?.name}
          </h2> 
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Welcome {user?.name}
          </h2>
          <h2 className="glassmorphism max-w-[500px] rounded py-2 text-center text-base font-normal ">
            Room Invite Code: <span className="text-green-300">{room?.inviteCode}</span>
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>

        <div className="bg-dark-3 pt-4 rounded-[14px] overflow-auto">
          <MemberCore />
        </div>
      </div>

    <section className="grid grid-rows-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-5 mt-16">
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
        {/* <HomeCard 
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
        /> */}

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

        <MeetingModal
            isOpen={meetingState === 'isJoiningMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Type the link here"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}
        >
            <Input
            placeholder="Meeting link"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </MeetingModal>

    </section>
    </>
    }
</>
  )
}

export default MeetingTypeList
