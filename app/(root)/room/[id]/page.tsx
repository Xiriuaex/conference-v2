'use client'
 
import MeetingTypeList from "@/components/meeting-type-list";
import MemberCore from "@/components/member-core";
import Sidebar from "@/components/sidebar";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
 
const personalHomePage = () => { 
  
  const {user} = useUser(); 
  
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
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Welcome {user?.name}
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
