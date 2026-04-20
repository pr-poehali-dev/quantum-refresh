import { useState, useMemo } from "react"
import { GrainOverlay } from "@/components/grain-overlay"
import { PageNav } from "@/components/page-nav"
import Icon from "@/components/ui/icon"
import { COURSES, type CourseFormat, type CourseLevel } from "@/data/catalog"

const formatCfg: Record<CourseFormat, { label: string; icon: string }> = {
  group:      { label: "Группа",         icon: "Users" },
  individual: { label: "Индивидуально",  icon: "User" },
  self:       { label: "Самостоятельно", icon: "BookOpen" },
}

const levelCfg: Record<CourseLevel, { label: string; color: string }> = {
  beginner: { label: "Начальный", color: "text-green-400" },
  middle:   { label: "Средний",   color: "text-yellow-300" },
  advanced: { label: "Продвинутый", color: "text-orange-400" },
}

const SUBJECTS = ["Все предметы", "Математика", "Русский язык", "Английский язык", "Окружающий мир"]

export default function Courses() {
  const [subject, setSubject] = useState("Все предметы")
  const [format,  setFormat]  = useState<CourseFormat | "all">("all")

  const filtered = useMemo(() =>
    COURSES.filter((c) => {
      if (subject !== "Все предметы" && c.subject !== subject) return false
      if (format  !== "all"          && c.format  !== format)  return false
      return true
    }),
    [subject, format]
  )

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-background to-yellow-950/30" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-green-800/15 blur-3xl" />
        <div className="absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-yellow-700/10 blur-3xl" />
      </div>

      <PageNav />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-12 md:pt-36">

        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">📚 Курсы и репетиторство</p>
          </div>
          <h1 className="mb-2 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
            Курсы
          </h1>
          <p className="font-mono text-sm text-foreground/50">
            Групповые занятия и индивидуальное репетиторство
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

          {(["all", "group", "individual"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200 ${
                format === f
                  ? "border-foreground/40 bg-foreground/15 text-foreground"
                  : "border-foreground/10 text-foreground/40 hover:border-foreground/20 hover:text-foreground/60"
              }`}
            >
              {f !== "all" && <Icon name={formatCfg[f as CourseFormat].icon as "Users"} size={11} />}
              {f === "all" ? "Все форматы" : formatCfg[f as CourseFormat].label}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sans text-foreground/40">Нет курсов по выбранным фильтрам</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((c, i) => {
              const fmtCfg = formatCfg[c.format]
              const lvlCfg = levelCfg[c.level]
              return (
                <div
                  key={c.id}
                  className="group flex flex-col rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/8"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Top */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="text-3xl">{c.emoji}</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`font-mono text-xs ${lvlCfg.color}`}>{lvlCfg.label}</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-foreground/40">
                        <Icon name={fmtCfg.icon as "Users"} size={10} />
                        {fmtCfg.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-1 font-sans text-xl font-light text-foreground md:text-2xl">{c.title}</h3>
                  <p className="mb-1 font-mono text-xs text-foreground/40">{c.subject} · {c.grades}</p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/60">{c.description}</p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border border-foreground/10 px-2.5 py-0.5 font-mono text-xs text-foreground/40">{t}</span>
                    ))}
                  </div>

                  {/* Meta grid */}
                  <div className="mb-4 grid grid-cols-3 gap-2 border-t border-foreground/8 pt-4">
                    <div>
                      <p className="font-mono text-xs text-foreground/30">Длительность</p>
                      <p className="text-xs text-foreground/60">{c.duration}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-foreground/30">Занятий</p>
                      <p className="text-xs text-foreground/60">{c.lessons}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-foreground/30">От</p>
                      <p className="text-xs text-foreground/60">{c.price.toLocaleString("ru")} ₽/мес</p>
                    </div>
                  </div>

                  {/* Teacher */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/10 font-mono text-xs text-foreground/60">
                      {c.teacher.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <p className="font-mono text-xs text-foreground/50">{c.teacher}</p>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 py-2.5 font-mono text-xs text-foreground/80 transition-all hover:bg-foreground/20 hover:text-foreground">
                    <Icon name="ArrowRight" size={13} />
                    Записаться
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
