export function SectionDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

export function ModuleTag({ num, label }: { num: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400">
      <span className="text-muted-foreground">{"//"}</span>
      {num} {label}
    </span>
  );
}
