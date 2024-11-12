"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Logged out successfully");
    
  };

  return (
   
      <div className="p-8 bg-zince-300/10 bg-gray-700 shadow-lg flex justify-between items-center gap-2 ">
        <div >
          <Link href={'/list'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >
          Home</Link>

        </div>
        {/* <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div> */}
        <div>
        <span className="font-bold">{session?.user?.name}</span>
        <div className="relative inline-flex items-center justify-center w-9 h-8  mr-4 overflow-hidden cursor-pointer bg-gray-100 rounded-full dark:bg-gray-600">
      
      <span className="text-xl font-extralight text-gray-600 dark:text-gray-300">
        {session?.user?.name ? session.user.name[0] : ''}</span>
    </div>
        
        </div>
         
       
        <button
          onClick={() => router.push("/add")}
          className="bg-transparent hover:bg-blue-500 text-black  font-semibold hover:text-white border border-orange-500 hover:border-transparent rounded px-6 py-2 mt-3"
        >
          Create User
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-black  border-black  rounded-lg font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
        
      </div>
    
  );
}