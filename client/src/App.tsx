import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import EmployeePortal from "@/pages/EmployeePortal";
import HRDashboard from "@/pages/HRDashboard";
import Team from "@/pages/Team";
import Careers from "@/pages/Careers";
import CareerApply from "@/pages/CareerApply";
import Applications from "@/pages/Applications";
import Healthcare from "@/pages/solutions/healthcare";
import Finance from "@/pages/solutions/finance";
import Manufacturing from "@/pages/solutions/manufacturing";
import Retail from "@/pages/solutions/retail";
import Transportation from "@/pages/solutions/transportation";
import Energy from "@/pages/solutions/energy";
import MediaProduction from "@/pages/solutions/media-production";
import MachineLearning from "@/pages/technology/machine-learning";
import NLP from "@/pages/technology/nlp";
import ComputerVision from "@/pages/technology/computer-vision";
import Robotics from "@/pages/technology/robotics";
import DataAnalytics from "@/pages/technology/data-analytics";
import Blog from "@/pages/resources/blog";
import CaseStudies from "@/pages/resources/case-studies";
import Whitepapers from "@/pages/resources/whitepapers";
import Research from "@/pages/resources/research";
import Leadership from "@/pages/company/leadership";
import Partners from "@/pages/company/partners";
import Awards from "@/pages/company/awards";
import Press from "@/pages/company/press";
import FAQ from "@/pages/support/faq";
import Documentation from "@/pages/support/documentation";
import Training from "@/pages/support/training";
import OrganizationChart from "@/pages/OrganizationChart";
import DepartmentPortal from "@/pages/DepartmentPortal";
import EmployeeRequests from "@/pages/EmployeeRequests";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
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

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
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
      <Route path={"/login"} component={Login} />
      <Route path={"/employee"} component={EmployeePortal} />
      <Route path={"/hr"} component={HRDashboard} />
      <Route path={"/team"} component={Team} />
      <Route path={"/careers"} component={Careers} />
      <Route path={"/careers/apply"} component={CareerApply} />
      <Route path={"/applications"} component={Applications} />
      <Route path={"/solutions/healthcare"} component={Healthcare} />
      <Route path={"/solutions/finance"} component={Finance} />
      <Route path={"/solutions/manufacturing"} component={Manufacturing} />
      <Route path={"/solutions/retail"} component={Retail} />
      <Route path={"/solutions/transportation"} component={Transportation} />
      <Route path={"/solutions/energy"} component={Energy} />
      <Route path={"/solutions/media-production"} component={MediaProduction} />
      <Route path={"/technology/machine-learning"} component={MachineLearning} />
      <Route path={"/technology/nlp"} component={NLP} />
      <Route path={"/technology/computer-vision"} component={ComputerVision} />
      <Route path={"/technology/robotics"} component={Robotics} />
      <Route path={"/technology/data-analytics"} component={DataAnalytics} />
      <Route path={"/resources/blog"} component={Blog} />
      <Route path={"/resources/case-studies"} component={CaseStudies} />
      <Route path={"/resources/whitepapers"} component={Whitepapers} />
      <Route path={"/resources/research"} component={Research} />
      <Route path={"/company/leadership"} component={Leadership} />
      <Route path={"/company/partners"} component={Partners} />
      <Route path={"/company/awards"} component={Awards} />
      <Route path={"/company/press"} component={Press} />
      <Route path={"/support/faq"} component={FAQ} />
      <Route path={"/support/documentation"} component={Documentation} />
      <Route path={"/support/training"} component={Training} />
      <Route path="/organization-chart" component={OrganizationChart} />
      <Route path="/departments/:dept" component={DepartmentPortal} />
      <Route path="/employee-requests" component={EmployeeRequests} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
      </Switch>
    </>
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
