"use client"
import React from 'react'
import { Button } from './ui/button'
import { Palette, PenTool, Users, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useRouter } from 'next/navigation'


const Hero = () => {
  const router = useRouter();
  return (
    <div className='p-12 h-screen w-screen bg-gradient-to-br from-violet-100 via-blue-100 to-blue-100'>
        
        <div className=" absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>

        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <div className='gap-y-2 h-full w-full pt-24 flex flex-col items-center' >
        <h1 className='text-7xl font-bold text-center bg-gradient-to-r from-violet-800 via-blue-600 to-blue-400 bg-clip-text text-transparent'>
          Draw Ideas
        </h1>
        <h1 className='text-7xl font-bold text-center text-black bg-clip-text '>
          Into Reality
        </h1>
        <h3 className='pt-6 w-[65%] text-center text-2xl text-gray-600 flex flex-wrap ' >
          Create beautiful diagrams, sketches, and visual ideas with our intuitive drawing tool. Perfect for brainstorming, wireframing, and bringing your thoughts to life.
        </h3>
        <div className='flex gap-x-4 pt-6 items-center' >
          <Button onClick={() => router.push('/signup')} className='relative text-center text-lg font-semibold bg-gradient-to-r from-violet-700 to-blue-600 text-white transition-transform duration-300 hover:scale-110' variant="default" size="lg"  >
            <PenTool className='mr-1' />
            Start Drawing
            </Button>
            <Button className=' border-2 border-gray-300 hover:border-violet-500 hover:bg-violet-100 bg-white text-center text-lg font-semibold ' variant="secondary" size="lg"  >
            View Examples
            </Button>
        </div>
        <div className='gap-x-8 pt-12 flex'>
          <Card className='transition-transform hover:scale-110 relative bg-white px-4 py-8 flex items-center  w-xs' >
            <CardHeader className='w-full flex items-center flex-col text-center'>
             <CardTitle className='bg-violet-200 text-purple-600 rounded-lg h-12 w-12 flex items-center justify-center' > <Zap ></Zap></CardTitle>
              <CardTitle className='text-2xl mt-4' >Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
             <p className='flex flex-wrap text-center text-gray-600' > Instant response and smooth drawing experience with no lag</p>
            </CardContent>
          </Card>
          <Card className='transition-transform hover:scale-110 relative bg-white px-4 py-8 flex items-center  w-xs' >
            <CardHeader className='w-full flex items-center flex-col text-center'>
             <CardTitle className='bg-blue-200 text-blue-600 rounded-lg h-12 w-12 flex items-center justify-center' > <Palette></Palette> </CardTitle>
              <CardTitle className='text-2xl mt-4' >Rich Tools</CardTitle>
            </CardHeader>
            <CardContent>
             <p className='flex flex-wrap text-center text-gray-600' > Complete set of drawing tools and shapes for any project</p>
            </CardContent>
          </Card>
          <Card className='transition-transform hover:scale-110 relative bg-white px-4 py-8 flex items-center  w-xs' >
            <CardHeader className='w-full flex items-center flex-col text-center'>
             <CardTitle className='bg-cyan-200 text-cyan-600 rounded-lg h-12 w-12 flex items-center justify-center' > <Users></Users> </CardTitle>
              <CardTitle className='text-2xl mt-4' >Collaborate</CardTitle>
            </CardHeader>
            <CardContent>
             <p className='flex flex-wrap text-center text-gray-600' > Share and work together in real-time with your team</p>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Hero