import { ArrowRight, Stars } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Testimonial = () => {
  return (
    <div className="relative w-screen h-[65vh] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 flex items-center">
      <div className="pt-12 pl-28 h-full w-full absolute inset-0 opacity-20   grid grid-cols-7 gap-8">
        {Array.from({ length: 49 }).map((_, i) => (
          <div key={i} className="rounded-full h-2 w-2 bg-gray-50 animate-pulse delay-100"
          style={{animationDelay : `${i * 0.1}s`}}></div>
        ))}
      </div>
      <div className="relative h-full w-full flex flex-col items-center pt-24 gap-y-6">
          <Stars className="h-18 w-18  text-white animate-bounce" />
          <h1 className="text-6xl text-white font-bold" >
            Ready to Start Creating?
          </h1>
          <p className=" w-[45%] text-center text-2xl text-white" >Join thousands of creators who are already bringing their ideas to life with our drawing tool</p>
          <Button size="lg" className=" bg-white text-black text-md font-semibold transition-transform hover:scale-110">
            Start Drawing Now
            <ArrowRight/>
          </Button>

      </div>

    </div>
  );
};

export default Testimonial;
