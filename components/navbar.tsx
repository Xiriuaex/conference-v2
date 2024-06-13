'use client'
import Image from "next/image"
import Link from "next/link"
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { userType } from "./data-for-lists/data-list";
import { currentProfile } from "@/lib/current-profile";

const Navbar = () => { 

  const [user, setUser] = useState<userType | undefined>();

  useEffect(()=> {
    const checkUser = async() => {
      let user = await currentProfile();
      setUser(user);
    };

    checkUser();
  },[]);
  
  return (
   <nav className="flex-between relative z-50 w-full bg-dark-1 x-6 py-4 lg:px-10 h-20">
    <Link
      href={"/"}
      className="flex flex-row gap-1 max-lg:pl-6"
    >
      <Image
        src={"..//icons/logo.svg"}
        width={32}
        height={32}
        alt="conference-logo"
        className="max-sm:size-10 mt-[.5px]"
      />
      <p className="text-[30px] uppercase font-extrabold text-sky-400 max-sm:hidden">
        Confo
      </p>
    </Link> 
    {user ?
      <div className="flex flex-row justify-center space-x-4">
        <div className="text-white font-semibold text-2xl hover:text-sky-300 transition ease-in-out">
          <Link  href={`/`}>
            Logout 
          </Link>  
        </div>
        <div className="text-white font-semibold text-2xl hover:text-sky-300 transition ease-in-out">
          <Link  href={`/user/${user.id}`}>
            Home 
          </Link>  
        </div>
      </div> :
        <div className="flex flex-row justify-center space-x-4">
            <div className="flex-center text-white font-semibold text-2xl hover:text-sky-300 transition ease-in-out">
              <Link  href="api/auth/signin?callbackUrl=/user/:id">
                Login
              </Link>
            </div>
            <div className="flex-center text-white font-semibold text-2xl hover:text-sky-300 transition ease-in-out">
              <Link  href="api/auth/signin">
                Signup
              </Link>
            </div>
        </div> 
      }
   </nav>
  )
}

export default Navbar
