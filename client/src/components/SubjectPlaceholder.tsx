/**
 * 均一星辰宇宙 — 深空極簡主義
 * 其他科目模擬區塊:在各區展示「即將推出的科目航線」,
 * 全部標示「規劃中」,點了顯示 toast(假的入口)。
 */
import { toast } from "sonner";
import {
  Languages,
  Calculator,
  Sprout,
  Globe,
  Palette,
  HeartPulse,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubjectPlaceholderItem {
  icon: string;
  name: string;
  tagline: string;
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
  subtitle = "更多科目正在規劃中,完成英文旅程後即可解鎖",
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
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-200 text-xs font-medium">
          <Lock className="w-3 h-3" />
          規劃中
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <button
              key={item.name}
              onClick={() =>
                toast(`${item.name} 星辰航線規劃中`, {
                  description: `${item.name}內容正在準備中,敬請期待!`,
                })
              }
              className="relative group glass-card-hover p-4 text-left cursor-pointer transition-all duration-300"
            >
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-300 pointer-events-none" />
              <div className="relative flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground/70">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white/70">{item.name}</div>
                  <div className="text-xs text-muted-foreground/80 mt-0.5">{item.tagline}</div>
                  <div className="mt-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-amber-300/20 bg-amber-300/5 text-amber-200/80 text-[10px]">
                    <Lock className="w-2.5 h-2.5" />
                    即將推出
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
