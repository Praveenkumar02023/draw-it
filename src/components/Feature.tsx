import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ArrowUpLeft, Download, Move3D, Square, Type, Undo } from 'lucide-react'

const Feature = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center'>
        <div className='h-[30%] w-full pt-24 flex flex-col items-center' >
            <h1 className=' h-[55%] text-6xl font-bold  bg-gradient-to-r from-black via-violet-500 to-black text-center text-transparent bg-clip-text' >Everything You Need to Create</h1>
            <p className='w-[40%] text-center text-xl text-gray-600 flex flex-wrap' >Powerful features designed to make drawing and diagramming effortless and enjoyable</p>
        </div>
        <div className='pt-12 flex flex-wrap w-full gap-x-4 justify-center' >

            <Card className='h-[45%] p-12 w-[25%] hover:bg-gradient-to-br from-violet-50 via-blue-50 to-blue-50 transition-transform hover:scale-105'>
                <CardHeader className='w-full' >
                    <div className='flex w-full justify-center'>
                        <div className='h-14 w-14 rounded-lg bg-gradient-to-br from-black via-violet-200 to-black rotate-15'></div>
                     <div className='absolute h-14 w-14 rounded-lg flex items-center justify-center bg-white border border-gray-400 '><ArrowUpLeft/></div>
                    </div>
                    <CardTitle className='text-center pt-4 text-lg font-bold'>Precision Drawing</CardTitle>
                </CardHeader>
                <CardDescription>
                    <p className='text-center text-md'>Draw with pixel-perfect accuracy using our advanced drawing engine</p>
                </CardDescription>
            </Card>
            <Card className='h-[45%] p-12 w-[25%]  hover:bg-gradient-to-br from-violet-50 via-blue-50 to-blue-50 transition-transform hover:scale-105'>
                <CardHeader className='w-full ' >
                    <div className='flex w-full justify-center'>
                        <div className='h-14 w-14 rounded-lg bg-gradient-to-br from-black via-violet-200 to-black rotate-15'></div>
                     <div className='absolute h-14 w-14 rounded-lg flex items-center justify-center bg-white border border-gray-400 '><Square/></div>
                    </div>
                    <CardTitle className='text-center pt-4 text-lg font-bold'>Shape Tools</CardTitle>
                </CardHeader>
                <CardDescription>
                    <p className='text-center text-md'>Perfect rectangles, circles, arrows, and custom shapes at your fingertips</p>
                </CardDescription>
            </Card>
            <Card className='h-[45%] p-12 w-[25%] hover:bg-gradient-to-br from-violet-50 via-blue-50 to-blue-50transition-transform hover:scale-105'>
                <CardHeader className='w-full ' >
                    <div className='flex w-full justify-center'>
                        <div className='h-14 w-14 rounded-lg bg-gradient-to-br from-black via-violet-200 to-black rotate-15'></div>
                     <div className='absolute h-14 w-14 rounded-lg flex items-center justify-center bg-white border border-gray-400 '><Type/></div>
                    </div>
                    <CardTitle className='text-center pt-4 text-lg font-bold'>Text & Typography</CardTitle>
                </CardHeader>
                <CardDescription>
                    <p className='text-center text-md'>Add beautiful text with multiple fonts, sizes, and styling options</p>
                </CardDescription>
            </Card>
            <Card className='h-[45%] p-12 w-[25%]  hover:bg-gradient-to-br from-violet-50 via-blue-50 to-blue-50 transition-transform hover:scale-105'>
                <CardHeader className='w-full ' >
                    <div className='flex w-full justify-center'>
                        <div className='h-14 w-14 rounded-lg bg-gradient-to-br from-black via-violet-200 to-black rotate-15'></div>
                     <div className='absolute h-14 w-14 rounded-lg flex items-center justify-center bg-white border border-gray-400 '><Move3D/></div>
                    </div>
                    <CardTitle className='text-center pt-4 text-lg font-bold'>Transform Objects</CardTitle>
                </CardHeader>
                <CardDescription>
                    <p className='text-center text-md'>Resize, rotate, and position elements with intuitive controls</p>
                </CardDescription>
            </Card>
            <Card className='h-[45%] p-12 w-[25%]  hover:bg-gradient-to-br from-violet-50 via-blue-50 to-blue-50 transition-transform hover:scale-105'>
                <CardHeader className='w-full ' >
                    <div className='flex w-full justify-center'>
                        <div className='h-14 w-14 rounded-lg bg-gradient-to-br from-black via-violet-200 to-black rotate-15'></div>
                     <div className='absolute h-14 w-14 rounded-lg flex items-center justify-center bg-white border border-gray-400 '><Undo/></div>
                    </div>
                    <CardTitle className='text-center pt-4 text-lg font-bold'>Unlimited Undo</CardTitle>
                </CardHeader>
                <CardDescription>
                    <p className='text-center text-md'>Never lose your work with comprehensive undo/redo functionality</p>
                </CardDescription>
            </Card>
            <Card className='h-[45%] p-12 w-[25%]  hover:bg-gradient-to-br from-violet-50 via-blue-50 to-blue-50 transition-transform hover:scale-105'>
                <CardHeader className='w-full ' >
                    <div className='flex w-full justify-center'>
                    <div className='h-14 w-14 rounded-lg bg-gradient-to-br from-black via-violet-200 to-black rotate-15'></div>
                     <div className='absolute h-14 w-14 rounded-lg flex items-center justify-center bg-white border border-gray-400 '><Download/></div>
                    </div>
                    <CardTitle className='text-center pt-4 text-lg font-bold'>Export Options</CardTitle>
                </CardHeader>
                <CardDescription>
                    <p className='text-center text-md'>Save as PNG, SVG, or PDF - perfect for any use case</p>
                </CardDescription>
            </Card>

        </div>

    </div>
  )
}

export default Feature