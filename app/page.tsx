'use client'

import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, currentUser } from "@clerk/nextjs"
 
import { Button } from "@/components/ui/button"       
import Image from "next/image";
import Link from "next/link";

const Home = () => {  
  
  return (
   <div className="flex-center flex-col space-y-20">
      <div className="mt-16 flex-center uppercase text-white font-bold text-3xl md:text-5xl">
        <Image src={'../icons/logo.svg'} width={44} height={44} alt="logo-conference"/>
        Conference
      </div>

      {/* if signed out */}
      <SignedOut>
        <div className="grid grid-cols-2 ">
          <div>
            <Button className="bg-blue-1 rounded-xl text-white hover:bg-blue-600 transition ease-in-out">
              <SignInButton  redirectUrl={`user/${currentUser}`}/>
            </Button>
          </div>
          <div>
            <Button className="bg-blue-1 rounded-xl text-white hover:bg-blue-600 transition ease-in-out">
              <SignUpButton />
            </Button>
          </div>
        </div>

        <div className="text-white uppercase font-semibold hover:text-emerald-300 transition">
          <Link href={'/'} >Join a meeting as a guest</Link>
        </div>
      </SignedOut> 

      {/* if signed In */}
      <SignedIn>
        <div className="text-white uppercase font-semibold text-2xl hover:text-sky-1 transition ease-in-out">
          <Link  href={`user/${currentUser}`}>
            My Rooms  
          </Link>  
        </div>   
        <div>
          <Button className="bg-blue-1 rounded-xl text-white hover:bg-blue-600 transition ease-in-out">           
            <SignOutButton />
          </Button>
        </div>    
      </SignedIn>


    </div>
  )
}

export default Home
