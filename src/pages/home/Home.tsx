"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "./components/Hero"
import VerticalSection from "./components/VerticalSection"

gsap.registerPlugin(ScrollTrigger)

const verticals = [
  {
    name: "Frontend",
    description:
      "Building beautiful, responsive, and interactive user interfaces using modern frameworks like React, Vue, and Angular. We focus on creating seamless user experiences with cutting-edge web technologies.",
    projects: [
      { name: "E-commerce Dashboard", tech: "React, TypeScript, Tailwind" },
      { name: "Social Media App", tech: "Next.js, Framer Motion" },
      { name: "Portfolio Website", tech: "Vue.js, GSAP" },
    ],
  },
  {
    name: "Backend",
    description:
      "Developing robust server-side applications, APIs, and database architectures. We work with Node.js, Python, Java, and cloud technologies to build scalable backend systems.",
    projects: [
      { name: "REST API Gateway", tech: "Node.js, Express, MongoDB" },
      { name: "Microservices Architecture", tech: "Python, FastAPI, Docker" },
      { name: "Real-time Chat System", tech: "Socket.io, Redis" },
    ],
  },
  {
    name: "Design",
    description:
      "Creating stunning visual designs, user interfaces, and brand identities. Our design team specializes in UI/UX design, graphic design, and creating cohesive design systems.",
    projects: [
      { name: "Mobile App UI Kit", tech: "Figma, Adobe XD" },
      { name: "Brand Identity System", tech: "Illustrator, Photoshop" },
      { name: "Design System Library", tech: "Figma, Storybook" },
    ],
  },
  {
    name: "Game Dev",
    description:
      "Developing engaging games across multiple platforms using Unity, Unreal Engine, and web technologies. From mobile games to VR experiences, we bring creative ideas to life.",
    projects: [
      { name: "2D Platformer Game", tech: "Unity, C#" },
      { name: "VR Experience", tech: "Unreal Engine, Blueprint" },
      { name: "Web-based Puzzle Game", tech: "JavaScript, Canvas API" },
    ],
  },
  {
    name: "AI/ML",
    description:
      "Implementing artificial intelligence and machine learning solutions to solve real-world problems. We work with TensorFlow, PyTorch, and various AI frameworks to build intelligent systems.",
    projects: [
      { name: "Image Classification Model", tech: "TensorFlow, Python" },
      { name: "Natural Language Processor", tech: "PyTorch, Transformers" },
      { name: "Recommendation System", tech: "Scikit-learn, Pandas" },
    ],
  },
  {
    name: "Neurotech",
    description:
      "Exploring the intersection of neuroscience and technology. We develop brain-computer interfaces, neural signal processing systems, and applications for neuroscience research.",
    projects: [
      { name: "EEG Signal Analyzer", tech: "Python, MNE, NumPy" },
      { name: "Brain-Computer Interface", tech: "OpenBCI, Arduino" },
      { name: "Neurofeedback System", tech: "MATLAB, Signal Processing" },
    ],
  },
  {
    name: "Events",
    description:
      "Organizing hackathons, workshops, tech talks, and networking events. We bring the tech community together through engaging events that foster learning and collaboration.",
    projects: [
      { name: "Annual Hackathon", tech: "Event Management, Sponsorship" },
      { name: "Tech Talk Series", tech: "Speaker Coordination, AV Setup" },
      { name: "Workshop Program", tech: "Curriculum Design, Mentorship" },
    ],
  },
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const sections = sectionsRef.current

    if (!container || !sections) return

    const getViewportWidth = () => window.innerWidth
    const totalWidth = verticals.length * getViewportWidth()

    gsap.set(sections, { width: totalWidth })

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
        refreshPriority: -1,
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
  }, [])

  return (
    <div className="overflow-x-hidden w-full bg-gray-950">
      <Hero />
      <div ref={containerRef} className="relative">
        <div ref={sectionsRef} className="flex" style={{ height: "100vh" }}>
          {verticals.map((vertical, index) => (
            <div key={vertical.name} className="flex-shrink-0" style={{ width: "100vw" }}>
              <VerticalSection vertical={vertical} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
