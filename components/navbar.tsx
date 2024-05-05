import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-navbar"
import { SignIn, SignedIn, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
   <nav className="flex-between fixed z-50 w-full bg-dark-1 x-6 py-4 lg:px-10">
    <Link
      href={"/"}
      className=" gap-1 max-lg:pl-6"
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

    <div className="flex-between gap-5">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <MobileNav />
    </div>

   </nav>
  )
}

export default Navbar
