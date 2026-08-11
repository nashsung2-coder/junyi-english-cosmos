import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Home, Map, Swords, Heart, Package, Zap, Star, Sparkles, ExternalLink } from "lucide-react";
import { STARS, EXPEDITIONS, BACKPACK_ITEMS } from "@/const";

/**
 * GamePage - 遊戲模式 (星辰冒險)
 * 設計哲學:深空極簡主義
 * - 星際地圖:六顆知識星球、征服進度
 * - 知識遠征:關卡、戰鬥動畫、獎勵系統
 * - 寵物競技場:夥伴狀態與餵食
 * - 背包寶庫:道具管理
 */

const STARMAP_IMG = "/manus-storage/junyi-starmap_15034bfa.png";
const MASCOT_IMG = "/manus-storage/junyi-mascot_75414d3f.png";

export default function GamePage() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 頂部狀態列 */}
      <div className="sticky top-0 z-40 border-b border-white/8 bg-background/80 backdrop-cosmic">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/hall">
              <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <h1 className="text-2xl font-bold">星辰冒險</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-mono">2,450 經驗值</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-4 h-4 text-accent" />
              <span className="font-mono">Lv.12 冒險家</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/5 mb-6 grid grid-cols-4">
            <TabsTrigger value="map" className="inline-flex items-center gap-2">
              <Map className="w-4 h-4" /> 星際地圖
            </TabsTrigger>
            <TabsTrigger value="expedition" className="inline-flex items-center gap-2">
              <Swords className="w-4 h-4" /> 知識遠征
            </TabsTrigger>
            <TabsTrigger value="pet" className="inline-flex items-center gap-2">
              <Heart className="w-4 h-4" /> 夥伴
            </TabsTrigger>
            <TabsTrigger value="backpack" className="inline-flex items-center gap-2">
              <Package className="w-4 h-4" /> 背包
            </TabsTrigger>
          </TabsList>

          {/* 星際地圖 */}
          <TabsContent value="map">
            <div className="glass-card p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">六顆知識星球</h2>
              <img
                src={STARMAP_IMG}
                alt="星際地圖"
                className="w-full rounded-lg mb-6 opacity-90"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STARS.map((star) => (
                  <div
                    key={star.id}
                    className="glass-card p-4 hover:border-opacity-40 transition-all group"
                    style={{ borderColor: `${star.color}40` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${star.color}, ${star.color}88)`,
                          boxShadow: `0 0 20px ${star.color}55`,
                        }}
                      >
                        ✦
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{star.name}</div>
                        <div className="text-xs text-muted-foreground">{star.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground font-mono">{star.level}</span>
                      <span className="font-mono" style={{ color: star.color }}>
                        {star.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${star.progress}%`, background: star.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 知識遠征 */}
          <TabsContent value="expedition">
            <div className="space-y-4">
              {EXPEDITIONS.map((exp) => (
                <div key={exp.id} className="glass-card p-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/5 transition-all">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30 shrink-0">
                    <Swords className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{exp.name}</h3>
                      <span
                        className={`badge-cosmic ${
                          exp.difficulty === "新手"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : exp.difficulty === "簡單"
                              ? "bg-blue-500/15 text-blue-300"
                              : exp.difficulty === "中等"
                                ? "bg-amber-500/15 text-amber-300"
                                : "bg-red-500/15 text-red-300"
                        }`}
                      >
                        {exp.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                    <div className="text-xs text-muted-foreground mt-2 space-x-4">
                      <span className="font-mono">{exp.questions} 題</span>
                      <span className="font-mono">{exp.time}</span>
                      <span className="text-amber-300/80">{exp.reward}</span>
                    </div>
                  </div>
                  <a
                    href="https://www.junyiacademy.org/topics/junyi-english"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cosmic-primary inline-flex items-center gap-2 self-start md:self-auto"
                  >
                    出發遠征
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 夥伴 */}
          <TabsContent value="pet">
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={MASCOT_IMG}
                  alt="狐狸貓夥伴"
                  className="w-48 h-48 object-contain animate-float"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">狐狸貓 · 星塵</h2>
                  <p className="text-sm text-muted-foreground mb-4">Lv.8 · 親密度 82/100 · 快樂度 高</p>
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">親密度</span>
                        <span className="font-mono text-accent">82/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 w-[82%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">口說能量</span>
                        <span className="font-mono text-amber-300">45/60</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 w-[75%]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-accent text-accent-foreground hover:opacity-90">
                      <Heart className="w-4 h-4 mr-2" /> 餵食餅乾(親密度 +5)
                    </Button>
                    <Button variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
                      <Sparkles className="w-4 h-4 mr-2" /> 一起複習單字
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    完成英文學習任務即可獲得「狐狸貓餅乾」,餵食夥伴可增加親密度,親密度越高,遠征時獲得的獎勵加成越多。
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 背包 */}
          <TabsContent value="backpack">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {BACKPACK_ITEMS.map((item) => (
                <div key={item.id} className="glass-card p-4 text-center hover:bg-white/5 transition-all group">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 mb-2">{item.description}</div>
                  <div className="text-xs font-mono text-accent">×{item.count}</div>
                </div>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`empty-${i}`} className="glass-card p-4 text-center opacity-40 flex items-center justify-center min-h-[160px]">
                  <span className="text-xs text-muted-foreground">空欄位</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
