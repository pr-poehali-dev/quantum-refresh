import { useState, useMemo } from "react"
import { GrainOverlay } from "@/components/grain-overlay"
import { PageNav } from "@/components/page-nav"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"
import { OLYMPIADS, type OlympiadStatus } from "@/data/catalog"

const SUBJECTS = ["Все предметы", "Математика", "Русский язык", "Английский язык", "Окружающий мир", "Литература", "Биология", "История"]

const statusCfg: Record<OlympiadStatus, { label: string; color: string; bg: string; dot: string }> = {
  open:     { label: "Открыта",    color: "text-green-400",       bg: "bg-green-400/10",     dot: "bg-green-400" },
  soon:     { label: "Скоро",      color: "text-yellow-300",      bg: "bg-yellow-300/10",    dot: "bg-yellow-300" },
  finished: { label: "Завершена",  color: "text-foreground/40",   bg: "bg-foreground/8",     dot: "bg-foreground/30" },
}

export default function Olympiads() {
  const [subject, setSubject]   = useState("Все предметы")
  const [status,  setStatus]    = useState<OlympiadStatus | "all">("all")

  const filtered = useMemo(() =>
    OLYMPIADS.filter((o) => {
      if (subject !== "Все предметы" && o.subject !== subject) return false
      if (status  !== "all"          && o.status  !== status)  return false
      return true
    }),
    [subject, status]
  )

  const openCount = OLYMPIADS.filter((o) => o.status === "open").length

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-background to-yellow-950/30" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-green-800/15 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-yellow-700/10 blur-3xl" />
      </div>

      <PageNav />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-12 md:pt-36">

        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">🏆 Каталог олимпиад</p>
          </div>
          <h1 className="mb-2 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
            Олимпиады
          </h1>
          <p className="font-mono text-sm text-foreground/50">
            Сейчас открыто: <span className="text-green-400">{openCount}</span> из {OLYMPIADS.length}
          </p>
        </div>

        {/* Filters */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 flex flex-wrap gap-2 duration-700 delay-100">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="cursor-pointer rounded-full border border-foreground/20 bg-foreground/8 px-4 py-2 font-mono text-xs text-foreground/70 backdrop-blur-md focus:outline-none"
          >
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          {(["all", "open", "soon", "finished"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200 ${
                status === s
                  ? "border-foreground/40 bg-foreground/15 text-foreground"
                  : "border-foreground/10 text-foreground/40 hover:border-foreground/20 hover:text-foreground/60"
              }`}
            >
              {s === "all" ? "Все" : statusCfg[s].label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sans text-foreground/40">Нет олимпиад по выбранным фильтрам</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {filtered.map((o, i) => {
              const cfg = statusCfg[o.status]
              return (
                <div
                  key={o.id}
                  className="group flex flex-col rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/8"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Top row */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="text-3xl">{o.emoji}</span>
                    <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs ${cfg.color} ${cfg.bg}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${o.status === "open" ? "animate-pulse" : ""}`} />
                      {cfg.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 font-sans text-xl font-light text-foreground transition-colors group-hover:text-foreground/90 md:text-2xl">
                    {o.title}
                  </h3>
                  <p className="mb-1 font-mono text-xs text-foreground/40">{o.subject} · {o.grades}</p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/60">{o.description}</p>

                  {/* Meta */}
                  <div className="mb-4 grid grid-cols-2 gap-2 border-t border-foreground/8 pt-4">
                    <div>
                      <p className="font-mono text-xs text-foreground/30">Период</p>
                      <p className="text-xs text-foreground/60">{o.dateStart} — {o.dateEnd}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-foreground/30">Участников</p>
                      <p className="text-xs text-foreground/60">{o.participants > 0 ? o.participants : "Регистрация скоро"}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  {o.status === "open" && (
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 py-2.5 font-mono text-xs text-foreground/80 transition-all hover:bg-foreground/20 hover:text-foreground">
                      <Icon name="ArrowRight" size={13} />
                      Принять участие
                    </button>
                  )}
                  {o.status === "soon" && (
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/10 py-2.5 font-mono text-xs text-foreground/40 transition-all hover:border-foreground/20 hover:text-foreground/60">
                      <Icon name="Bell" size={13} />
                      Уведомить об открытии
                    </button>
                  )}
                  {o.status === "finished" && (
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/8 py-2.5 font-mono text-xs text-foreground/30">
                      <Icon name="CheckCircle" size={13} />
                      Завершена
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
