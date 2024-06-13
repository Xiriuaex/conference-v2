import { Metadata } from "next";

import StreamVideoProvider from "@/providers/stream-video-providers";
import { ReactNode } from "react"; 

export const metadata: Metadata = {
  title: "Conference",
  description: "Virtual Meeting Rooms",
  icons: {
    icon: '/icons/logo.svg',
  }
};

const HomeLayout = ({ children } : Readonly<{ children: ReactNode }>) => {
  
  return (
    <main className="relative"> 
      <StreamVideoProvider> 
          <div className="flex"> 
            <section className="flex min-h-screen flex-1 flex-col px-6 pt-20 max-md:pb-14 sm:px-14">
              <div className="w-full ">
                { children }
              </div>
            </section>
          </div> 
      </StreamVideoProvider>
    </main>
  )
}

export default HomeLayout
