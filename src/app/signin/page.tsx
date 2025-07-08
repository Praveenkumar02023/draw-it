"use client"
import axios from 'axios'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { KeyRoundIcon, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'





const SignIn = () => {


    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const router = useRouter();


    const handleSignin = async() => {

        const response = await axios.post(`/api/user/signin`,{
            
            email : emailRef.current?.value,
            password : passwordRef.current?.value
            
        });

        if(response.status == 200){
            router.push('/create-room');
        }else{
            alert(response.data.message);
        }
    }

  return (
    <div className='relative h-screen w-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-cyan-50 to-blue-50' >

        <div className='h-full w-full absolute inset-0'>
            <div className='absolute bottom-40 right-20 h-24 w-24 rounded-full bg-violet-300 blur-2xl animate-pulse'></div>
            <div className='absolute bottom-40 left-70 h-48 w-48 rounded-full bg-cyan-200 blur-2xl animate-pulse'></div>
            <div className='absolute top-10 right-80 h-16 w-16 rounded-full bg-blue-300 blur-2xl animate-pulse'></div>
            <div className='absolute top-40 left-20 h-24 w-24 rounded-full bg-blue-300 blur-2xl animate-pulse'></div>
        </div>

        <Card className='relative h-[45%] w-[25%] flex items-center '>
            <CardHeader className='w-full'>
                <CardTitle className='w-full text-2xl text-center font-semibold ' >Sign In to your account</CardTitle>
            </CardHeader>
            <CardContent className='w-[80%]'>
                <h2 className='ml-1 flex items-center gap-x-1 justify-start'>{<Mail className='size-4' />} Email</h2>
                <Input ref={emailRef} className='mt-2' type='email' placeholder="Email" ></Input>
            </CardContent>
            <CardContent className='w-[80%]'>
                <h2 className='ml-1 flex items-center gap-x-1 justify-start'>{<KeyRoundIcon className='size-4' />} Password</h2>
                <Input ref={passwordRef} className='mt-2' type='password' placeholder="Password" />
            </CardContent>
            <CardFooter className='gap-y-4 flex flex-col items-center justify-center w-full'>
                <Button onClick={handleSignin} className='font-semibold w-[80%] text-md cursor-pointer hover:bg-gray-800'>
                    Sign In
                </Button>
                <h2 className='text-sm ' >
                    Don't have an account? <Link className='text-violet-600 hover:underline' href="/signup">Sign Up</Link>
                </h2>
            </CardFooter>
        </Card>

    </div>
  )
}

export default SignIn