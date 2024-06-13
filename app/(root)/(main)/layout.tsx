import { Metadata } from "next";
 
import { ReactNode } from "react"; 
import { CurrentRoomProvider } from "@/providers/current-room-provider";
import StreamVideoProvider from "@/providers/stream-video-providers";

export const metadata: Metadata = {
  title: "Conference",
  description: "Virtual Meeting Rooms",
  icons: {
    icon: '/icons/logo.svg',
  }
};

const HomeLayout = ({ children } : Readonly<{ children: ReactNode }>) => {
  
  return (
    <StreamVideoProvider>
        { children } 
    </StreamVideoProvider>
  )
}

export default HomeLayout
