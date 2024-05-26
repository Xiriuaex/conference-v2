import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { db } from "@/lib/db"

import { hash } from "bcryptjs"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
   
const SignUpForm = async() => {
    
    const signUpHandler = async (formData: FormData) => {
        "use server";
        const session = await auth();  
        
        const name = formData.get("username") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if(!name || !password || !email) {
            throw new Error("Please provide all field!")
        };

        const user = await db.user.findUnique({ 
            where: {
                email
            }
         });

        if(user) throw new Error("User already exists!");

        const hashedPassword = await hash(password, 10);

        await db.user.create({
            data: {
                username: name,
                name,
                email,
                password: hashedPassword, 
                role: "MEMBER", 
            }
        }); 

        redirect("/login");

    };

  return (
    <div className="flex-center h-dvh text-white">
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create Your Account</CardDescription>
            </CardHeader>
            <CardContent className="text-dark-3">
                <form action={signUpHandler}  className="flex flex-col space-y-3">
                    <Input type="email" placeholder="Email" name="email"/>
                    <Input type="text" placeholder="Username" name="username"/>
                    <Input type="password" placeholder="Password" name="password"/>
                    <Button type="submit" className="bg-sky-400 hover:bg-sky-600">Register</Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
                <span>Or</span>
                <form action="">
                    <Button type="submit" className="text-dark-3 bg-sky-400 hover:bg-sky-600">Login with Google</Button>
                </form>

                <Link href={"/login"} className="pt-4 hover:text-gray-300">
                    Already have an account? Login
                </Link>
            </CardFooter>
        </Card> 
    </div>
  )
}

export default SignUpForm

  