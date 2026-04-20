import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

type Status = "winner" | "prize" | "participant"

type Participant = {
  id: string
  name: string
  subject: string
  grade: string
  place: number
  score: number
  date: string
  status: Status
  school: string
}

const ALL_DATA: Participant[] = [
  { id: "KM-2025-001", name: "Иванова Мария Сергеевна",    subject: "Математика",      grade: "4 класс", place: 1,  score: 98, date: "15 апр 2025", status: "winner",      school: "Школа №42, Москва" },
  { id: "KM-2025-002", name: "Петров Алексей Дмитриевич",  subject: "Русский язык",     grade: "6 класс", place: 2,  score: 94, date: "10 апр 2025", status: "prize",       school: "Гимназия №7, СПб" },
  { id: "KM-2025-003", name: "Сидорова Анна Игоревна",     subject: "Окружающий мир",   grade: "3 класс", place: 8,  score: 76, date: "5 апр 2025",  status: "participant", school: "Лицей №1, Казань" },
  { id: "KM-2025-004", name: "Козлов Дмитрий Павлович",    subject: "Математика",       grade: "5 класс", place: 1,  score: 100, date: "15 апр 2025", status: "winner",     school: "Школа №15, Новосибирск" },
  { id: "KM-2025-005", name: "Морозова Екатерина Олеговна",subject: "Английский язык",  grade: "7 класс", place: 3,  score: 91, date: "12 апр 2025", status: "prize",       school: "Гимназия №3, Екатеринбург" },
  { id: "KM-2025-006", name: "Новиков Артём Сергеевич",    subject: "Математика",       grade: "4 класс", place: 2,  score: 96, date: "15 апр 2025", status: "prize",       school: "Школа №42, Москва" },
  { id: "KM-2025-007", name: "Фёдорова Полина Андреевна",  subject: "Русский язык",     grade: "6 класс", place: 1,  score: 97, date: "10 апр 2025", status: "winner",      school: "Лицей №2, Краснодар" },
  { id: "KM-2025-008", name: "Смирнов Иван Николаевич",    subject: "Окружающий мир",   grade: "2 класс", place: 1,  score: 99, date: "5 апр 2025",  status: "winner",      school: "Школа №9, Воронеж" },
  { id: "KM-2025-009", name: "Белова Дарья Максимовна",    subject: "Английский язык",  grade: "8 класс", place: 1,  score: 100, date: "12 апр 2025", status: "winner",     school: "Школа №18, Самара" },
  { id: "KM-2025-010", name: "Орлов Никита Владимирович",  subject: "Математика",       grade: "8 класс", place: 3,  score: 89, date: "15 апр 2025", status: "prize",       school: "Гимназия №11, Уфа" },
  { id: "KM-2025-011", name: "Попова Виктория Ивановна",   subject: "Русский язык",     grade: "4 класс", place: 2,  score: 93, date: "10 апр 2025", status: "prize",       school: "Лицей №5, Пермь" },
  { id: "KM-2025-012", name: "Захаров Егор Александрович", subject: "Окружающий мир",   grade: "3 класс", place: 2,  score: 95, date: "5 апр 2025",  status: "prize",       school: "Школа №22, Тюмень" },
]

const SUBJECTS = ["Все предметы", "Математика", "Русский язык", "Окружающий мир", "Английский язык"]
const GRADES   = ["Все классы", "1 класс", "2 класс", "3 класс", "4 класс", "5 класс", "6 класс", "7 класс", "8 класс"]

const statusConfig = {
  winner:      { label: "Победитель", color: "text-yellow-300",    bg: "bg-yellow-300/15",  icon: "Trophy" as const },
  prize:       { label: "Призёр",     color: "text-foreground/80", bg: "bg-foreground/10",  icon: "Medal"  as const },
  participant: { label: "Участник",   color: "text-foreground/50", bg: "bg-foreground/8",   icon: "Star"   as const },
}

const placeStyle: Record<number, string> = {
  1: "text-yellow-300",
  2: "text-foreground/70",
  3: "text-amber-500",
}

const placeEmoji: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

type Tab = "search" | "rating"

export default function Results() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("rating")

  // Search state
  const [query, setQuery]       = useState("")
  const [searched, setSearched] = useState(false)
  const [results, setResults]   = useState<Participant[]>([])
  const [loading, setLoading]   = useState(false)

  // Rating state
  const [filterSubject, setFilterSubject] = useState("Все предметы")
  const [filterGrade, setFilterGrade]     = useState("Все классы")
  const [filterStatus, setFilterStatus]   = useState<Status | "all">("all")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setSearched(false)
    await new Promise((r) => setTimeout(r, 700))
    const q = query.toLowerCase()
    setResults(ALL_DATA.filter((d) => d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)))
    setSearched(true)
    setLoading(false)
  }

  const ratingData = useMemo(() => {
    return ALL_DATA
      .filter((d) => {
        if (filterSubject !== "Все предметы" && d.subject !== filterSubject) return false
        if (filterGrade   !== "Все классы"   && d.grade   !== filterGrade)   return false
        if (filterStatus  !== "all"           && d.status  !== filterStatus)  return false
        return true
      })
      .sort((a, b) => b.score - a.score)
  }, [filterSubject, filterGrade, filterStatus])

  const winners   = ALL_DATA.filter((d) => d.status === "winner").length
  const prizes    = ALL_DATA.filter((d) => d.status === "prize").length
  const total     = ALL_DATA.length

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-background to-yellow-950/30" />
        <div className="absolute left-1/3 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-800/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-yellow-700/15 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="text-xl">🍀</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Клевер Маинд</span>
        </button>
        <MagneticButton variant="secondary" onClick={() => navigate("/")}>На главную</MagneticButton>
      </nav>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 md:pt-36">

        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">Результаты и награды</p>
          </div>
          <h1 className="mb-3 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
            Рейтинг
            <br />
            <span className="text-foreground/40">участников</span>
          </h1>
        </div>

        {/* Stats row */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 grid grid-cols-3 gap-3 duration-700 delay-100 md:gap-4">
          {[
            { icon: "Trophy", label: "Победителей", value: winners,  color: "text-yellow-300" },
            { icon: "Medal",  label: "Призёров",    value: prizes,   color: "text-foreground/70" },
            { icon: "Users",  label: "Участников",  value: total,    color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md md:p-5">
              <Icon name={s.icon as "Trophy"} size={18} className={`mb-2 ${s.color}`} />
              <p className={`font-sans text-2xl font-light md:text-3xl ${s.color}`}>{s.value}</p>
              <p className="font-mono text-xs text-foreground/40">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 flex gap-1 rounded-full border border-foreground/10 bg-foreground/5 p-1 duration-700 delay-150 w-fit backdrop-blur-md">
          {([["rating", "Рейтинг", "BarChart3"], ["search", "Поиск диплома", "Search"]] as const).map(([t, label, icon]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs transition-all duration-300 ${
                tab === t
                  ? "bg-foreground text-background"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <Icon name={icon as "Search"} size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* ── RATING TAB ── */}
        {tab === "rating" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="rounded-full border border-foreground/20 bg-foreground/8 px-4 py-2 font-mono text-xs text-foreground/70 backdrop-blur-md focus:outline-none cursor-pointer"
              >
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="rounded-full border border-foreground/20 bg-foreground/8 px-4 py-2 font-mono text-xs text-foreground/70 backdrop-blur-md focus:outline-none cursor-pointer"
              >
                {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>

              <div className="flex gap-1">
                {([["all","Все"], ["winner","Победители"], ["prize","Призёры"], ["participant","Участники"]] as const).map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setFilterStatus(val)}
                    className={`rounded-full border px-3 py-2 font-mono text-xs transition-all duration-200 ${
                      filterStatus === val
                        ? "border-foreground/40 bg-foreground/15 text-foreground"
                        : "border-foreground/10 text-foreground/40 hover:border-foreground/20 hover:text-foreground/60"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Top-3 podium */}
            {filterStatus === "all" && filterSubject === "Все предметы" && filterGrade === "Все классы" && (
              <div className="mb-8 grid grid-cols-3 gap-3">
                {[ratingData[1], ratingData[0], ratingData[2]].map((p, col) => {
                  if (!p) return <div key={col} />
                  const realPlace = col === 0 ? 2 : col === 1 ? 1 : 3
                  const heights = ["h-28", "h-36", "h-24"]
                  return (
                    <div key={p.id} className={`flex flex-col items-center justify-end ${col === 1 ? "order-first md:order-none" : ""}`}>
                      <p className="mb-1 text-center font-sans text-xs text-foreground/70 line-clamp-2">{p.name.split(" ")[0]} {p.name.split(" ")[1]}</p>
                      <p className="mb-2 text-2xl">{placeEmoji[realPlace]}</p>
                      <div className={`w-full ${heights[col]} rounded-t-xl border border-foreground/10 flex flex-col items-center justify-center gap-1 ${
                        realPlace === 1 ? "bg-yellow-300/10 border-yellow-300/20" :
                        realPlace === 2 ? "bg-foreground/8" : "bg-amber-900/10"
                      }`}>
                        <span className={`font-sans text-2xl font-light ${placeStyle[realPlace] ?? "text-foreground/50"}`}>{p.score}</span>
                        <span className="font-mono text-xs text-foreground/40">баллов</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Table */}
            {ratingData.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-sans text-foreground/50">Нет результатов по выбранным фильтрам</p>
              </div>
            ) : (
              <div className="space-y-2">
                {ratingData.map((p, i) => {
                  const cfg = statusConfig[p.status]
                  const rank = i + 1
                  return (
                    <div
                      key={p.id}
                      className="group flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/5 px-4 py-3 backdrop-blur-md transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/8 md:px-6 md:py-4"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      {/* Rank */}
                      <div className="w-7 shrink-0 text-center">
                        {rank <= 3 ? (
                          <span className="text-lg">{placeEmoji[rank]}</span>
                        ) : (
                          <span className="font-mono text-sm text-foreground/30">{rank}</span>
                        )}
                      </div>

                      {/* Name + school */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-sm text-foreground md:text-base">{p.name}</p>
                        <p className="truncate font-mono text-xs text-foreground/40">{p.school}</p>
                      </div>

                      {/* Subject + grade */}
                      <div className="hidden shrink-0 text-right md:block">
                        <p className="font-sans text-xs text-foreground/60">{p.subject}</p>
                        <p className="font-mono text-xs text-foreground/35">{p.grade}</p>
                      </div>

                      {/* Status badge */}
                      <span className={`hidden shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs sm:flex ${cfg.color} ${cfg.bg}`}>
                        <Icon name={cfg.icon} size={10} />
                        {cfg.label}
                      </span>

                      {/* Score */}
                      <div className="shrink-0 text-right">
                        <span className={`font-sans text-xl font-light ${placeStyle[rank] ?? "text-foreground/70"}`}>
                          {p.score}
                        </span>
                        <p className="font-mono text-xs text-foreground/30">балл</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── SEARCH TAB ── */}
        {tab === "search" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleSearch} className="mb-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Иванова Мария или KM-2025-001"
                    className="w-full rounded-full border border-foreground/20 bg-foreground/8 py-3.5 pl-11 pr-5 text-sm text-foreground placeholder:text-foreground/35 backdrop-blur-md transition-colors focus:border-foreground/40 focus:outline-none md:text-base"
                  />
                </div>
                <MagneticButton variant="primary" size="lg">
                  {loading ? "Поиск..." : "Найти"}
                </MagneticButton>
              </div>
            </form>

            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3 text-foreground/50">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60" />
                  <span className="font-mono text-sm">Ищем результаты...</span>
                </div>
              </div>
            )}

            {searched && !loading && results.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-3 text-4xl">🍀</div>
                <p className="font-sans text-lg text-foreground/70">Ничего не найдено</p>
                <p className="mt-1 font-mono text-sm text-foreground/40">Проверьте написание имени или номера</p>
              </div>
            )}

            {searched && !loading && results.length > 0 && (
              <div className="space-y-4">
                <p className="font-mono text-xs text-foreground/40">Найдено: {results.length}</p>
                {results.map((p) => {
                  const cfg = statusConfig[p.status]
                  return (
                    <div key={p.id} className="rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 md:p-7">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-sans text-lg font-light text-foreground md:text-xl">{p.name}</h3>
                          <p className="font-mono text-xs text-foreground/40">{p.id}</p>
                        </div>
                        <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs ${cfg.color} ${cfg.bg}`}>
                          <Icon name={cfg.icon} size={12} />
                          {cfg.label}
                        </span>
                      </div>

                      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {[
                          { label: "Предмет",  val: p.subject },
                          { label: "Класс",    val: p.grade },
                          { label: "Результат",val: `${p.place} место` },
                          { label: "Баллы",    val: `${p.score} / 100` },
                        ].map((row) => (
                          <div key={row.label}>
                            <p className="mb-0.5 font-mono text-xs text-foreground/40">{row.label}</p>
                            <p className="text-sm text-foreground/80">{row.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Score bar */}
                      <div className="mb-5">
                        <div className="mb-1 flex justify-between font-mono text-xs text-foreground/40">
                          <span>Результат</span><span>{p.score} / 100</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-500 to-yellow-400 transition-all duration-700"
                            style={{ width: `${p.score}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/8 px-4 py-2 font-mono text-xs text-foreground/70 transition-all hover:bg-foreground/15 hover:text-foreground">
                          <Icon name="Download" size={13} />Скачать диплом
                        </button>
                        <button className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/20 hover:text-foreground/70">
                          <Icon name="Share2" size={13} />Поделиться
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {!searched && !loading && (
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: "User",     title: "По имени",   desc: "Введите фамилию и имя участника" },
                  { icon: "Hash",     title: "По номеру",  desc: "Номер диплома из письма на email" },
                  { icon: "Download", title: "Скачайте",   desc: "PDF-диплом готов сразу после нахождения" },
                ].map((hint) => (
                  <div key={hint.title} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md">
                    <Icon name={hint.icon as "User"} size={18} className="mb-2 text-foreground/40" />
                    <p className="mb-1 font-sans text-sm text-foreground/70">{hint.title}</p>
                    <p className="font-mono text-xs leading-relaxed text-foreground/40">{hint.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
