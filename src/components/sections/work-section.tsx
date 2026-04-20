import { useReveal } from "@/hooks/use-reveal"

const olympiads = [
  {
    number: "01",
    title: "Математика",
    category: "1–4 класс · Открыта до 15 мая",
    year: "2025",
    direction: "left",
  },
  {
    number: "02",
    title: "Русский язык",
    category: "1–8 класс · Открыта до 20 мая",
    year: "2025",
    direction: "right",
  },
  {
    number: "03",
    title: "Окружающий мир",
    category: "1–4 класс · Скоро",
    year: "2025",
    direction: "left",
  },
  {
    number: "04",
    title: "Английский язык",
    category: "3–8 класс · Открыта до 10 июня",
    year: "2025",
    direction: "right",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Олимпиады
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Ближайшие и текущие</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {olympiads.map((project, i) => (
            <OlympiadCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function OlympiadCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; year: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  const isOpen = project.category.includes("Открыта")

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/20 md:py-6 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "88%" : "93%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`hidden rounded-full px-3 py-1 font-mono text-xs md:inline-block ${
            isOpen
              ? "bg-foreground/15 text-foreground/80"
              : "bg-foreground/8 text-foreground/50"
          }`}
        >
          {isOpen ? "Открыта" : "Скоро"}
        </span>
        <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
      </div>
    </div>
  )
}
