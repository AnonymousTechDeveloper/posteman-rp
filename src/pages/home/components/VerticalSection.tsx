"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  name: string
  tech: string
}

interface Vertical {
  name: string
  description: string
  projects: Project[]
}

interface VerticalSectionProps {
  vertical: Vertical
  index: number
}

export default function VerticalSection({ vertical, index }: VerticalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const description = descriptionRef.current
    const cards = cardsRef.current

    if (!section || !title || !description || !cards) return

    // Set initial states
    gsap.set([title, description], { opacity: 0, y: 50 })
    gsap.set(cards.children, { opacity: 0, y: 30, scale: 0.9 })

    // Create timeline for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "left center",
        end: "right center",
        toggleActions: "play none none reverse",
        horizontal: true,
      },
    })

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        cards.children,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="h-screen w-screen bg-gray-950 text-white flex items-center justify-center p-4 md:p-8 flex-shrink-0"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8 md:mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-orange-400 text-balance"
          >
            {vertical.name}
          </h2>
          <p
            ref={descriptionRef}
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed text-pretty px-4"
          >
            {vertical.description}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-0"
        >
          {vertical.projects.map((project, projectIndex) => (
            <Card
              key={projectIndex}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105 group"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg md:text-xl group-hover:text-orange-300 transition-colors duration-300">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-orange-300 font-medium text-sm md:text-base">
                  {project.tech}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500 group-hover:from-orange-400 group-hover:to-orange-300"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
