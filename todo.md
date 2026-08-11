
- [x] Navbar 右上角改成「已登入 · 星辰小騎士」
- [x] 歲月陪伴功能:每月紀錄 + 成長曲線圖 + 寵物合照相框(保留框)+ 寵物心聲
- [x] 個人能力智慧管家:能力圖譜(含證照/成績)+ AI 下一階段方向建議(可選擇)
- [x] 模擬資料建立(journeyData.ts)
- [x] TypeScript 檢查通過 + 本地建置驗證
- [ ] 部署最新版到 Cloudflare Pages (junyi-english-cosmos)
- [ ] GitHub 推送最新版(作者 nashsung <nashsung2@gmail.com>)

- [x] 新增 JourneyPage(歲月陪伴)獨立頁面:/journey
- [x] 新增 ButlerPage(能力智慧管家)獨立頁面:/butler
- [x] Navbar 加入「歲月陪伴」「能力管家」入口(含路由,其他科目保持假)
- [x] 從 SpecialtyPage 移除歲月陪伴/能力管家 tabs,恢復原 2 tabs
- [x] App.tsx 註冊新路由
- [ ] 驗證 → 建置 → 部署 Cloudflare Pages → GitHub push(作者 nashsung)

- [x] 重構 Navbar：核心入口保留在主列，將學科標籤收納為「學科探索」選單，解決單列過度擁擠問題
- [ ] 補齊全站視覺重構：逐頁優化 Hall／Journey／Butler／Parent／Teacher 的排版、留白、字級與卡片層級，維持一致的深空極簡設計語言
- [x] 建立可重用的互動測驗元件：選答、送出、正誤回饋、解析、下一題與完成摘要
- [x] 建立前端學習狀態：得分、星幣、連續答對、完成任務與能力向度進度
- [x] 將 SpecialtyPage 的推薦資源改為可直接啟動對應練習、顯示完成狀態或連結到均一延伸內容
- [x] 將遊戲模式遠征改為可完成的題組，並把結果同步到星幣與寵物養成循環
- [x] 讓歲月陪伴與能力管家讀取互動練習結果，改為動態呈現進度與建議
- [x] 逐頁完成桌機／手機響應式 QA 記錄：Hall／Practice／Game／Journey／Butler／Parent／Teacher 確認導覽、頁首、主要卡片與內容無擁擠、無遮擋，並把結果寫入任務筆記
- [ ] 依截圖與設計審查結果持續補強頁面識別色、星圖／軌道元素與個別頁首層級
- [ ] 補強各頁的宇宙導航主題與頁面識別色，再將全站視覺重構標示完成
- [ ] 已完成互動邏輯 Vitest、跨裝置截圖與本地建置；待部署 Cloudflare Pages 與 GitHub 推送
