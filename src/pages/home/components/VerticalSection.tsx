import {
  Code,
  Server,
  Palette,
  Gamepad2,
  Brain,
  Zap,
  Calendar,
  Video
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
    "Web Development": {
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
    "Game Development": {
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
    "NeuroTech": {
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
    "Video Production": {
      icon: Video,
      primaryColor: "from-red-500 to-pink-400",
      secondaryColor: "from-red-600 to-pink-500",
      accentColor: "text-red-400",
      borderColor: "border-red-500/30",
      hoverBorderColor: "hover:border-red-400",
      shadowColor: "hover:shadow-red-500/20",
      bgGradient: "from-red-900/20 to-pink-900/20",
      cardBg: "bg-gradient-to-br from-red-900/30 to-pink-900/30",
      progressColor: "from-red-500 to-pink-400"
    },
  }

  return configs[verticalName as keyof typeof configs] || configs["Web Development"]
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-0">
          {vertical.projects.map((project, projectIndex) => (
            <div
              key={projectIndex}
              className={`${config.cardBg} backdrop-blur-sm ${config.borderColor} rounded-lg p-6 border-l-4 ${config.borderColor.replace('/30', '')} hover:${config.hoverBorderColor.replace('hover:', '')} transition-all duration-300`}
            >
              <h4 className={`text-xl font-semibold ${config.accentColor} mb-3`}>
                {project.name}
              </h4>
              <p className="text-gray-300 text-base leading-relaxed">
                {project.tech}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
