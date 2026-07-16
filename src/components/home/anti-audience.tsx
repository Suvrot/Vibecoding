const reasons = [
  {
    title: "Ищешь волшебную таблетку",
    desc: "и быстрые деньги без практики",
  },
  {
    title: "Не готов разбираться и ошибаться",
    desc: "собирать проекты своими руками",
  },
  {
    title: "Хочешь копить знания",
    desc: "но не применять их на практике",
  },
  {
    title: "Ждёшь мотивацию",
    desc: "вместо дисциплины и действий",
  },
  {
    title: "Не готов уделять время",
    desc: "развитию и прокачке навыков",
  },
];

export function AntiAudience() {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="container mx-auto px-4 lg:px-6 section-padding">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Честно
          </span>
          <h2 className="display-2 mt-3">Это обучение не для тебя, если</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="glass-card p-6 flex gap-4 items-start"
            >
              <span className="font-mono text-sm text-emerald-400 mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold leading-tight">{r.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
