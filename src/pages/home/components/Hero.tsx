"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Star from "./Star"

export default function Hero() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  const handleSignIn = () => {}

  useEffect(() => {
    const button = buttonRef.current
    const stars = starsRef.current

    if (button) {
      // Initial state - button hidden and scaled down
      gsap.set(button, {
        opacity: 0,
        scale: 0.8,
        y: 50,
      })

      // Animate button entrance
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "back.out(1.7)",
      })
    }

    if (stars) {
      // Animate stars container entrance
      gsap.fromTo(
        stars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        },
      )
    }
  }, [])

  return (
    <section className="h-screen w-screen relative bg-gray-950 overflow-hidden">
      <div ref={starsRef} className="fixed h-full w-full left-0 right-0 top-0">
        {Array(50)
          .fill(null)
          .map((_, index) => (
            <Star key={index} />
          ))}
      </div>
      {/* <div className="">
        <img className="" src="./logo.png" />
      </div> */}
      <div className="">
        <h1>BITS x Postman</h1>
        <h3>API & Coding Innovation Lab</h3>
        <h2>Recruitments Portal</h2>
      </div>
      <div className="absolute w-1/4 top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2">
        <img className="w-full h-full" src="./astronaut.webp" />
      </div>
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
        {/* <GoogleLogin onSuccess={handleLogin} theme="filled_black" /> */}
        <button
          ref={buttonRef}
          className="group relative bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 px-8 py-4 md:px-10 md:py-5 rounded-2xl border border-orange-400/30 text-white font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 active:scale-95 backdrop-blur-sm"
          onClick={handleSignIn}
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-600/20 to-orange-500/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
        </button>
      </div>
    </section>
  )
}
