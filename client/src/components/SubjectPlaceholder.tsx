/**
 * 均一星辰宇宙 — 深空極簡主義
 * 跨學科任務入口：在各區直接導向對應的可作答練習。
 */
import {
  Languages,
  Calculator,
  Sprout,
  Globe,
  Palette,
  HeartPulse,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubjectPlaceholderItem {
  icon: string;
  name: string;
  tagline: string;
  href: string;
}

const iconMap: Record<string, typeof Languages> = {
  languages: Languages,
  calculator: Calculator,
  sprout: Sprout,
  globe: Globe,
  palette: Palette,
  heartPulse: HeartPulse,
};

export default function SubjectPlaceholder({
  title = "其他學科的星辰航線",
  subtitle = "選擇一門學科，立即開始一段可作答的知識遠征",
  items,
  className,
}: {
  title?: string;
  subtitle?: string;
  items: SubjectPlaceholderItem[];
  className?: string;
}) {
  return (
    <section className={cn("mt-10", className)}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white/90">{title}</h2>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 text-xs font-medium">
          <ArrowUpRight className="w-3 h-3" />
          可直接練習
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <a
              key={item.name}
              href={item.href}
              className="group glass-card-hover block p-4 text-left transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-cyan-200/20 bg-cyan-300/10 p-2 text-cyan-100 transition-colors group-hover:bg-cyan-300/20">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{item.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{item.tagline}</div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded border border-cyan-200/20 bg-cyan-300/5 px-1.5 py-0.5 text-[10px] text-cyan-100">
                    開始任務 <ArrowUpRight className="h-2.5 w-2.5" />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
