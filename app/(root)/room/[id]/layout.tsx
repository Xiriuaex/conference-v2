import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { Metadata } from "next";
import StreamVideoProvider from "@/providers/stream-client-providers";
export const metadata: Metadata = {
  title: "Conference",
  description: "Virtual Meeting Rooms",
  icons: {
    icon: '/icons/logo.svg',
  }
};

const HomeLayout = ({ children }:
    {children: React.ReactNode}
) => {

  
  return (
   
    <StreamVideoProvider>
    <main className="relative">
      
        <Navbar />

        <div className="flex">
          <Sidebar />

          <section className="flex min-h-screen flex-1 flex-col px-6 pt-20 max-md:pb-14 sm:px-14">
            <div className="w-full ">
              { children }
            </div>
          </section>
        </div>
    </main>
    </StreamVideoProvider>
  )
}

export default HomeLayout
