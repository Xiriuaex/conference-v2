'use client'

import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
 
import { Button } from "@/components/ui/button"      
import { useRouter } from "next/navigation";
import { useEffect } from "react"; 
import { currentProfile } from "@/lib/current-profile";

const Home = async() => {  
  
  const router = useRouter();

  useEffect(() => {
    const handleUserRedirect = async () => {
      try {
        const profile = await currentProfile();

        if(profile){
          router.push(`user/${profile?.id}`)
        };

        console.log("no user");
      } catch (error) {
        console.log("The Error from the server:", error);
      } 
     
    };

    handleUserRedirect();
  }, [])

  return (
    <div>
      <h1>HOME PAGE</h1>
      <br />
      Login Buttons
      <br />
      <SignedIn>
        <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-800">
          <SignOutButton />
        </Button>
      </SignedIn>
      <SignedOut>
          <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-800">
            <SignInButton />
          </Button>
        <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-800">
          <SignUpButton />
        </Button>
      </SignedOut>
      <br />
      Join an meeting as a guest:
    </div>
  )
}

export default Home
