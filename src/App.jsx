import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipToContent } from "@/components/SkipToContent";
// import { Chatbot } from "@/components/Chatbot";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Projects from "./pages/Projects.jsx";
import Achievements from "./pages/Achievements.jsx";
import Publications from "./pages/Publications.jsx";
import SocialActivities from "./pages/SocialActivities.jsx";
import Gallery from "./pages/Gallery.jsx";
import CoffeeTableBook from "./pages/CoffeeTableBook.jsx";
import CTBFeedback from "./pages/CTBFeedback.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<PageTransition><Index /></PageTransition>} />
        <Route path="about" element={<PageTransition><About /></PageTransition>} />
        <Route path="services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="achievements" element={<PageTransition><Achievements /></PageTransition>} />
        <Route path="publications" element={<PageTransition><Publications /></PageTransition>} />
        <Route path="social-activities" element={<PageTransition><SocialActivities /></PageTransition>} />
        <Route path="gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="coffee-table-book" element={<PageTransition><CoffeeTableBook /></PageTransition>} />
        <Route path="ctb-feedback" element={<PageTransition><CTBFeedback /></PageTransition>} />
        <Route path="careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipToContent />
          <ScrollToTop />
          {/* <Chatbot /> */}
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
