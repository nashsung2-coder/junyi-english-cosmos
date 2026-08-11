import type { SubjectId } from "@/lib/subjectUniverse";

export type PetItem = {
  id: string;
  name: string;
  emoji: string;
  category: "food" | "toy" | "essential";
  cost: number;
  effect: { hunger?: number; happiness?: number; energy?: number };
  description: string;
};

export const PET_SHOP_ITEMS: PetItem[] = [
  { id: "meteor-kibble", name: "星塵飼料", emoji: "🥣", category: "food", cost: 35, effect: { hunger: 28, happiness: 4 }, description: "補滿探索前的基本能量。" },
  { id: "orbit-ball", name: "軌道球", emoji: "🪀", category: "toy", cost: 55, effect: { happiness: 22, energy: 6 }, description: "適合和夥伴一起玩一場追星遊戲。" },
  { id: "comet-pillow", name: "彗星睡墊", emoji: "🛏️", category: "essential", cost: 75, effect: { energy: 26, happiness: 8 }, description: "讓夥伴在遠征後好好休息。" },
  { id: "starlight-water", name: "星光水壺", emoji: "🧃", category: "essential", cost: 25, effect: { energy: 12, hunger: 6 }, description: "維持每日的活力與補水。" },
];

export const PET_ACTIONS = [
  { id: "talk", label: "聊聊天", emoji: "💬", effect: { happiness: 8 }, message: "聽見你的聲音，夥伴的心情亮了起來。" },
  { id: "play", label: "一起玩", emoji: "🎲", effect: { happiness: 13, energy: -5 }, message: "玩耍完成！默契與快樂都增加了。" },
  { id: "rest", label: "一起休息", emoji: "🌙", effect: { energy: 11 }, message: "短暫休息後，夥伴恢復了探索能量。" },
] as const;

export type PetActionId = (typeof PET_ACTIONS)[number]["id"];
export type PetStatus = { hunger: number; happiness: number; energy: number; level: number };

export const clampPetStat = (value: number) => Math.max(0, Math.min(100, value));

export function applyPetEffect(status: PetStatus, effect: { hunger?: number; happiness?: number; energy?: number }): PetStatus {
  return {
    ...status,
    hunger: clampPetStat(status.hunger + (effect.hunger ?? 0)),
    happiness: clampPetStat(status.happiness + (effect.happiness ?? 0)),
    energy: clampPetStat(status.energy + (effect.energy ?? 0)),
  };
}

export type SubjectPetStatus = Record<SubjectId, PetStatus>;
