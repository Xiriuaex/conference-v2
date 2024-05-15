'use client'

import MeetingTypeList from "@/components/meeting-type-list";
import MemberCore from "@/components/member-core";
import { CurrentMember } from "@/lib/current-member";
import { currentProfile } from "@/lib/current-profile";
import Error from "next/error";
import { useParams, useRouter } from "next/navigation"; 
import { NextRequest, NextResponse } from "next/server";
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

  const router = useRouter(); 
  useEffect(() => {
    const authorization =  async () => {
      try { 
        const member:CurrentMemberType = await CurrentMember();
        if(req.nextUrl.pathname.startsWith("/room/")){
          if(member.id === router.) {
            console.log("yes")
          } else {
            return new NextResponse("Unauthorized", { status: 400});
          } 
        } 
      } catch (error) {
          console.log("[COULDN'T_GET]", error);
          return new NextResponse("Internal Error", {status: 500});
        }
        return;
    };

    authorization();
  }, [router.pathname])
 
 
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
          <MemberCore />
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default personalHomePage
