'use client'
 
import { roomType } from "@/components/data-for-lists/data-list";
import MeetingTypeList from "@/components/meeting-type-list";
import MemberCore from "@/components/member-core";
import Sidebar from "@/components/sidebar";
import useUser from "@/hooks/useUser"; 
import { currentRoom } from "@/lib/current-room";
import { useRoomContext } from "@/providers/current-room-provider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const personalHomePage = () => { 

  return (
    <section className="gap-5 text-white">
      
      <MeetingTypeList />
    </section> 
  )
}

export default personalHomePage
