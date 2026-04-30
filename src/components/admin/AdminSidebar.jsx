import React from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Layout, 
  Briefcase, 
  Building2, 
  Users, 
  Image, 
  BookOpen, 
  UserCircle, 
  BarChart, 
  Heart, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Type, 
  TrendingUp 
} from "lucide-react";
import { motion } from "framer-motion";

export const navItems = [
  { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'siteconfig', label: 'Site Config', icon: Settings },
  { key: 'herocontent', label: 'Hero Content', icon: Layout },
  { key: 'services', label: 'Services', icon: Briefcase },
  { key: 'projects', label: 'Projects', icon: Building2 },
  { key: 'jobs', label: 'Jobs / Careers', icon: Users },
  { key: 'gallery', label: 'Gallery', icon: Image },
  { key: 'publications', label: 'Publications', icon: BookOpen },
  { key: 'leadership', label: 'Leadership', icon: UserCircle },
  { key: 'journey', label: 'Our Journey', icon: TrendingUp },
  { key: 'stats', label: 'Stats', icon: BarChart },
  { key: 'social', label: 'Social Activities', icon: Heart },
  { key: 'achievements', label: 'Achievements', icon: Trophy },
  { key: 'navbar', label: 'Navbar Config', icon: Menu },
  { key: 'footer', label: 'Footer Config', icon: Type },
  { key: 'logo', label: 'Logo Config', icon: Layout },
];

const AdminSidebar = ({ activeSection, onSectionChange, collapsed, onCollapse }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.2 }}
      className="h-full bg-card border-r border-border flex flex-col shrink-0 overflow-hidden"
    >
      <div className="p-3 flex items-center justify-between border-b border-border">
        {!collapsed && <span className="text-sm font-semibold text-foreground truncate">Navigation</span>}
        <button
          onClick={() => onCollapse(!collapsed)}
          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onSectionChange(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted border-l-2 border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;
