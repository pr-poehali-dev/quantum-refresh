import { useState } from "react"
import { GrainOverlay } from "@/components/grain-overlay"
import { PageNav } from "@/components/page-nav"
import Icon from "@/components/ui/icon"
import { TEACHER_STUDENTS, OLYMPIADS, COURSES } from "@/data/catalog"

type Tab = "students" | "olympiads" | "courses"

export default function ProfileTeacher() {
  const [tab, setTab] = useState<Tab>("students")

  const myCourses    = COURSES.slice(0, 3)
  const openOlympiads = OLYMPIADS.filter((o) => o.status === "open")

  const totalDiplomas = TEACHER_STUDENTS.reduce((s, st) => s + st.diplomas, 0)
  const totalStudents = TEACHER_STUDENTS.length

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-background to-yellow-950/30" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-green-800/15 blur-3xl" />
      </div>

      <PageNav />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 md:pt-36">

        {/* Profile card */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 flex flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md duration-700 md:flex-row md:items-center md:p-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-foreground/10 text-4xl">
            👩‍🏫
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h1 className="font-sans text-2xl font-light text-foreground md:text-3xl">Наталья Петровна Сорокина</h1>
              <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-0.5 font-mono text-xs text-yellow-300">Педагог</span>
            </div>
            <p className="font-mono text-xs text-foreground/40">Математика · Стаж 12 лет · Клевер Маинд с 2024</p>
          </div>
          <button className="flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/40 hover:text-foreground">
            <Icon name="Settings" size={13} />Настройки
          </button>
        </div>

        {/* Stats */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 grid grid-cols-2 gap-3 duration-700 delay-100 md:grid-cols-4">
          {[
            { icon: "Users",       label: "Учеников",       value: totalStudents, color: "text-green-400" },
            { icon: "Trophy",      label: "Дипломов выдано",value: totalDiplomas, color: "text-yellow-300" },
            { icon: "BookOpen",    label: "Курсов",         value: myCourses.length, color: "text-orange-400" },
            { icon: "Calendar",    label: "Олимпиад",       value: openOlympiads.length, color: "text-foreground/70" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4 text-center backdrop-blur-md">
              <Icon name={s.icon as "Users"} size={18} className={`mx-auto mb-2 ${s.color}`} />
              <p className={`font-sans text-2xl font-light ${s.color}`}>{s.value}</p>
              <p className="font-mono text-xs text-foreground/40">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-6 flex w-fit gap-1 rounded-full border border-foreground/10 bg-foreground/5 p-1 backdrop-blur-md duration-700 delay-150">
          {([
            ["students",  "Мои ученики",   "Users"],
            ["olympiads", "Олимпиады",     "Calendar"],
            ["courses",   "Мои курсы",     "BookOpen"],
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

        {/* Students tab */}
        {tab === "students" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 duration-500">
            <div className="flex justify-between items-center mb-4">
              <p className="font-mono text-xs text-foreground/40">Всего учеников: {totalStudents}</p>
              <button className="flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-1.5 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/30 hover:text-foreground/70">
                <Icon name="UserPlus" size={12} />
                Добавить ученика
              </button>
            </div>
            {TEACHER_STUDENTS.map((s, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-5 py-4 backdrop-blur-md transition-all hover:border-foreground/20">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 font-mono text-xs text-foreground/60">
                  {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-sans text-sm text-foreground">{s.name}</p>
                  <p className="font-mono text-xs text-foreground/40">{s.grade}</p>
                </div>
                <div className="hidden text-right md:block">
                  <p className="font-mono text-xs text-foreground/40">Активность</p>
                  <p className="font-mono text-xs text-foreground/60">{s.lastActivity}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-yellow-300/10 px-2.5 py-1 font-mono text-xs text-yellow-300">
                  <Icon name="Trophy" size={10} />
                  {s.diplomas}
                </div>
                <button className="rounded-full border border-foreground/15 p-2 text-foreground/40 transition-all hover:border-foreground/30 hover:text-foreground/70">
                  <Icon name="ChevronRight" size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Olympiads tab */}
        {tab === "olympiads" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 duration-500">
            <p className="mb-4 font-mono text-xs text-foreground/40">Открытые олимпиады для ваших учеников</p>
            {openOlympiads.map((o) => (
              <div key={o.id} className="flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-5 py-4 backdrop-blur-md transition-all hover:border-foreground/20">
                <span className="text-2xl">{o.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-sans text-sm text-foreground">{o.title}</p>
                  <p className="font-mono text-xs text-foreground/40">{o.grades} · до {o.dateEnd}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-foreground/50">{o.participants} уч.</p>
                </div>
                <button className="rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 font-mono text-xs text-foreground/70 transition-all hover:bg-foreground/20 hover:text-foreground">
                  Зарегистрировать класс
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Courses tab */}
        {tab === "courses" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 duration-500">
            <div className="flex justify-between items-center mb-4">
              <p className="font-mono text-xs text-foreground/40">Ваши курсы</p>
              <button className="flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-1.5 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/30 hover:text-foreground/70">
                <Icon name="Plus" size={12} />
                Создать курс
              </button>
            </div>
            {myCourses.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-5 py-4 backdrop-blur-md transition-all hover:border-foreground/20">
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-sans text-sm text-foreground">{c.title}</p>
                  <p className="font-mono text-xs text-foreground/40">{c.grades} · {c.lessons} занятий</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-foreground/50">{c.price.toLocaleString("ru")} ₽/мес</p>
                  <p className="font-mono text-xs text-foreground/30">{c.format === "group" ? "Группа" : "Индив."}</p>
                </div>
                <button className="rounded-full border border-foreground/15 p-2 text-foreground/40 transition-all hover:border-foreground/30 hover:text-foreground/70">
                  <Icon name="Edit" size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
