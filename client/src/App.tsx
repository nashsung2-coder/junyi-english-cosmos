import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PracticePage from "./pages/PracticePage";
import { LearningProgressProvider } from "./contexts/LearningProgressContext";
import { SubjectManagementPage, SubjectSelectorPage } from "./pages/SubjectFlowPages";

const HallEntryPage = () => <SubjectSelectorPage area="hall" />;
const SpecialtyEntryPage = () => <SubjectSelectorPage area="specialty" />;
const GameEntryPage = () => <SubjectSelectorPage area="game" />;
const JourneyEntryPage = () => <SubjectSelectorPage area="journey" />;
const ButlerEntryPage = () => <SubjectSelectorPage area="butler" />;
const ParentEntryPage = () => <SubjectSelectorPage area="parent" />;
const TeacherEntryPage = () => <SubjectSelectorPage area="teacher" />;
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      >
        <Router />
      </motion.div>
    </AnimatePresence>
  );
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
            <Toaster />
            <AnimatedRouter />
          </TooltipProvider>
        </LearningProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
