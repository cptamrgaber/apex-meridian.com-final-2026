import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import EmployeePortal from "@/pages/EmployeePortal";
import HRDashboard from "@/pages/HRDashboard";
import HRRequests from "@/pages/HRRequests";
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
import DataCenterRoadmap from "@/pages/DataCenterRoadmap";
import OnboardingPortal from "@/pages/OnboardingPortal";
import SystemMonitoring from "@/pages/SystemMonitoring";
import AUCPartnership from "@/pages/partnerships/AUC";
import CairoUniversityPartnership from "@/pages/partnerships/CairoUniversity";
import ZewailCityPartnership from "@/pages/partnerships/ZewailCity";
import Publications from "@/pages/research/Publications";
import Timeline from "@/pages/research/Timeline";
import Researchers from "@/pages/research/Researchers";
import ResearcherProfile from "@/pages/research/ResearcherProfile";
import ResearchBlog from "@/pages/research/Blog";
import BlogPost from "@/pages/research/BlogPost";
import CollaborationForm from '@/pages/research/CollaborationForm';
import Pricing from '@/pages/Pricing';
import CheckoutPage from '@/pages/CheckoutPage';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import CustomerPortal from '@/pages/CustomerPortal';
import AdminSettings from '@/pages/AdminSettings';
import MetricsDashboard from '@/pages/research/MetricsDashboard';
import Library from '@/pages/Library';
import News from "@/pages/News";
import AMAVLaunch from "@/pages/news/AMAVLaunch";
import AMAVProject from "@/pages/research/AMAVProject";
import AIComplianceBlog from "@/pages/research/AIComplianceBlog";
import AMAVCaseStudy from "@/pages/case-studies/AMAVCaseStudy";
import CyberSecurityCaseStudy from "@/pages/case-studies/CyberSecurityCaseStudy";
import SecurityAssessment from "@/pages/SecurityAssessment";
import AIModelPoisoning from "@/pages/blog/AIModelPoisoning";
import ZeroTrustAviation from "@/pages/blog/ZeroTrustAviation";
import SecurityBlog from "@/pages/blog/SecurityBlog";
import SecurityResources from "@/pages/SecurityResources";
import AnalyticsDashboard from "@/pages/admin/AnalyticsDashboard";
import LeadsDashboard from "@/pages/admin/LeadsDashboard";
import ABTestingDashboard from "@/pages/admin/ABTestingDashboard";
import SocialHome from "@/pages/social/SocialHome";
import ProfileSetup from "@/pages/social/ProfileSetup";
import UserProfile from "@/pages/social/UserProfile";
import Explore from "@/pages/social/Explore";
import Messages from "@/pages/social/Messages";
import ModerationDashboard from "@/pages/admin/ModerationDashboard";
import Stories from "@/pages/social/Stories";
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
      <Route path={"/partnerships/auc"} component={AUCPartnership} />
      <Route path={"/partnerships/cairo-university"} component={CairoUniversityPartnership} />
      <Route path={"/partnerships/zewail-city"} component={ZewailCityPartnership} />
      <Route path={"/research/publications"} component={Publications} />
      <Route path={"/research/timeline"} component={Timeline} />
      <Route path={"/researchers"} component={Researchers} />
      <Route path={"/researchers/:id"} component={ResearcherProfile} />
      <Route path={"/research/blog"} component={ResearchBlog} />
      <Route path={"/research/blog/:id"} component={BlogPost} />
      <Route path={"/research/collaboration"} component={CollaborationForm} />
      <Route path={"/research/metrics"} component={MetricsDashboard} />
      <Route path={"/research/am-av-project"} component={AMAVProject} />
      <Route path={"/research/blog/ai-compliance-nlp"} component={AIComplianceBlog} />
      <Route path={"/case-studies/am-av-regional-carrier"} component={AMAVCaseStudy} />
      <Route path={"/case-studies/aviation-security"} component={CyberSecurityCaseStudy} />
      <Route path={"/security-assessment"} component={SecurityAssessment} />
      <Route path={"/blog/ai-model-poisoning"} component={AIModelPoisoning} />
      <Route path={"/blog/zero-trust-aviation"} component={ZeroTrustAviation} />
      <Route path="/blog/security" component={SecurityBlog} />
      <Route path="/security-resources" component={SecurityResources} />
      <Route path="/admin/analytics" component={AnalyticsDashboard} />
      <Route path="/admin/leads" component={LeadsDashboard} />
      <Route path="/admin/ab-tests" component={ABTestingDashboard} />
      <Route path={"/news"} component={News} />
      <Route path={"/news/am-av-occ-system-launch"} component={AMAVLaunch} />
      <Route path={"/library"} component={Library} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/checkout"} component={CheckoutPage} />
      <Route path={"/checkout/success"} component={CheckoutSuccess} />
      <Route path={"/account/subscriptions"} component={CustomerPortal} />
      <Route path={"/admin/settings"} component={AdminSettings} />
      <Route path={"/technology"} component={Technology} />      <Route path={"/investors"} component={Investors} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/sitemap"} component={SiteMap} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/login"} component={Login} />
      <Route path={"/employee"} component={EmployeePortal} />
      <Route path={"/hr-dashboard"} component={HRDashboard} />
      <Route path={"/hr-requests"} component={HRRequests} />
      <Route path="/data-center-roadmap" component={DataCenterRoadmap} />
      <Route path="/onboarding" component={OnboardingPortal} />
      <Route path="/system-monitoring" component={SystemMonitoring} />
      <Route path={"/team"} component={Team} />
      <Route path={"/our-team"} component={Team} />
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
      
      {/* Social Media Platform Routes */}
      <Route path="/social" component={SocialHome} />
      <Route path="/social/setup" component={ProfileSetup} />
      <Route path="/social/profile/:username" component={UserProfile} />
      <Route path="/social/explore" component={Explore} />
      <Route path="/social/messages" component={Messages} />
      <Route path="/admin/moderation" component={ModerationDashboard} />
      <Route path="/social/stories" component={Stories} />
      
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
