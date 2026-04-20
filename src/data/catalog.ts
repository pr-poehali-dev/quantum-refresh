// ─── Олимпиады ───────────────────────────────────────────────────────────────

export type OlympiadStatus = "open" | "soon" | "finished"

export type Olympiad = {
  id: string
  title: string
  subject: string
  grades: string
  dateStart: string
  dateEnd: string
  status: OlympiadStatus
  participants: number
  description: string
  emoji: string
}

export const OLYMPIADS: Olympiad[] = [
  {
    id: "ol-math-1-4",
    title: "Юный математик",
    subject: "Математика",
    grades: "1–4 класс",
    dateStart: "1 апреля 2025",
    dateEnd: "15 мая 2025",
    status: "open",
    participants: 342,
    description: "Олимпиада по математике для начальной школы: логика, счёт, нестандартные задачи.",
    emoji: "🔢",
  },
  {
    id: "ol-math-5-8",
    title: "Математический турнир",
    subject: "Математика",
    grades: "5–8 класс",
    dateStart: "1 апреля 2025",
    dateEnd: "15 мая 2025",
    status: "open",
    participants: 218,
    description: "Задачи на алгебру, геометрию и комбинаторику для средней школы.",
    emoji: "📐",
  },
  {
    id: "ol-rus-1-8",
    title: "Знатоки русского",
    subject: "Русский язык",
    grades: "1–8 класс",
    dateStart: "5 апреля 2025",
    dateEnd: "20 мая 2025",
    status: "open",
    participants: 487,
    description: "Грамотность, орфография, фразеологизмы и занимательная лингвистика.",
    emoji: "📝",
  },
  {
    id: "ol-world-1-4",
    title: "Познаю мир",
    subject: "Окружающий мир",
    grades: "1–4 класс",
    dateStart: "20 мая 2025",
    dateEnd: "10 июня 2025",
    status: "soon",
    participants: 0,
    description: "Природа, животные, экология и удивительные факты об окружающем мире.",
    emoji: "🌍",
  },
  {
    id: "ol-eng-3-8",
    title: "English Star",
    subject: "Английский язык",
    grades: "3–8 класс",
    dateStart: "10 апреля 2025",
    dateEnd: "10 июня 2025",
    status: "open",
    participants: 263,
    description: "Чтение, словарный запас и знание культуры англоязычных стран.",
    emoji: "🌟",
  },
  {
    id: "ol-lit-4-8",
    title: "Книжный мир",
    subject: "Литература",
    grades: "4–8 класс",
    dateStart: "15 марта 2025",
    dateEnd: "30 апреля 2025",
    status: "finished",
    participants: 319,
    description: "Знание произведений школьной программы и мировой детской литературы.",
    emoji: "📚",
  },
  {
    id: "ol-bio-5-8",
    title: "Юный биолог",
    subject: "Биология",
    grades: "5–8 класс",
    dateStart: "1 июня 2025",
    dateEnd: "30 июня 2025",
    status: "soon",
    participants: 0,
    description: "Растения, животные, тело человека — интересная биология без скуки.",
    emoji: "🌱",
  },
  {
    id: "ol-hist-6-8",
    title: "Путешествие в историю",
    subject: "История",
    grades: "6–8 класс",
    dateStart: "15 февраля 2025",
    dateEnd: "31 марта 2025",
    status: "finished",
    participants: 201,
    description: "Ключевые события, личности и эпохи отечественной и мировой истории.",
    emoji: "🏛️",
  },
]

// ─── Курсы ────────────────────────────────────────────────────────────────────

export type CourseFormat = "group" | "individual" | "self"
export type CourseLevel  = "beginner" | "middle" | "advanced"

export type Course = {
  id: string
  title: string
  subject: string
  grades: string
  format: CourseFormat
  level: CourseLevel
  duration: string
  lessons: number
  price: number
  teacher: string
  description: string
  emoji: string
  tags: string[]
}

export const COURSES: Course[] = [
  {
    id: "c-math-olymp",
    title: "Олимпиадная математика",
    subject: "Математика",
    grades: "3–6 класс",
    format: "group",
    level: "advanced",
    duration: "3 месяца",
    lessons: 24,
    price: 2400,
    teacher: "Наталья Петровна Сорокина",
    description: "Подготовка к математическим олимпиадам: нестандартные задачи, логика, тренировочные туры.",
    emoji: "🏆",
    tags: ["Олимпиада", "Математика", "Группа"],
  },
  {
    id: "c-rus-grammar",
    title: "Грамотный школьник",
    subject: "Русский язык",
    grades: "2–5 класс",
    format: "group",
    level: "beginner",
    duration: "2 месяца",
    lessons: 16,
    price: 1800,
    teacher: "Ирина Владимировна Крылова",
    description: "Правила орфографии и пунктуации в игровой форме. Идеально для подготовки к диктантам и олимпиадам.",
    emoji: "✍️",
    tags: ["Русский язык", "Грамотность", "Группа"],
  },
  {
    id: "c-eng-starter",
    title: "English для старта",
    subject: "Английский язык",
    grades: "1–3 класс",
    format: "group",
    level: "beginner",
    duration: "4 месяца",
    lessons: 32,
    price: 2800,
    teacher: "Анна Сергеевна Белова",
    description: "Первые шаги в английском: алфавит, базовая лексика, простые диалоги и песни.",
    emoji: "🎒",
    tags: ["Английский", "Начальная школа", "Группа"],
  },
  {
    id: "c-eng-olymp",
    title: "English Star Pro",
    subject: "Английский язык",
    grades: "5–8 класс",
    format: "individual",
    level: "advanced",
    duration: "3 месяца",
    lessons: 20,
    price: 4500,
    teacher: "Анна Сергеевна Белова",
    description: "Интенсивная подготовка к олимпиадам по английскому: Reading, Grammar, Culture.",
    emoji: "🌟",
    tags: ["Английский", "Олимпиада", "Индивидуально"],
  },
  {
    id: "c-math-tutor",
    title: "Математика: разбор с нуля",
    subject: "Математика",
    grades: "5–8 класс",
    format: "individual",
    level: "middle",
    duration: "по согласованию",
    lessons: 12,
    price: 3600,
    teacher: "Наталья Петровна Сорокина",
    description: "Индивидуальные занятия по слабым темам. Пробелы в знаниях закрываем быстро и системно.",
    emoji: "📊",
    tags: ["Математика", "Репетитор", "Индивидуально"],
  },
  {
    id: "c-world-science",
    title: "Я исследую мир",
    subject: "Окружающий мир",
    grades: "1–4 класс",
    format: "group",
    level: "beginner",
    duration: "2 месяца",
    lessons: 16,
    price: 1600,
    teacher: "Михаил Андреевич Орлов",
    description: "Занимательная наука для младшеклассников: опыты, наблюдения, подготовка к олимпиаде.",
    emoji: "🔬",
    tags: ["Окружающий мир", "Наука", "Группа"],
  },
]

// ─── Данные профилей (моковые) ────────────────────────────────────────────────

export type DiplomaRecord = {
  olympiadTitle: string
  subject: string
  place: number
  score: number
  status: "winner" | "prize" | "participant"
  date: string
}

export const STUDENT_DIPLOMAS: DiplomaRecord[] = [
  { olympiadTitle: "Юный математик",  subject: "Математика",    place: 1, score: 98, status: "winner",      date: "15 апр 2025" },
  { olympiadTitle: "Знатоки русского",subject: "Русский язык",  place: 3, score: 89, status: "prize",       date: "10 апр 2025" },
  { olympiadTitle: "English Star",    subject: "Английский",    place: 7, score: 74, status: "participant", date: "12 апр 2025" },
]

export const TEACHER_STUDENTS = [
  { name: "Иванова Мария",    grade: "4 класс", lastActivity: "Сегодня",    diplomas: 3 },
  { name: "Петров Алексей",   grade: "6 класс", lastActivity: "Вчера",      diplomas: 1 },
  { name: "Козлов Дмитрий",   grade: "5 класс", lastActivity: "2 дня назад",diplomas: 2 },
  { name: "Морозова Катя",    grade: "7 класс", lastActivity: "Сегодня",    diplomas: 1 },
  { name: "Новиков Артём",    grade: "4 класс", lastActivity: "3 дня назад",diplomas: 0 },
]

export const PARENT_CHILDREN = [
  {
    name: "Иванова Мария",
    grade: "4 класс",
    school: "Школа №42, Москва",
    diplomas: STUDENT_DIPLOMAS,
    activeOlympiads: 2,
    activeCourses: 1,
  },
]
