import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HallPage from "./pages/HallPage";
import SpecialtyPage from "./pages/SpecialtyPage";
import GamePage from "./pages/GamePage";
import ParentPage from "./pages/ParentPage";
import TeacherPage from "./pages/TeacherPage";
import JourneyPage from "./pages/JourneyPage";
import ButlerPage from "./pages/ButlerPage";
import PracticePage from "./pages/PracticePage";
import { LearningProgressProvider } from "./contexts/LearningProgressContext";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/hall"} component={HallPage} />
      <Route path={"/specialty"} component={SpecialtyPage} />
      <Route path={"/game"} component={GamePage} />
      <Route path={"/parent"} component={ParentPage} />
      <Route path={"/teacher"} component={TeacherPage} />
      <Route path={"/journey"} component={JourneyPage} />
      <Route path={"/butler"} component={ButlerPage} />
      <Route path={"/practice/:missionId"} component={PracticePage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
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
            <Router />
          </TooltipProvider>
        </LearningProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
