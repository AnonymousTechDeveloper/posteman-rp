"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "./components/Hero"
import VerticalSection from "./components/VerticalSection"

gsap.registerPlugin(ScrollTrigger)

const verticals = [
  {
    name: "Web Development",
    description:
      "The Web Development vertical serves as POSTMAN Lab's digital infrastructure backbone with nine active developers across three batches. The team operates across frontend and backend development, creating solutions that directly impact campus life. Focus areas include campus portals, API development, and participation in national hackathons.",
    projects: [
      {
        name: "Recruitment Portal",
        tech: "Serves 400+ first-year students with Three.js, Framer Motion, and GSAP animations on the landing page. Features interactive vertical selection, real-time status updates, and automated notifications. Represents the vertical's most successful user-facing project."
      },
      {
        name: "Student Academic Cell Website",
        tech: "Platform for academic resources and placement guidance with blog publishing capabilities. Built with React.js, Next.js, and Tailwind CSS supporting MDX content creation. Provides comprehensive resource library with advanced search functionality."
      },
      {
        name: "Placement Unit Portal (Ongoing)",
        tech: "Critical infrastructure for placement process including application tracking and preference submission. Handles high concurrent users with real-time updates and secure document management. Addresses complex scheduling and data consistency challenges."
      },
    ],
  },
  {
    name: "Game Development",
    description:
      "The Game Development vertical combines technical expertise with creative vision across ten active members from the 2023 and 2024 batches. The team has pivoted strategically from long-term projects to gamejam participation, addressing resource constraints while maximizing learning opportunities. Focus areas include traditional game development, AR/VR experiences, and competitive gamejam participation.",
    projects: [
      {
        name: "Eternal Abyss",
        tech: "Action-adventure souls-like dungeon crawler developed for IIT Gandhinagar's Amalthea Gamejam. Features four-player multiplayer, procedural dungeon generation, and sophisticated AI behaviors. Won 'Best Visuals and Graphics' award at the competition."
      },
      {
        name: "Spacetime Unchained",
        tech: "First-person shooter with linear narrative progression created for APOGEE 2024 Gamejam. Combines custom weapon systems with environmental storytelling and optimized performance. Demonstrates successful integration of story and gameplay mechanics."
      },
      {
        name: "StarWhales",
        tech: "Top-down pixel art game about a mechatronic whale collecting parts on planetary surfaces. Features custom pixel art assets, physics-based movement, and resource management mechanics. Published on itch.io with positive community reception."
      },
      {
        name: "AR Heritage Tour",
        tech: "Augmented reality tour of BITS Pilani library heritage center using marker tracking and 3D models. Includes interactive information panels, multi-language support, and accessibility features. Represents vertical's expansion into immersive technologies."
      },
    ],
  },
  {
    name: "AI/ML",
    description:
      "The vertical has incubated multiple high-impact projects, spanning applied AI, mental health, drones, and cutting-edge research. Our team focuses on developing next-generation AI solutions that address real-world challenges across healthcare, education, cybersecurity, and autonomous systems.",
    projects: [
      {
        name: "Audio AI Project",
        tech: "Focus: Developing next-gen speech and audio models for real-world use cases (voice enhancement, audio understanding, accessibility). Applications in healthcare, education, and assistive technology."
      },
      {
        name: "Story.ai (Mental Health Platform)",
        tech: "A platform blending AI + psychology to help users reflect, journal, and grow. Won a global hackathon with 1,500+ participants worldwide (including masters students & industry professionals). Demonstrates the lab's ability to compete globally (Global AI Agent League - Internationally 1st rank won cash price of 5000 dollars)."
      },
      {
        name: "Autonomous Drone Systems",
        tech: "Multipurpose drone applications: surveillance, agriculture, disaster management. Received the Arun K. Somani Research Fund for advancing autonomous navigation and computer vision integration."
      },
      {
        name: "AI Agents for Specialized Domains",
        tech: "Cybersecurity-focused AI agents capable of threat detection & vulnerability scanning. AI agents for full-stack education, offering personalized tutoring for computer science concepts."
      },
    ],
  },
  {
    name: "NeuroTech",
    description:
      "The Neurotechnology vertical democratizes brain-computer interface technology through open-source projects and educational workshops. Founded by four students from the 2023 batch and expanded with four members from the 2024 batch, the vertical has engaged over 250 students through outreach programs. The team focuses on developing low-cost neurotechnology solutions, building understanding of neural signal processing, and creating practical BCI applications.",
    projects: [
      {
        name: "OpenEEG System",
        tech: "A low-cost EEG device built using commercial components that matches or exceeds commercial system performance at a fraction of the cost. The system features multi-stage filtering, adjustable gain amplification up to 10,000x, and real-time FFT analysis capabilities. Successfully demonstrated superior alpha wave detection compared to commercial alternatives."
      },
      {
        name: "EMG Chrome Dino",
        tech: "An EMG-based controller allowing users to play the Chrome Dino game through muscle contractions. Achieves 95% jump detection accuracy with 120ms latency using dynamic threshold calibration and real-time signal processing. Serves as an engaging demonstration of human-computer interface principles."
      },
      {
        name: "DNA Sequence Analysis",
        tech: "Implementation of the Needleman-Wunsch algorithm for genetic sequence comparison using Python and NumPy. Handles sequences up to 10,000 base pairs with customizable scoring matrices and visualization tools. Provides foundation for computational biology applications in neuroscience research."
      },
      {
        name: "Neural Network Modeling",
        tech: "Hodgkin-Huxley model implementation simulating a complete reflex arc with sensory, inter, and motor neurons. Demonstrates synaptic transmission, reflex responses, and CNS modulation capabilities. Establishes platform for future work on Hebbian learning and spike-timing dependent plasticity."
      },
    ],
  },
  {
    name: "Video Production",
    description:
      "Supports all verticals through gameplay trailers, development documentaries, and tutorial videos for Game Development projects. Creates orientation videos introducing lab mission and vertical overviews for new members. Produces event coverage including BOSM curtain raiser and workshop recordings. Developed technical capabilities in editing, motion graphics, and multi-camera production.",
    projects: [
      {
        name: "Game Development Support",
        tech: "Creates gameplay trailers, development documentaries, and tutorial videos for Game Development projects. Provides comprehensive visual storytelling for game projects and technical documentation through video content."
      },
      {
        name: "Lab Orientation Videos",
        tech: "Produces orientation videos introducing lab mission and vertical overviews for new members. Creates engaging visual content that helps new members understand POSTMAN Lab's structure, goals, and opportunities across all verticals."
      },
      {
        name: "Event Coverage",
        tech: "Produces event coverage including BOSM curtain raiser and workshop recordings. Captures key moments from lab events, workshops, and competitions, creating lasting documentation and promotional content for the lab's activities."
      },
      {
        name: "Technical Production",
        tech: "Developed technical capabilities in editing, motion graphics, and multi-camera production. Maintains professional video production standards with advanced editing techniques, visual effects, and multi-camera setups for various types of content."
      },
    ],
  },
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for component to mount
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const container = containerRef.current
    const sections = sectionsRef.current

    if (!container || !sections) return

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    const getViewportWidth = () => window.innerWidth
    const totalWidth = verticals.length * getViewportWidth()

    // Set initial width
    gsap.set(sections, {
      width: totalWidth,
      x: 0
    })

    // Create horizontal scroll animation
    const scrollTween = gsap.to(sections, {
      x: () => -(totalWidth - getViewportWidth()),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth - getViewportWidth()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (verticals.length - 1),
          duration: 0.5,
          delay: 0.1,
        },
        onRefresh: () => {
          const newTotalWidth = verticals.length * getViewportWidth()
          gsap.set(sections, { width: newTotalWidth })
        },
      },
    })

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      scrollTween.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-950">
      <Hero />
      <div ref={containerRef} className="relative">
        <div
          ref={sectionsRef}
          className="flex"
          style={{
            height: "100vh",
            width: `${verticals.length * 100}vw`
          }}
        >
          {verticals.map((vertical, index) => (
            <div
              key={vertical.name}
              className="flex-shrink-0"
              style={{ width: "100vw" }}
            >
              <VerticalSection vertical={vertical} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
