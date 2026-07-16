const cases = [
  { title: "Лендинг кофейни", tag: "Next.js + Tailwind", hue: "from-amber-400/20 to-orange-500/20", dot: "bg-amber-400" },
  { title: "Бот для Telegram", tag: "AI + Supabase", hue: "from-violet-500/20 to-indigo-600/20", dot: "bg-violet-400" },
  { title: "Интернет-магазин", tag: "Vibe Coding", hue: "from-emerald-400/20 to-teal-500/20", dot: "bg-emerald-400" },
  { title: "Портфолио фотографа", tag: "Lovable", hue: "from-pink-400/20 to-rose-500/20", dot: "bg-pink-400" },
  { title: "CRM для фрилансера", tag: "Cursor + Supabase", hue: "from-sky-400/20 to-blue-600/20", dot: "bg-sky-400" },
  { title: "Сайт студии йоги", tag: "Bolt.new", hue: "from-fuchsia-400/20 to-purple-600/20", dot: "bg-fuchsia-400" },
];

export function Cases() {
  return (
    <section className="border-t border-white/[0.06] bg-surface/50">
      <div className="container mx-auto px-4 lg:px-6 section-padding">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Кейсы сообщества
          </span>
          <h2 className="display-2 mt-3">Проекты наших учеников</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Реальные работы, собранные на платформе. Каждый — от идеи до
            живого демо за пару недель.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {cases.map((c) => (
            <div
              key={c.title}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${c.hue} relative transition-transform duration-500 group-hover:scale-105`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${c.dot} opacity-60`} />
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
