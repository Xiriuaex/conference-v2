 
import { signIn } from "@/auth"
import LoginForm from "@/components/forms/login-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card" 
  
import Link from "next/link"

const Page = () => {
 
  return (
    <div className="flex-center h-dvh text-white">
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter Your Credentials</CardDescription>
            </CardHeader>
            <CardContent className="text-dark-3">
                <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
                <span>Or</span>
                <form action={
                    async () => {
                        "use server";
                        await signIn("google");
                    }
                }>
                    <Button type="submit" className="text-dark-3 bg-sky-400 hover:bg-sky-600">Login with Google</Button>
                </form>

                <Link href={"/signup"} className="pt-4 hover:text-gray-300">
                    Don't have an account? Sign up
                </Link>
            </CardFooter>
        </Card> 
    </div>
  )
}

export default Page;

  