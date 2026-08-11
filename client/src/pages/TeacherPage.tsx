import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Package, UserCheck, Trophy, Bell, TrendingUp, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import SubjectPlaceholder from "@/components/SubjectPlaceholder";

/**
 * TeacherPage - 教師區 (班級指揮艙)
 * 設計哲學:深空極簡主義 — 星雲紫 #A977F4 主題
 * - 班級選擇器
 * - 班級戰情、套餐工坊、學生總覽、榮譽殿堂
 */

const CLASSES = [
  { id: 1, name: "四年三班", students: 32 },
  { id: 2, name: "五年二班", students: 29 },
  { id: 3, name: "六年一班", students: 26 },
];

const HEATMAP = [
  { name: "聽力", levels: ["A2", "A1+", "A1", "PreA1", "B1"] },
  { name: "口說", levels: ["A1+", "A1", "PreA1", "A1+", "A2"] },
  { name: "閱讀", levels: ["A1", "A1+", "A2", "A1", "A1+"] },
  { name: "字彙", levels: ["A1+", "A2", "A1", "B1", "A1+"] },
];

const STUDENTS = [
  { name: "王小明", level: "A1+", listening: 72, speaking: 58, reading: 51, vocabulary: 66, trend: "up", streak: 12 },
  { name: "陳小華", level: "A2", listening: 80, speaking: 68, reading: 74, vocabulary: 78, trend: "up", streak: 21 },
  { name: "李小芳", level: "PreA1", listening: 42, speaking: 35, reading: 38, vocabulary: 45, trend: "stable", streak: 5 },
  { name: "張大偉", level: "A1", listening: 60, speaking: 52, reading: 58, vocabulary: 63, trend: "down", streak: 2 },
  { name: "林小美", level: "B1", listening: 88, speaking: 76, reading: 85, vocabulary: 90, trend: "up", streak: 30 },
];

const PACKAGES = [
  { id: 1, name: "週末聽力套餐", students: 32, progress: 68, due: "08/16", active: true },
  { id: 2, name: "單字基礎套餐", students: 32, progress: 92, due: "08/10", active: true },
  { id: 3, name: "暑假總複習套餐", students: 29, progress: 45, due: "08/31", active: true },
  { id: 4, name: "會考衝刺套餐", students: 0, progress: 0, due: "未開始", active: false },
];

const HONOR = [
  { name: "林小美", title: "聽力之星", icon: "🌟", desc: "連續30天學習,聽力等級 B1" },
  { name: "陳小華", title: "單字達人", icon: "📚", desc: "本週累積 80 個新單字" },
  { name: "王小明", title: "進步最快", icon: "🚀", desc: "單字能力兩週提升 12 分" },
];

export default function TeacherPage() {
  const [selectedClass, setSelectedClass] = useState(1);
  const [view, setView] = useState<"status" | "package" | "students" | "honor">("status");

  const cls = CLASSES.find((c) => c.id === selectedClass)!;

  const NAV = [
    { id: "status", icon: TrendingUp, label: "班級戰情" },
    { id: "package", icon: Package, label: "套餐工坊" },
    { id: "students", icon: UserCheck, label: "學生總覽" },
    { id: "honor", icon: Trophy, label: "榮譽殿堂" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 全站導覽列 */}
      <Navbar />
      {/* 頂部狀態列 */}
      <div className="sticky top-[60px] z-30 border-b border-white/8 bg-background/80 backdrop-cosmic">
        <div className="container py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/hall">
              <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <h1 className="text-2xl font-bold">班級指揮艙</h1>
          </div>
          <div className="flex items-center gap-2">
            {CLASSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClass(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  selectedClass === c.id
                    ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                    : "bg-white/5 text-muted-foreground hover:bg-white/8"
                }`}
              >
                {c.name} · {c.students} 位
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* 導覽 Tab */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as typeof view)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 inline-flex items-center gap-2 text-sm ${
                  view === item.id
                    ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                    : "glass-card hover:bg-white/6"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 班級戰情 */}
        {view === "status" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4">
                <div className="text-xs text-muted-foreground mb-1">班級人數</div>
                <div className="text-2xl font-bold font-mono">{cls.students} 位</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-muted-foreground mb-1">本週活躍率</div>
                <div className="text-2xl font-bold font-mono text-purple-300">84%</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-muted-foreground mb-1">平均綜合等級</div>
                <div className="text-2xl font-bold font-mono">A1+</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs text-muted-foreground mb-1">需關注學生</div>
                <div className="text-2xl font-bold font-mono text-amber-300">6 位</div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">能力分布(班級)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="py-2 pr-4">能力</th>
                      <th className="py-2">Pre A1</th>
                      <th className="py-2">A1-</th>
                      <th className="py-2">A1</th>
                      <th className="py-2">A1+</th>
                      <th className="py-2">A2+</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HEATMAP.map((row) => (
                      <tr key={row.name} className="border-t border-white/6">
                        <td className="py-3 pr-4 font-medium">{row.name}</td>
                        {[0, 1, 2, 3, 4].map((i) => {
                          const intensity = Math.floor(Math.random() * 5) + 2;
                          return (
                            <td key={i} className="py-3">
                              <div
                                className="h-6 rounded px-2 flex items-center justify-center text-xs font-mono"
                                style={{
                                  background: `rgba(169, 119, 244, ${intensity / 14})`,
                                  color: intensity > 4 ? "#E8ECF1" : "rgba(232,236,241,0.7)",
                                }}
                              >
                                {intensity}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-400" />
                系統建議
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>
                    「閱讀」能力全班偏低,建議派發閱讀理解套餐並安排每週一篇共讀。
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>
                    6 位學生超過 7 天未登入,建議透過家長區發送提醒。
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    單字基礎套餐達成率 92%,表現優異,可進入進階字彙單元。
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 套餐工坊 */}
        {view === "package" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">學習套餐</h3>
              <Button size="sm" className="bg-purple-500 text-white hover:opacity-90">
                + 建立新套餐
              </Button>
            </div>
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`glass-card p-5 ${pkg.active ? "" : "opacity-50"}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-purple-400" />
                      <h4 className="font-semibold text-sm">{pkg.name}</h4>
                      <span className="badge-cosmic bg-purple-500/15 text-purple-300 text-xs">
                        {pkg.active ? "派發中" : "未派發"}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {pkg.students} 位學生 · 截止 {pkg.due}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400"
                        style={{ width: `${pkg.progress}%` }}
                      />
                    </div>
                    <div className="text-xs font-mono text-purple-300 text-right">{pkg.progress}% 完成</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="border-purple-400/40 text-purple-300 hover:bg-purple-500/10">
                      成效報告
                    </Button>
                    {pkg.active ? (
                      <Button size="sm" className="bg-purple-500 text-white hover:opacity-90">
                        續派
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-purple-500 text-white hover:opacity-90">
                        派發
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-xs text-muted-foreground pt-2">
              提示:可搭配均一<a href="https://www.junyiacademy.org/topics/junyi-teacher-resources" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline underline-offset-2">教師資源區</a>的教案範例設計套餐內容。
            </div>
          </div>
        )}

        {/* 學生總覽 */}
        {view === "students" && (
          <div className="glass-card p-6 overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-white/8">
                  <th className="py-3 pr-4">學生</th>
                  <th className="py-3">等級</th>
                  <th className="py-3">聽力</th>
                  <th className="py-3">口說</th>
                  <th className="py-3">閱讀</th>
                  <th className="py-3">字彙</th>
                  <th className="py-3">連續天數</th>
                  <th className="py-3">趨勢</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((s) => (
                  <tr key={s.name} className="border-b border-white/6 hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4 font-medium">{s.name}</td>
                    <td className="py-3 font-mono text-purple-300">{s.level}</td>
                    <td className="py-3 font-mono">{s.listening}</td>
                    <td className="py-3 font-mono">{s.speaking}</td>
                    <td className="py-3 font-mono">{s.reading}</td>
                    <td className="py-3 font-mono">{s.vocabulary}</td>
                    <td className="py-3 font-mono">{s.streak} 天</td>
                    <td className="py-3">
                      <span
                        className={
                          s.trend === "up"
                            ? "text-emerald-400"
                            : s.trend === "down"
                              ? "text-amber-400"
                              : "text-muted-foreground"
                        }
                      >
                        {s.trend === "up" ? "▲" : s.trend === "down" ? "▼" : "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 榮譽殿堂 */}
        {view === "honor" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HONOR.map((h, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 text-center animate-glow"
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                  <div className="text-4xl mb-3">{h.icon}</div>
                  <div className="text-lg font-bold">{h.title}</div>
                  <div className="text-sm text-purple-300 mt-1">{h.name}</div>
                  <div className="text-xs text-muted-foreground mt-2">{h.desc}</div>
                </div>
              ))}
            </div>
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 inline-flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" />
                班級統計
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold font-mono text-purple-300">142</div>
                  <div className="text-xs text-muted-foreground mt-1">本月完成任務</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-purple-300">28</div>
                  <div className="text-xs text-muted-foreground mt-1">解鎖成就數</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-purple-300">84%</div>
                  <div className="text-xs text-muted-foreground mt-1">週活躍率</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-purple-300">1,280</div>
                  <div className="text-xs text-muted-foreground mt-1">累積練習題數</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 其他科目教學資源模擬區塊 */}
      <SubjectPlaceholder
        title="其他學科的教學資源庫"
        subtitle="更多科目的班級戰情與套餐工坊正在開發中"
        items={[
          { icon: "languages", name: "國文", tagline: "閱讀理解與寫作評量" },
          { icon: "calculator", name: "數學", tagline: "診斷性測驗與錯題追蹤" },
          { icon: "sprout", name: "自然", tagline: "實驗紀錄與專題評量" },
          { icon: "globe", name: "社會", tagline: "探究式學習與報告批閱" },
        ]}
      />

      {/* 通知浮鈕 */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-500/90 text-white flex items-center justify-center shadow-lg hover:bg-purple-500 transition-colors">
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );
}
