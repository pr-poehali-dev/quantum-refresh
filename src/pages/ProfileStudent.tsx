import { useState } from "react"
import { GrainOverlay } from "@/components/grain-overlay"
import { PageNav } from "@/components/page-nav"
import Icon from "@/components/ui/icon"
import { STUDENT_DIPLOMAS, OLYMPIADS, COURSES } from "@/data/catalog"

const statusCfg = {
  winner:      { label: "Победитель", color: "text-yellow-300",    bg: "bg-yellow-300/15",  icon: "Trophy" as const },
  prize:       { label: "Призёр",     color: "text-foreground/80", bg: "bg-foreground/10",  icon: "Medal"  as const },
  participant: { label: "Участник",   color: "text-foreground/50", bg: "bg-foreground/8",   icon: "Star"   as const },
}

const placeEmoji: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

type Tab = "diplomas" | "olympiads" | "courses"

export default function ProfileStudent() {
  const [tab, setTab] = useState<Tab>("diplomas")

  const openOlympiads = OLYMPIADS.filter((o) => o.status === "open").slice(0, 4)
  const myCourses = COURSES.slice(0, 2)

  const wins   = STUDENT_DIPLOMAS.filter((d) => d.status === "winner").length
  const prizes = STUDENT_DIPLOMAS.filter((d) => d.status === "prize").length
  const total  = STUDENT_DIPLOMAS.length
  const avgScore = Math.round(STUDENT_DIPLOMAS.reduce((s, d) => s + d.score, 0) / total)

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-background to-yellow-950/30" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-green-800/15 blur-3xl" />
      </div>

      <PageNav />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 md:pt-36">

        {/* Profile card */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 flex flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md duration-700 md:flex-row md:items-center md:p-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-foreground/10 text-4xl">
            🎒
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h1 className="font-sans text-2xl font-light text-foreground md:text-3xl">Иванова Мария Сергеевна</h1>
              <span className="rounded-full border border-green-400/30 bg-green-400/10 px-2.5 py-0.5 font-mono text-xs text-green-400">Ученик</span>
            </div>
            <p className="font-mono text-xs text-foreground/40">4 класс · Школа №42, Москва</p>
          </div>
          <button className="flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/40 hover:text-foreground">
            <Icon name="Settings" size={13} />Настройки
          </button>
        </div>

        {/* Stats */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 grid grid-cols-2 gap-3 duration-700 delay-100 md:grid-cols-4">
          {[
            { icon: "Trophy", label: "Побед",       value: wins,     color: "text-yellow-300" },
            { icon: "Medal",  label: "Призовых",    value: prizes,   color: "text-foreground/70" },
            { icon: "Star",   label: "Олимпиад",    value: total,    color: "text-green-400" },
            { icon: "Zap",    label: "Средний балл",value: avgScore, color: "text-orange-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4 text-center backdrop-blur-md">
              <Icon name={s.icon as "Trophy"} size={18} className={`mx-auto mb-2 ${s.color}`} />
              <p className={`font-sans text-2xl font-light ${s.color}`}>{s.value}</p>
              <p className="font-mono text-xs text-foreground/40">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-6 flex gap-1 w-fit rounded-full border border-foreground/10 bg-foreground/5 p-1 backdrop-blur-md duration-700 delay-150">
          {([
            ["diplomas",  "Мои дипломы",   "Award"],
            ["olympiads", "Доступные",      "Calendar"],
            ["courses",   "Мои курсы",      "BookOpen"],
          ] as const).map(([t, label, icon]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs transition-all duration-300 ${
                tab === t ? "bg-foreground text-background" : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <Icon name={icon} size={11} />
              {label}
            </button>
          ))}
        </div>

        {/* Diplomas tab */}
        {tab === "diplomas" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 duration-500">
            {STUDENT_DIPLOMAS.map((d, i) => {
              const cfg = statusCfg[d.status]
              return (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-5 py-4 backdrop-blur-md transition-all hover:border-foreground/20">
                  <span className="text-2xl">{placeEmoji[d.place] ?? "🎓"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-sans text-sm text-foreground">{d.olympiadTitle}</p>
                    <p className="font-mono text-xs text-foreground/40">{d.subject} · {d.date}</p>
                  </div>
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs ${cfg.color} ${cfg.bg}`}>
                    <Icon name={cfg.icon} size={10} />
                    {cfg.label}
                  </span>
                  <div className="text-right">
                    <p className="font-sans text-lg font-light text-foreground">{d.score}</p>
                    <p className="font-mono text-xs text-foreground/30">балл</p>
                  </div>
                  <button className="rounded-full border border-foreground/15 p-2 text-foreground/40 transition-all hover:border-foreground/30 hover:text-foreground/70">
                    <Icon name="Download" size={13} />
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Available olympiads tab */}
        {tab === "olympiads" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 duration-500">
            {openOlympiads.map((o) => (
              <div key={o.id} className="flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-5 py-4 backdrop-blur-md transition-all hover:border-foreground/20">
                <span className="text-2xl">{o.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-sans text-sm text-foreground">{o.title}</p>
                  <p className="font-mono text-xs text-foreground/40">{o.subject} · {o.grades} · до {o.dateEnd}</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-green-400/10 px-2.5 py-1 font-mono text-xs text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Открыта
                </span>
                <button className="rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-mono text-xs text-foreground/70 transition-all hover:bg-foreground/20 hover:text-foreground">
                  Участвовать
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Courses tab */}
        {tab === "courses" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 duration-500">
            {myCourses.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-5 py-4 backdrop-blur-md transition-all hover:border-foreground/20">
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-sans text-sm text-foreground">{c.title}</p>
                  <p className="font-mono text-xs text-foreground/40">{c.subject} · {c.teacher.split(" ")[0]} {c.teacher.split(" ")[1]}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-foreground/60">{c.lessons} занятий</p>
                  <p className="font-mono text-xs text-foreground/30">{c.duration}</p>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <button className="flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 py-2.5 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/30 hover:text-foreground/70">
                <Icon name="Plus" size={13} />
                Записаться на курс
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
