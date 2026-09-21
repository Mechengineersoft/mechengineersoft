import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import RootLayout from '@/app/layout';
import HomePage from '@/app/page';
import AboutPage from '@/app/about/page';
import ServicesPage from '@/app/services/page';
import TechnologiesPage from '@/app/technologies/page';
import IndustriesPage from '@/app/industries/page';
import PortfolioPage from '@/app/portfolio/page';
import ProjectDetailPage from '@/app/portfolio/[slug]/page';
import BlogPage from '@/app/blog/page';
import ArticlePage from '@/app/blog/[slug]/page';
import PricingPage from '@/app/pricing/page';
import FaqPage from '@/app/faq/page';
import ContactPage from '@/app/contact/page';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import CookiePage from '@/app/cookie-policy/page';
import DisclaimerPage from '@/app/disclaimer/page';
import AdminLoginPage from '@/app/admin/login/page';
import AdminPage from '@/app/admin/page';
import NotFound from '@/app/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/technologies" component={TechnologiesPage} />
        <Route path="/industries" component={IndustriesPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/portfolio/:slug" component={ProjectDetailPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={ArticlePage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/cookie-policy" component={CookiePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RootLayout><Router /></RootLayout></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
