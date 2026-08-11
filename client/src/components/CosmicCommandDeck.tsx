import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type CosmicCommandDeckProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  action?: ReactNode;
  children?: ReactNode;
};

/** 每個核心頁面共用的「星圖指揮甲板」頁首。 */
export default function CosmicCommandDeck({
  eyebrow,
  title,
  description,
  icon: Icon,
  accent,
  action,
  children,
}: CosmicCommandDeckProps) {
  return (
    <section
      className="relative isolate mb-6 overflow-hidden rounded-3xl border border-white/[0.11] bg-[#10172b]/72 px-5 py-6 shadow-[0_24px_70px_rgba(0,0,0,.25)] md:px-7 md:py-8"
      style={{ backgroundImage: `radial-gradient(circle at 83% 25%, ${accent}2a, transparent 25rem), linear-gradient(135deg, rgba(255,255,255,.055), rgba(255,255,255,.01))` }}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/[0.10]" />
      <div className="pointer-events-none absolute -right-8 top-8 h-44 w-44 rounded-full border border-dashed border-white/[0.12]" />
      <div className="pointer-events-none absolute right-16 top-20 h-2.5 w-2.5 rounded-full shadow-[0_0_22px_currentColor]" style={{ color: accent, backgroundColor: accent }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em]" style={{ color: accent }}>
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-current/25 bg-white/[0.05]"><Icon className="h-3.5 w-3.5" /></span>
            {eyebrow}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 md:text-[15px]">{description}</p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children && <div className="relative mt-6 border-t border-white/[0.09] pt-4">{children}</div>}
    </section>
  );
}
