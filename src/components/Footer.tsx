import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='px-12  h-[40vh] w-full bg-gray-900'>
        <div className='flex py-4 h-[75%]' >   
            <div className=' gap-y-4 flex flex-col justify-between text-white w-[50%] p-8'>
                <h2 className='text-5xl  bg-gradient-to-br from-violet-500 via-cyan-50 to-blue-500 font-bold bg-clip-text text-transparent '>DrawIT</h2>
                <p className='pt-2 text-gray-400 '>The most intuitive drawing and diagramming tool for creators, designers, and teams. Bring your ideas to life with ease.</p>
                <p className='pt-8 text-gray-400'>© 2024 DrawSpace. All rights reserved.</p>
            </div>
            <div className='text-white w-[50%] flex items-center justify-evenly gap-x-12 '>
                <div className='flex flex-col gap-y-3 '>
                    <h3 className='text-lg font-bold'>Quick Links</h3>
                    <ul className='ml-2 flex flex-col gap-y-2 ' >
                        <li className='hover:underline'><Link href="/" >Features</Link></li>
                        <li className='hover:underline'><Link href="/">Examples</Link></li>
                        <li className='hover:underline'><Link href="/">Tutorials</Link></li>
                        <li className='hover:underline'><Link href="/">Help Center</Link></li>
                    </ul>
                </div>
                <div className='ml-8  flex flex-col gap-y-3 '>
                    <h3 className='text-lg font-bold'>Company</h3>
                    <ul className='ml-2 flex flex-col gap-y-2 ' >
                        <li className='hover:underline'><Link href="/" >About Us</Link></li>
                        <li className='hover:underline'><Link href="/">Contact</Link></li>
                        <li className='hover:underline'><Link href="/">Privacy Policy</Link></li>
                        <li className='hover:underline'><Link href="/">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className=' h-[25%] w-full border-t border-gray-800 flex justify-center text-white items-center'>
            <p>Made with</p>
            <Heart className='mx-2 size-5 text-red-500 fill-red-500'/>
            <p>by Praveen kumar.</p>
        </div>
    </div>
  )
}

export default Footer