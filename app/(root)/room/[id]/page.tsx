'use client'


import { auth } from "@/auth";
import MeetingTypeList from "@/components/meeting-type-list";
import MemberCore from "@/components/member-core"; 
import useUser from "@/hooks/useUser";
import { currentProfile } from "@/lib/current-profile";
import { redirect, useParams, useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { useEffect } from "react";

type memberType = {
  role: string,
  profileId: string,
}
type personalPagePropsType = {
  name: string,
  role: string,
  inviteCode: string,
  members: memberType,
}

type CurrentMemberType = {
  profileId: string; 
  id: string;
}

const personalHomePage = ({name, role, inviteCode, members}: personalPagePropsType, req: NextRequest) => {  
  const tag:{tag: string} = useParams<{ tag: string }>()
  const {user} = useUser();
  const router = useRouter();
  
  useEffect(() => {
      const id = JSON.stringify(tag);
  
    const checkUser = async () => {
      const user = await currentProfile();
      if(!user) redirect("/login");
      else return;
    }
    checkUser();

  }, []);
  
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="gap-5 text-white">
      <div className="grid grid-cols-2  h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM 
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>

        <div className="bg-dark-3 pt-4 rounded-[14px] overflow-auto">
          {/* <MemberCore /> */}
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default personalHomePage
