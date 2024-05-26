
import Image from "next/image";
import Link from "next/link"; 
import Navbar from "@/components/navbar";

const Home = async () => {  
  return (
  <div>
    <Navbar />
    <div className="text-white relative top-[30vh] flex-center uppercase font-semibold hover:text-emerald-300 transition">
      <Link href={'/'} >Join a meeting as a guest</Link>
    </div>
    </div>
  )
}

export default Home
