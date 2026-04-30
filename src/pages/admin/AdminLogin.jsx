import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Globe, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getCmsUrl, cmsGet, cmsPost } from "@/components/admin/cmsApi";

const AdminLogin = () => {
  const [apiUrl, setApiUrl] = useState(getCmsUrl());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pingStatus, setPingStatus] = useState(null); // null | 'testing' | 'ok' | 'fail'
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('cms_token')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const testConnection = async () => {
    setPingStatus('testing');
    try {
      const data = await cmsGet('ping');
      if (data.success) {
        setPingStatus('ok');
        toast({ title: "Connected!", description: "CMS backend is live." });
      } else {
        setPingStatus('fail');
        toast({ title: "Connection Failed", description: "Backend returned an error.", variant: "destructive" });
      }
    } catch {
      setPingStatus('fail');
      toast({ title: "Connection Failed", description: "Could not reach the backend URL.", variant: "destructive" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await cmsPost({ action: 'login', email, password });
      if (result.success) {
        localStorage.setItem('cms_token', result.token || 'authenticated');
        localStorage.setItem('cms_email', result.email || email);
        toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
        setTimeout(() => navigate('/admin/dashboard'), 500);
      } else {
        // Fallback: local credential check
        if (email === 'info@consultmipl.com' && password === 'Mipl@2000') {
          localStorage.setItem('cms_token', 'local_fallback_token');
          localStorage.setItem('cms_email', email);
          toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
          setTimeout(() => navigate('/admin/dashboard'), 500);
        } else {
          toast({ title: "Login Failed", description: result.message || "Invalid credentials.", variant: "destructive" });
        }
      }
    } catch {
      // Network fallback
      if (email === 'info@consultmipl.com' && password === 'Mipl@2000') {
        localStorage.setItem('cms_token', 'local_fallback_token');
        localStorage.setItem('cms_email', email);
        toast({ title: "Login Successful", description: "Using local authentication." });
        setTimeout(() => navigate('/admin/dashboard'), 500);
      } else {
        toast({ title: "Login Failed", description: "Could not authenticate. Check credentials.", variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-card p-8 space-y-6">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <img src="/logo.png" alt="MIPL" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">CMS Admin Portal</h1>
            <p className="text-sm text-muted-foreground">Maha Infotech Pvt. Ltd.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
           
           {/* <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Google Apps Script URL</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://script.google.com/macros/s/..."
                    value={apiUrl}
                    onChange={(e) => { setApiUrl(e.target.value); setPingStatus(null); }}
                    className="pl-10 bg-white/5 border-2 border-black/20 dark:border-white/10"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={testConnection}
                  disabled={pingStatus === 'testing'}
                  className="shrink-0"
                >
                  {pingStatus === 'testing' ? (
                    <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  ) : pingStatus === 'ok' ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : pingStatus === 'fail' ? (
                    <WifiOff className="h-4 w-4 text-destructive" />
                  ) : (
                    <span className="text-xs">Test</span>
                  )}
                </Button>
              </div>
            </div>
            */}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="info@consultmipl.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-2 border-black/20 dark:border-white/10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-2 border-black/20 dark:border-white/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Signing in...
                </span>
              ) : "Sign In to CMS"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Only authorized MIPL administrators can access this portal.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
