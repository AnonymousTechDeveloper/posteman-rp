import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Server,
  Palette,
  Gamepad2,
  Brain,
  Zap,
  Calendar,
  Star,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers
} from "lucide-react"

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

const getVerticalConfig = (verticalName: string) => {
  const configs = {
    "Frontend": {
      icon: Code,
      primaryColor: "from-blue-500 to-cyan-400",
      secondaryColor: "from-blue-600 to-cyan-500",
      accentColor: "text-blue-400",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "hover:border-blue-400",
      shadowColor: "hover:shadow-blue-500/20",
      bgGradient: "from-blue-900/20 to-cyan-900/20",
      cardBg: "bg-gradient-to-br from-blue-900/30 to-cyan-900/30",
      progressColor: "from-blue-500 to-cyan-400"
    },
    "Backend": {
      icon: Server,
      primaryColor: "from-green-500 to-emerald-400",
      secondaryColor: "from-green-600 to-emerald-500",
      accentColor: "text-green-400",
      borderColor: "border-green-500/30",
      hoverBorderColor: "hover:border-green-400",
      shadowColor: "hover:shadow-green-500/20",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      cardBg: "bg-gradient-to-br from-green-900/30 to-emerald-900/30",
      progressColor: "from-green-500 to-emerald-400"
    },
    "Design": {
      icon: Palette,
      primaryColor: "from-pink-500 to-rose-400",
      secondaryColor: "from-pink-600 to-rose-500",
      accentColor: "text-pink-400",
      borderColor: "border-pink-500/30",
      hoverBorderColor: "hover:border-pink-400",
      shadowColor: "hover:shadow-pink-500/20",
      bgGradient: "from-pink-900/20 to-rose-900/20",
      cardBg: "bg-gradient-to-br from-pink-900/30 to-rose-900/30",
      progressColor: "from-pink-500 to-rose-400"
    },
    "Game Dev": {
      icon: Gamepad2,
      primaryColor: "from-purple-500 to-violet-400",
      secondaryColor: "from-purple-600 to-violet-500",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "hover:border-purple-400",
      shadowColor: "hover:shadow-purple-500/20",
      bgGradient: "from-purple-900/20 to-violet-900/20",
      cardBg: "bg-gradient-to-br from-purple-900/30 to-violet-900/30",
      progressColor: "from-purple-500 to-violet-400"
    },
    "AI/ML": {
      icon: Brain,
      primaryColor: "from-orange-500 to-amber-400",
      secondaryColor: "from-orange-600 to-amber-500",
      accentColor: "text-orange-400",
      borderColor: "border-orange-500/30",
      hoverBorderColor: "hover:border-orange-400",
      shadowColor: "hover:shadow-orange-500/20",
      bgGradient: "from-orange-900/20 to-amber-900/20",
      cardBg: "bg-gradient-to-br from-orange-900/30 to-amber-900/30",
      progressColor: "from-orange-500 to-amber-400"
    },
    "Neurotech": {
      icon: Zap,
      primaryColor: "from-yellow-500 to-lime-400",
      secondaryColor: "from-yellow-600 to-lime-500",
      accentColor: "text-yellow-400",
      borderColor: "border-yellow-500/30",
      hoverBorderColor: "hover:border-yellow-400",
      shadowColor: "hover:shadow-yellow-500/20",
      bgGradient: "from-yellow-900/20 to-lime-900/20",
      cardBg: "bg-gradient-to-br from-yellow-900/30 to-lime-900/30",
      progressColor: "from-yellow-500 to-lime-400"
    },
    "Events": {
      icon: Calendar,
      primaryColor: "from-red-500 to-pink-400",
      secondaryColor: "from-red-600 to-pink-500",
      accentColor: "text-red-400",
      borderColor: "border-red-500/30",
      hoverBorderColor: "hover:border-red-400",
      shadowColor: "hover:shadow-red-500/20",
      bgGradient: "from-red-900/20 to-pink-900/20",
      cardBg: "bg-gradient-to-br from-red-900/30 to-pink-900/30",
      progressColor: "from-red-500 to-pink-400"
    }
  }

  return configs[verticalName as keyof typeof configs] || configs["Frontend"]
}

const getCardDesign = (verticalName: string, projectIndex: number) => {
  const designs = {
    "Frontend": [
      { type: "modern", icon: Code, pattern: "grid" },
      { type: "minimal", icon: Layers, pattern: "dots" },
      { type: "glass", icon: Sparkles, pattern: "waves" }
    ],
    "Backend": [
      { type: "server", icon: Server, pattern: "circuits" },
      { type: "database", icon: Cpu, pattern: "hexagons" },
      { type: "api", icon: ArrowRight, pattern: "lines" }
    ],
    "Design": [
      { type: "creative", icon: Palette, pattern: "splashes" },
      { type: "artistic", icon: Star, pattern: "stars" },
      { type: "elegant", icon: Sparkles, pattern: "curves" }
    ],
    "Game Dev": [
      { type: "gaming", icon: Gamepad2, pattern: "pixels" },
      { type: "retro", icon: Star, pattern: "arcade" },
      { type: "futuristic", icon: Zap, pattern: "neon" }
    ],
    "AI/ML": [
      { type: "neural", icon: Brain, pattern: "neurons" },
      { type: "data", icon: Cpu, pattern: "matrix" },
      { type: "intelligent", icon: Sparkles, pattern: "particles" }
    ],
    "Neurotech": [
      { type: "neural", icon: Zap, pattern: "brainwaves" },
      { type: "scientific", icon: Cpu, pattern: "circuits" },
      { type: "futuristic", icon: Star, pattern: "pulses" }
    ],
    "Events": [
      { type: "celebration", icon: Calendar, pattern: "confetti" },
      { type: "networking", icon: Star, pattern: "connections" },
      { type: "dynamic", icon: Sparkles, pattern: "bursts" }
    ]
  }

  const verticalDesigns = designs[verticalName as keyof typeof designs] || designs["Frontend"]
  return verticalDesigns[projectIndex % verticalDesigns.length]
}

export default function VerticalSection({ vertical, index }: VerticalSectionProps) {
  const config = getVerticalConfig(vertical.name)
  const Icon = config.icon

  return (
    <section className={`h-screen w-screen text-white flex items-center justify-center p-4 md:p-8 flex-shrink-0 bg-gradient-to-br ${config.bgGradient}`}>
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.primaryColor} flex items-center justify-center mr-4`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${config.accentColor} text-balance`}>
              {vertical.name}
            </h2>
          </div>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed text-pretty px-4">
            {vertical.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-0">
          {vertical.projects.map((project, projectIndex) => {
            const design = getCardDesign(vertical.name, projectIndex)
            const DesignIcon = design.icon

            return (
              <Card
                key={projectIndex}
                className={`${config.cardBg} backdrop-blur-sm ${config.borderColor} ${config.hoverBorderColor} transition-all duration-300 hover:shadow-lg ${config.shadowColor} hover:scale-105 group relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  {design.pattern === "grid" && (
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle, ${config.accentColor.replace('text-', '')} 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }} />
                  )}
                  {design.pattern === "dots" && (
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle, ${config.accentColor.replace('text-', '')} 2px, transparent 2px)`,
                      backgroundSize: '30px 30px'
                    }} />
                  )}
                  {design.pattern === "waves" && (
                    <div className="w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${config.accentColor.replace('text-', '').replace('-', '')}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                  )}
                </div>

                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <DesignIcon className={`h-6 w-6 ${config.accentColor}`} />
                    <Badge className={`${config.primaryColor} text-white text-xs`}>
                      {design.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg md:text-xl group-hover:text-white transition-colors duration-300">
                    {project.name}
                  </CardTitle>
                  <CardDescription className={`${config.accentColor} font-medium text-sm md:text-base`}>
                    {project.tech}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${config.progressColor} rounded-full transition-all duration-500 group-hover:from-opacity-80 group-hover:to-opacity-60`}
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span className={config.accentColor}>Active</span>
                    </div>
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.primaryColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
