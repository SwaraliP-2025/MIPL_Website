import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const AdminHeader = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('cms_email') || '';

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_email');
    navigate('/admin');
  };

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Menu className="h-5 w-5" />
        </button>
        <img src="/logo.png" alt="MIPL" className="h-8" />
        <span className="text-lg font-bold text-foreground hidden sm:inline">CMS Admin</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden md:inline">{email}</span>
        <ThemeToggle />
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
          <LogOut className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
