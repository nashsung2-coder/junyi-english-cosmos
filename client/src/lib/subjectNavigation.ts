import type { SubjectId } from "./subjectUniverse";

export const SUBJECT_AREAS = ["hall", "specialty", "game", "journey", "butler", "parent", "teacher"] as const;
export type SubjectAreaId = (typeof SUBJECT_AREAS)[number];

export const SUBJECT_MISSION_IDS: Record<SubjectId, number> = {
  english: 1,
  chinese: 101,
  math: 102,
  science: 103,
  social: 104,
  arts: 105,
  health: 106,
  physics: 201,
  chemistry: 202,
  biology: 203,
  "earth-science": 204,
};

export const SUBJECT_AREA_META: Record<SubjectAreaId, { eyebrow: string; title: string; description: string; managementLabel: string }> = {
  hall: { eyebrow: "YOUR LEARNING UNIVERSE", title: "選擇今天的學習航線", description: "從一門學科開始，進入你的專屬學習總覽。", managementLabel: "學習總覽" },
  specialty: { eyebrow: "SKILL ATLAS", title: "選擇要管理的學力星圖", description: "查看該科能力、任務進度與下一個推薦練習。", managementLabel: "學力管理" },
  game: { eyebrow: "EXPEDITION GATE", title: "選擇你的冒險學科", description: "先選一門學科，再開啟相應的知識遠征與夥伴遊戲。", managementLabel: "冒險管理" },
  journey: { eyebrow: "GROWTH LOG", title: "選擇要回顧的成長軌跡", description: "以學科為單位，查看任務成果與夥伴陪伴紀錄。", managementLabel: "成長紀錄" },
  butler: { eyebrow: "GROWTH BUTLER", title: "選擇要規劃的能力方向", description: "讓智慧管家根據一門學科的表現提出下一步建議。", managementLabel: "能力規劃" },
  parent: { eyebrow: "FAMILY COMPASS", title: "選擇要關注的學習領域", description: "查看這門學科的學習表現與親子共學方向。", managementLabel: "家長觀察" },
  teacher: { eyebrow: "TEACHING CONSOLE", title: "選擇要帶領的學科航線", description: "進入該科的任務概覽、學習狀態與教學引導。", managementLabel: "教學管理" },
};

export function isSubjectArea(value: string | undefined): value is SubjectAreaId {
  return SUBJECT_AREAS.some((area) => area === value);
}
