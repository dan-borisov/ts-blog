// Hero Component
import React from 'react'
import hero from '../hero-image.jpg'

const Hero = () => {
  return (
    <div className="hero" style={{backgroundImage: `url(${hero.src})`, minHeight: '60vh'}}>
        <div className="hero-overlay bg-opacity-60"></div>
    </div>
  )
}

export default Hero