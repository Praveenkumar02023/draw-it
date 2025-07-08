"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";


export default function Home() {

  const slugRef = useRef<string>(null);
    
  const router = useRouter();


  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-green-50 via-pink-50 to-gray-50" >

    <div className="absolute inset-0">
       <div className='absolute bottom-40 right-20 h-96 w-96 rounded-full bg-green-50 blur-2xl animate-pulse'></div>
       <div className='absolute top-40 left-20 h-128 w-128 rounded-full bg-cyan-50 blur-2xl animate-pulse'></div>
    </div>
      <div className="relative px-24 h-full w-full flex items-center justify-center">
          <h1 className="text-6xl font-bold text-center " >Enter a room</h1>
          <div className="pt-18 w-full flex flex-col " >
            <Input onChange={(e) => slugRef.current = e.target.value} className="transition-transform hover:scale-102 font-semibold border border-gray-300" type="text" placeholder="Enter room name" ></Input>
            <div className="full flex justify-end pt-6">
               <Button onClick={() => {
                if(!slugRef.current)return;
                router.push(`/room/${slugRef.current}`)

               }} size="lg" className=" relative bg-gradient-to-br from-violet-100 via-blue-100 to-cyan-200  text-black flex  text-center font-semibold cursor-pointer transition-transform hover:scale-110  " >Enter room {<ArrowRight/>}</Button>
            </div>
          </div>

      </div>
    </div>
  );
}
