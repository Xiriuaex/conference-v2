"use client"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import LoginHandler from "@/actions/login.actions"
import { useRouter } from "next/navigation"
   
const LoginForm = () => {
    const router = useRouter();

  return (
    <form action={async (formData) => {
        const email= formData.get("email") as string;
        const password= formData.get("password") as string;

        if( email==='' || password==='' ){
            toast({
                description: "Please provide all the fields",
            });
        }

        const error = await LoginHandler(email, password);

        if(!error) 
        {   
            toast({
                description: "Login Successfull",
            });
            router.refresh();
        }
        if(error)
            toast({
                description: "Invalid initials"
            })
    }}  className="flex flex-col space-y-3">
        <Input type="email" placeholder="Email" name="email"/>
        <Input type="password" placeholder="Password" name="password"/>
        <Button type="submit" className="bg-sky-400 hover:bg-sky-600">Login</Button>
    </form>
  )
}

export default LoginForm

  