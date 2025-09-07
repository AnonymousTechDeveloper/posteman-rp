import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Star from "./Star"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const astronautRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin")
  }

  useEffect(() => {
    const button = buttonRef.current
    const stars = starsRef.current
    const title = titleRef.current
    const astronaut = astronautRef.current

    if (button) {
      gsap.set(button, {
        opacity: 0,
        scale: 0.8,
        y: 50,
      })

      gsap.to(button, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        delay: 1.5,
        ease: "back.out(1.7)",
      })
    }

    if (stars) {
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

    if (title) {
      const titleElements = title.children
      gsap.set(titleElements, {
        opacity: 0,
        y: 60,
        scale: 0.8,
      })

      gsap.to(titleElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.3,
        stagger: 0.2,
        ease: "back.out(1.4)",
      })
    }

    if (astronaut) {
      gsap.set(astronaut, {
        opacity: 0,
        x: 100,
        rotation: 10,
        scale: 0.8,
      })

      gsap.to(astronaut, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out",
      })

      gsap.to(astronaut, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        // delay: 2.3,
      })
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
      <div
        ref={titleRef}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-center lg:text-left z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent leading-tight">
          BITS x <span>Postman</span>
        </h1>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-2 tracking-wide">
          API & Coding Innovation Lab
        </h3>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-orange-400 tracking-wider">
          Recruitment Portal
        </h2>
      </div>
      <div
        ref={astronautRef}
        className="absolute top-1/2 right-8 lg:right-16 -translate-y-1/2 w-64 md:w-80 lg:w-96 z-10"
      >
        <img
          className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-110"
          src="./astronaut.webp"
          alt="Astronaut"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/20 blur-3xl -z-10 scale-150"></div>
      </div>
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
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
