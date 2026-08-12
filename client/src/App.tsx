import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { AnimatedPage } from "./components/AnimatedPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { LearningProgressProvider } from "./contexts/LearningProgressContext";

const NotFound = lazy(() => import("@/pages/NotFound"));
const PracticePage = lazy(() => import("./pages/PracticePage"));
const SubjectSelectorPage = lazy(() => import("./pages/SubjectFlowPages").then((module) => ({ default: module.SubjectSelectorPage })));
const SubjectManagementPage = lazy(() => import("./pages/SubjectFlowPages").then((module) => ({ default: module.SubjectManagementPage })));

const HallEntryPage = () => <SubjectSelectorPage area="hall" />;
const SpecialtyEntryPage = () => <SubjectSelectorPage area="specialty" />;
const GameEntryPage = () => <SubjectSelectorPage area="game" />;
const JourneyEntryPage = () => <SubjectSelectorPage area="journey" />;
const ButlerEntryPage = () => <SubjectSelectorPage area="butler" />;
const ParentEntryPage = () => <SubjectSelectorPage area="parent" />;
const TeacherEntryPage = () => <SubjectSelectorPage area="teacher" />;

function RouteFallback() {
  return <main className="page-safe-top grid min-h-screen place-items-center px-5" aria-busy="true" aria-live="polite"><div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-sm text-slate-300"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-300 motion-safe:animate-pulse" />正在開啟下一段航線…</div></main>;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/hall"} component={HallEntryPage} />
      <Route path={"/specialty"} component={SpecialtyEntryPage} />
      <Route path={"/game"} component={GameEntryPage} />
      <Route path={"/parent"} component={ParentEntryPage} />
      <Route path={"/teacher"} component={TeacherEntryPage} />
      <Route path={"/journey"} component={JourneyEntryPage} />
      <Route path={"/butler"} component={ButlerEntryPage} />
      <Route path={"/subject/:subjectId/:area"} component={SubjectManagementPage} />
      <Route path={"/practice/:missionId"} component={PracticePage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AnimatedRouter() {
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();
  const routeTitle = getRouteTitle(location);

  useEffect(() => {
    document.title = `${routeTitle}｜均一學習宇宙`;
  }, [routeTitle]);

  return (
    <>
      <p className="sr-only" aria-live="polite" aria-atomic="true">已開啟{routeTitle}</p>
      <AnimatedPage location={location} reduceMotion={Boolean(reduceMotion)}><Suspense fallback={<RouteFallback />}><Router /></Suspense></AnimatedPage>
    </>
  );
}

function getRouteTitle(location: string) {
  if (location.startsWith("/practice/")) return "學習任務";
  if (location.startsWith("/subject/")) return "科目管理頁";
  return ({ "/": "均一學習宇宙", "/hall": "星際避風港", "/specialty": "專攻區", "/game": "星際冒險", "/journey": "歲月陪伴", "/butler": "能力智慧管家", "/parent": "親子星港", "/teacher": "班級指揮艙" } as Record<string, string>)[location] ?? "均一學習宇宙";
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <LearningProgressProvider>
          <TooltipProvider>
            <a href="#main-content" className="sr-only z-[100] rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">跳至主要內容</a>
            <Toaster />
            <AnimatedRouter />
          </TooltipProvider>
        </LearningProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
