'use client'

import CreateRoomForm from "@/components/forms/create-room-form";
import JoinRoomForm from "@/components/forms/join-room-form";
import MyRooms from "@/components/my-rooms"; 
import useUser from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import Denied from "../../Denied/page";
import Loader from "@/components/Loader";


const UserHome = () => { 
   
    const {user} = useUser();
    const id = user?.id;
    const path: string | undefined = usePathname();

    if(!user){
      return <Loader/>
    }
    if(!path.match(`/user/${id}`)) {
      return <Denied/>
    } 

  return (
    <div className="relative"> 
      <div className="flex-center pt-28">
        <div className='grid grid-rows-[1fr_4fr] w-[45vw] h-[50vh] my-5 text-white'>
          <div className='grid grid-rows-1 xl:grid-cols-2'>
            <div className="m-2">
              <CreateRoomForm />
            </div>
            <div className='m-2 flex-center'>
              <JoinRoomForm />
            </div>
          </div> 
            <MyRooms />  
        </div>  
      </div>
    </div>
  )
}

export default UserHome
