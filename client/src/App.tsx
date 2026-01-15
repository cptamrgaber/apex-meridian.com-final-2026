import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Aviation from "./pages/solutions/Aviation";
import Cybersecurity from "./pages/solutions/Cybersecurity";
import Education from "./pages/solutions/Education";
import AGI from "./pages/solutions/AGI";
import Technology from "./pages/Technology";
import Investors from "./pages/Investors";
import Contact from "./pages/Contact";
import SiteMap from "./pages/SiteMap";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/solutions"} component={Solutions} />
      <Route path={"/solutions/aviation"} component={Aviation} />
      <Route path={"/solutions/cybersecurity"} component={Cybersecurity} />
      <Route path={"/solutions/education"} component={Education} />
      <Route path={"/solutions/agi"} component={AGI} />
      <Route path={"/technology"} component={Technology} />
      <Route path={"/investors"} component={Investors} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/sitemap"} component={SiteMap} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
