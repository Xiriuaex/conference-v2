'use client'
import Image from "next/image"
import Link from "next/link"
import useUser from "@/hooks/useUser";

const Navbar = () => { 

  
  const user = useUser();

  return (
   <nav className="flex-between relative z-50 w-full bg-dark-1 x-6 py-4 lg:px-10">
    <Link
      href={"/"}
      className="flex flex-row gap-1 max-lg:pl-6"
    >
      <Image
        src={"..//icons/logo.svg"}
        width={32}
        height={32}
        alt="conference-logo"
        className="max-sm:size-10"
      />
      <p className="text-[26px] uppercase font-extrabold text-white max-sm:hidden">
        Conference
      </p>
    </Link> 
    {user.user ?
      <div className="flex flex-row justify-center space-x-4">
        <div className="text-white uppercase font-semibold text-2xl hover:text-sky-300 transition ease-in-out">
          <Link  href={`/rooms/:id`}>
            Logout 
          </Link>  
        </div>
        <div className="text-white uppercase font-semibold text-2xl hover:text-sky-300 transition ease-in-out">
          <Link  href={`/user/${user.user.id}`}>
            Home 
          </Link>  
        </div>
      </div> :
        <div className="grid grid-rows-2 ">
          <div className="grid grid-cols-2 items-center">
            <div className="flex-center">
              <Link className="p-2 bg-blue-1 rounded-xl text-white hover:bg-blue-600 transition ease-in-out" href="api/auth/signin?callbackUrl=/user/:id">
                Login
              </Link>
            </div>
            <div className="flex-center">
              <Link className="p-2 bg-blue-1 rounded-xl text-white hover:bg-blue-600 transition ease-in-out" href="api/auth/signin">
                signup
              </Link>
            </div>
          </div>
        </div> 
      }
   </nav>
  )
}

export default Navbar
