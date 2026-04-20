import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

type Diploma = {
  id: string
  name: string
  subject: string
  grade: string
  place: string
  date: string
  status: "winner" | "prize" | "participant"
}

const MOCK_DATA: Diploma[] = [
  {
    id: "KM-2025-001",
    name: "Иванова Мария Сергеевна",
    subject: "Математика",
    grade: "4 класс",
    place: "1 место",
    date: "15 апреля 2025",
    status: "winner",
  },
  {
    id: "KM-2025-002",
    name: "Петров Алексей Дмитриевич",
    subject: "Русский язык",
    grade: "6 класс",
    place: "2 место",
    date: "10 апреля 2025",
    status: "prize",
  },
  {
    id: "KM-2025-003",
    name: "Сидорова Анна Игоревна",
    subject: "Окружающий мир",
    grade: "3 класс",
    place: "Участник",
    date: "5 апреля 2025",
    status: "participant",
  },
]

const statusConfig = {
  winner: { label: "Победитель", color: "text-yellow-300", bg: "bg-yellow-300/15", icon: "Trophy" },
  prize: { label: "Призёр", color: "text-foreground/80", bg: "bg-foreground/10", icon: "Medal" },
  participant: { label: "Участник", color: "text-foreground/60", bg: "bg-foreground/8", icon: "Star" },
}

export default function Results() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<Diploma[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(false)

    await new Promise((r) => setTimeout(r, 800))

    const filtered = MOCK_DATA.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.id.toLowerCase().includes(query.toLowerCase())
    )

    setResults(filtered)
    setSearched(true)
    setLoading(false)
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />

      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-background to-yellow-950/30" />
        <div className="absolute left-1/3 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-800/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-yellow-700/15 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="text-xl">🍀</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Клевер Маинд</span>
        </button>

        <MagneticButton variant="secondary" onClick={() => navigate("/")}>
          На главную
        </MagneticButton>
      </nav>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-40">
        {/* Header */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-foreground/90">Результаты и награды</p>
          </div>
          <h1 className="mb-3 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
            Найти
            <br />
            <span className="text-foreground/40">диплом</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
            Введите имя участника или номер диплома — мы найдём результат и ссылку для скачивания.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="animate-in fade-in slide-in-from-bottom-4 mb-12 duration-700 delay-200"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Icon
                name="Search"
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
              />
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

        {/* Results */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-foreground/50">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60" />
              <span className="font-mono text-sm">Ищем результаты...</span>
            </div>
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="animate-in fade-in py-16 text-center duration-500">
            <div className="mb-3 text-4xl">🍀</div>
            <p className="font-sans text-lg text-foreground/70">Ничего не найдено</p>
            <p className="mt-1 font-mono text-sm text-foreground/40">
              Проверьте правильность написания имени или номера диплома
            </p>
          </div>
        )}

        {searched && !loading && results.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 duration-500">
            <p className="mb-6 font-mono text-xs text-foreground/50">
              Найдено результатов: {results.length}
            </p>
            {results.map((diploma, i) => {
              const cfg = statusConfig[diploma.status]
              return (
                <div
                  key={diploma.id}
                  className="group rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/8 md:p-7"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-sans text-lg font-light text-foreground md:text-xl">
                        {diploma.name}
                      </h3>
                      <p className="font-mono text-xs text-foreground/40">{diploma.id}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs ${cfg.color} ${cfg.bg}`}>
                      <Icon name={cfg.icon as "Trophy"} size={12} />
                      {cfg.label}
                    </span>
                  </div>

                  <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                    <div>
                      <p className="mb-0.5 font-mono text-xs text-foreground/40">Предмет</p>
                      <p className="text-sm text-foreground/80">{diploma.subject}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 font-mono text-xs text-foreground/40">Класс</p>
                      <p className="text-sm text-foreground/80">{diploma.grade}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 font-mono text-xs text-foreground/40">Результат</p>
                      <p className="text-sm text-foreground/80">{diploma.place}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 font-mono text-xs text-foreground/40">Дата</p>
                      <p className="text-sm text-foreground/80">{diploma.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/8 px-4 py-2 font-mono text-xs text-foreground/70 transition-all hover:bg-foreground/15 hover:text-foreground">
                      <Icon name="Download" size={13} />
                      Скачать диплом
                    </button>
                    <button className="flex items-center gap-2 rounded-full border border-foreground/10 bg-transparent px-4 py-2 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/20 hover:text-foreground/70">
                      <Icon name="Share2" size={13} />
                      Поделиться
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* How to find hint */}
        {!searched && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-foreground/30">
              Как найти результат
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: "User", title: "По имени", desc: "Введите фамилию и имя участника" },
                { icon: "Hash", title: "По номеру", desc: "Номер диплома из письма на email" },
                { icon: "Download", title: "Скачайте", desc: "PDF-диплом готов сразу после нахождения" },
              ].map((hint, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md"
                >
                  <Icon name={hint.icon as "User"} size={18} className="mb-2 text-foreground/40" />
                  <p className="mb-1 font-sans text-sm text-foreground/70">{hint.title}</p>
                  <p className="font-mono text-xs leading-relaxed text-foreground/40">{hint.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
