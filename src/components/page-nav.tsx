import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"

export function PageNav() {
  const navigate = useNavigate()
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 transition-transform hover:scale-105">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
          <span className="text-xl">🍀</span>
        </div>
        <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Клевер Маинд</span>
      </button>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/olympiads")} className="hidden font-mono text-xs text-foreground/50 transition-colors hover:text-foreground md:block">Олимпиады</button>
        <button onClick={() => navigate("/courses")}   className="hidden font-mono text-xs text-foreground/50 transition-colors hover:text-foreground md:block">Курсы</button>
        <button onClick={() => navigate("/results")}   className="hidden font-mono text-xs text-foreground/50 transition-colors hover:text-foreground md:block">Результаты</button>
        <MagneticButton variant="secondary" onClick={() => navigate("/profile/student")}>Личный кабинет</MagneticButton>
      </div>
    </nav>
  )
}
