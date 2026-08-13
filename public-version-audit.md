# 公開可見版本核對紀錄

## 2026-08-13

| 入口 | URL | 實際觀察 | 判讀 |
| --- | --- | --- | --- |
| Cloudflare Pages 公開站 | https://junyi-english-cosmos.pages.dev/hall | 大廳仍只呈現七科選科卡與星幣標籤，沒有「選擇下一段學習航線」前的國小／國中／高中學段切換，也沒有「重新查看迎賓」按鈕。 | 公開站仍為較早的發布版本。 |
| GitHub main | https://github.com/nashsung2-coder/junyi-english-cosmos | GitHub 顯示最新 main 提交為 `9797c5b`，且本機與遠端雜湊一致。 | 程式碼已成功同步至 GitHub；公開站未隨 GitHub 自動發布。 |

> 結論：使用者若正在開啟 Cloudflare Pages 網址，所見內容不會反映本輪已推送的 GitHub 版本。需要由專案管理介面以已建立的 checkpoint 發布後，公開網址才會更新。

## Cloudflare 建置失敗根因（2026-08-13）

使用者提供的 Cloudflare 建置日誌顯示，平台在 `pnpm run build` 成功後執行 `npx wrangler deploy`。該命令把此 Vite 專案當成 Worker 初始化，並因嘗試修改 Vite 設定而出現 `Cannot modify Vite config: could not find a valid plugins array`。本專案的公開網址是 `junyi-english-cosmos.pages.dev`，因此應使用 Pages Git integration 的自動發布流程，或在直接上傳流程中使用 `wrangler pages deploy`；不應以 Worker 的 `wrangler deploy` 發佈。

Cloudflare 官方文件指出，Git integration 會在推送至指定分支時自動建置並部署；Pages 的 Wrangler 設定使用 `pages_build_output_dir`，且 Pages 資產發布應使用 `wrangler pages deploy <BUILD_OUTPUT_DIRECTORY>`。[Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)；[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)；[Pages Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)。
