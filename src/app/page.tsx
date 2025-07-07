import React from 'react'
import Hero from "../components/Hero"
import Feature from "../components/Feature"
import Testimonial from "../components/Testimonial"
import Footer from "../components/Footer"


const page = () => {
  return (
    <div>
        <Hero/>
        <Feature/>
        <Testimonial/>
        <Footer/>
    </div>
  )
}

export default page