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

## My Browser Cloudflare 設定稽核（2026-08-15）

使用者已登入的 Cloudflare Dashboard 顯示，GitHub 儲存庫 `nashsung2-coder/junyi-english-cosmos` 目前連接到 **Worker `junyi-cosmos`**，而不是標示為 Pages 的 Git integration 專案。於 Worker build 詳情頁 `https://dash.cloudflare.com/e2555c75ff3cce1d4030a5ad26d05227/workers/services/view/junyi-cosmos/production/builds/06de8d17-7a61-4a51-a2af-9e67a95526b7` 可見設定為：Build command `pnpm run build`、Deploy command **`npx wrangler deploy`**、Root directory `/`、Build token **`junyi-cosmos build token`**、Build variables `None`。因此 Cloudflare 中的目前 Worker Build 設定仍保有錯誤的 Worker 部署命令，也需於 Worker Builds 設定頁重新綁定有效的 build token；僅推送 GitHub 或設定 Pages 專案環境變數不足以覆蓋此層設定。

後續於 `https://dash.cloudflare.com/e2555c75ff3cce1d4030a5ad26d05227/workers/services/view/junyi-cosmos/production/settings#builds` 的即時設定頁確認，Deploy command 已更新為 `npx wrangler pages deploy dist/public --project-name junyi-english-cosmos`，Build command 為 `pnpm run build`，但 API token 欄位仍顯示 **`junyi-cosmos build token`**。頁面同時提示 `wrangler.jsonc` 的名稱與此 Worker 設定不一致；程式庫中的 `wrangler.jsonc` 現在使用 `junyi-english-cosmos`，而 Worker Builds 的服務名稱是 `junyi-cosmos`。目前最直接的建置前阻塞仍是 Build token 已失效，需於此設定頁重新選取有效 token 並儲存。

Build token 下拉選單提供 `Create new token`、`junyi-cosmos build token`、`junyi-english-cosmos build token`、`cool-english-cosmos build token`。使用者已確認建立新的 token；點選建立選項後，下拉選單關閉但目前顯示值仍為 `junyi-cosmos build token`，表示尚未完成新 token 的選取／儲存，不能進行下一次建置重試。

使用者也已確認可改選 `junyi-english-cosmos build token`。在 My Browser 中依確認嘗試選取後，欄位畫面仍顯示 `junyi-cosmos build token`，未出現新的儲存提示；需以 Cloudflare 實際可用的選取／儲存控制重新套用，並以更新後欄位值作為重試前的驗證條件。

在使用者確認後，已於 My Browser 將 `junyi-cosmos` Worker 的 Build token 選為 `junyi-english-cosmos build token`，並使用畫面出現的 `Save` 按鈕完成儲存。儲存後頁面不再顯示未儲存變更提示，API token 欄位持續顯示 `junyi-english-cosmos build token`。此設定已可用於後續建置重試；重試屬於實際部署動作，需另行取得使用者確認。

使用者確認後，已對提交 `772c9d8` 觸發重試建置（Build `daeda0c4-e657-4b40-bdbb-7a7cb1aa304b`）。重試頁目前明確顯示新的 Build token `junyi-english-cosmos build token`、Build command `pnpm run build`、Deploy command `npx wrangler pages deploy dist/public --project-name junyi-english-cosmos`，並保留 `CLOUDFLARE_API_TOKEN` 建置變數。約一分鐘後狀態仍為「Initializing」，尚未產生新的成功或失敗日誌；需等待最終狀態後再判定是否已解除原先的 token 阻塞。

再次讀取 Build `daeda0c4-e657-4b40-bdbb-7a7cb1aa304b` 的結果後，Cloudflare 回覆相同的「The build token selected for this build has been deleted or rolled」錯誤。這證實 `junyi-english-cosmos build token` 也已失效；下一步不應再重試既有權杖，而應由帳戶管理者在 Worker Builds 設定建立並選取一枚真正有效的新 Build token。

經使用者確認後，已在同一個 Worker Build 設定頁將 API token 改選為 `cool-english-cosmos build token`，並按下 Save。儲存後 API token 欄位維持顯示該 token，頁面不再顯示「Unsaved changes」。下一步需取得使用者確認後，對最新 build 觸發一次重試，藉此確認此替代 token 是否仍有效。

在使用者確認後重試 Build `867903fc-7c59-4c7f-ade0-d39c72523e9d`，Cloudflare 設定頁確認此次執行使用 `cool-english-cosmos build token`。該 build 同樣在「Initializing」後（約 4 秒）失敗，訊息仍為「The build token selected for this build has been deleted or rolled」。因此帳戶現有的三枚可選 Build token 均無法使用；在 Worker Builds 建立有效的新 Build token 前，不應再切換或重試既有 token。

## Worker Builds Build token 修復依據（2026-08-15）

Cloudflare Workers Builds 官方設定文件確認：Worker 的 **Settings → Build → API token** 是授權建置環境執行部署命令的 build token；更新並儲存設定後，下一次重試會使用新的 token。[Workers Builds Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)。本專案部署命令為 `npx wrangler pages deploy dist/public --project-name junyi-english-cosmos`，因此新 build token 需對目標 Pages 專案具備 `Account → Cloudflare Pages → Edit` 權限。

Workers Builds API 參考另行區分「呼叫 Builds API 的 user-scoped API token」與「建置系統執行部署的 build token」；前者需要 `Workers Builds Configuration → Edit`，不應和 Wrangler Pages 部署所使用的 build token 混用。[Workers Builds API reference](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/)。

經使用者確認後，已在 Cloudflare My Profile 建立名稱為 `junyi-cosmos-build-2026-08-15` 的新 Custom API Token，設定 `Account → Cloudflare Pages → Edit`。回到 `junyi-cosmos` Worker 的 Settings → Build 後確認，API token 欄位暫仍顯示 `cool-english-cosmos build token`；該 token 已被 Build `867903fc-7c59-4c7f-ade0-d39c72523e9d` 驗證為失效。下一步必須在同一個下拉選單明確選取新建立的 `junyi-cosmos-build-2026-08-15` token、儲存，再進行一次建置重試。

My Browser 在同一設定頁的 Build 區塊確認：Build command 為 `pnpm run build`，Deploy command 為 `npx wrangler pages deploy dist/public --project-name junyi-english-cosmos`，API token 目前仍顯示 `cool-english-cosmos build token`，並保有加密的 `CLOUDFLARE_API_TOKEN` 建置變數。新 Custom token 尚未被選取，因此目前不可將這個設定視為已修復。

後續在同一個 Build token 下拉選單中選擇 Workers Builds 專用的建立流程後，已建立並儲存新權杖 **`Workers Builds - 2026-08-15 20:58`**。設定頁重新載入後仍顯示此名稱，且未顯示未儲存變更，表示新的 Build token 已成功取代舊的 `cool-english-cosmos build token`。下一步僅需在使用者另行確認後重試一次建置，判定建置前的 token 阻塞是否已解除。

重試建置 `867903fc-7c59-4c7f-ade0-d39c72523e9d` 後，Cloudflare 詳情頁顯示本次使用新的 **`Workers Builds - 2026-08-15 20:58`**，Build command 為 `pnpm run build`、Deploy command 為 `npx wrangler pages deploy dist/public --project-name junyi-english-cosmos`。但初始化完成後仍立即回覆：`The build token selected for this build has been deleted or rolled and cannot be used for this build.` 這表示所有既有 token、Pages Custom Token 與新建立的 Workers Builds 專用 token 都被服務端拒絕；阻塞已提升為 Cloudflare Worker Builds 的 token 關聯／服務端狀態問題，而非專案程式碼或本地設定問題。
