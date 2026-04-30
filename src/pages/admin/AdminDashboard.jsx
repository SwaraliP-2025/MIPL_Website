import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Database, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminSidebar, { navItems } from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";

import SiteConfigSection from "@/components/admin/sections/SiteConfigSection";
import HeroContentSection from "@/components/admin/sections/HeroContentSection";
import ServicesSection from "@/components/admin/sections/ServicesSection";
import ProjectsSection from "@/components/admin/sections/ProjectsSection";
import JobsSection from "@/components/admin/sections/JobsSection";
import GallerySection from "@/components/admin/sections/GallerySection";
import PublicationsSection from "@/components/admin/sections/PublicationsSection";
import LeadershipSection from "@/components/admin/sections/LeadershipSection";
import JourneySection from "@/components/admin/sections/JourneySection";
import StatsSection from "@/components/admin/sections/StatsSection";
import SocialActivitiesSection from "@/components/admin/sections/SocialActivitiesSection";
import AchievementsSection from "@/components/admin/sections/AchievementsSection";
import NavbarConfigSection from "@/components/admin/sections/NavbarConfigSection";
import FooterConfigSection from "@/components/admin/sections/FooterConfigSection";
import LogoConfigSection from "@/components/admin/sections/LogoConfigSection";

const sheetNames = ['Services', 'Projects', 'Jobs', 'Gallery', 'Publications', 'Leadership', 'Journey', 'Stats', 'SocialActivities', 'HeroContent', 'Achievements', 'SiteConfig', 'NavbarConfig', 'FooterConfig', 'LogoConfig'];

const DashboardOverview = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const { toast } = useToast();

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const data = await cmsGet('getAllContent');
      if (data.success && data.content) {
        const c = {};
        Object.entries(data.content).forEach(([k, v]) => { c[k] = Array.isArray(v) ? v.length : 0; });
        setCounts(c);
        setLastSync(new Date().toLocaleString());
      }
    } catch {
      toast({ title: "Error", description: "Could not fetch dashboard data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCounts(); }, []);

  const handleInit = async () => {
    setInitializing(true);
    try {
      const result = await cmsPost({ action: 'initSheets' });
      if (result.success) {
        toast({ title: "Success", description: "All sheets initialized." });
        fetchCounts();
      } else {
        toast({ title: "Error", description: result.message || "Init failed.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not initialize sheets.", variant: "destructive" });
    } finally {
      setInitializing(false);
    }
  };

  const totalRows = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
          {lastSync && <p className="text-sm text-muted-foreground mt-1">Last synced: {lastSync}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchCounts} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          {totalRows === 0 && (
            <Button size="sm" onClick={handleInit} disabled={initializing} className="bg-primary hover:bg-blue-600 text-primary-foreground">
              {initializing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Database className="h-4 w-4 mr-1" />}
              Initialize All Sheets
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sheetNames.map(name => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{name}</h3>
                <span className="text-2xl font-bold text-primary">{counts[name] || 0}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {counts[name] || 0} {(counts[name] || 0) === 1 ? 'row' : 'rows'}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const sectionMap = {
  overview: DashboardOverview,
  siteconfig: SiteConfigSection,
  herocontent: HeroContentSection,
  services: ServicesSection,
  projects: ProjectsSection,
  jobs: JobsSection,
  gallery: GallerySection,
  publications: PublicationsSection,
  leadership: LeadershipSection,
  journey: JourneySection,
  stats: StatsSection,
  social: SocialActivitiesSection,
  achievements: AchievementsSection,
  navbar: NavbarConfigSection,
  footer: FooterConfigSection,
  logo: LogoConfigSection,
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('cms_token')) {
      navigate('/admin');
    }
  }, [navigate]);

  const ActiveComponent = sectionMap[activeSection] || DashboardOverview;

  const handleSectionChange = (key) => {
    setActiveSection(key);
    setMobileOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <AdminHeader onMenuToggle={() => setMobileOpen(!mobileOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`${mobileOpen ? 'fixed inset-y-14 left-0 z-50' : 'hidden'} lg:block`}>
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
