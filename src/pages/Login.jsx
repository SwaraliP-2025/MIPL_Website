import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.endsWith("@consultmipl.com")) {
      toast({
        title: "Access Denied",
        description: "Only @consultmipl.com email addresses are allowed.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyAAAWZbJCvjdC3rvaT9ydrHcgezmb_JuUFIWzWs-03fk4GPAIqNeA6GvmzkxqBEQ4WbQ/exec', {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({
          type: 'login',
          email: email,
          password: password
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        // Store authentication
        localStorage.setItem('mipl_auth', 'true');
        localStorage.setItem('mipl_user', email);
        
        // Store for dashboard profile
        sessionStorage.setItem('loginEmail', email);
        sessionStorage.setItem('loginName', email.split('@')[0]);
        sessionStorage.setItem('lastLogin', new Date().toISOString());
        
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard..."
        });
        
        setTimeout(() => {
          // Use assign instead of href to preserve history
          window.location.assign('/Project Dashboard/index.html');
        }, 1000);
      } else {
        toast({
          title: "Login Failed",
          description: result.message || "Invalid credentials. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Network connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 0.2 }} />
            </linearGradient>
            <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0 }} />
              <animate attributeName="x1" values="-100%;200%" dur="3s" repeatCount="indefinite" />
              <animate attributeName="x2" values="0%;300%" dur="3s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
          
          {/* Animated connection lines */}
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </line>
          <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </line>
          <line x1="70%" y1="50%" x2="90%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" begin="0.9s" repeatCount="indefinite" />
          </line>
          <line x1="20%" y1="70%" x2="40%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" begin="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="40%" y1="80%" x2="60%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" begin="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="60%" y1="75%" x2="80%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" begin="1.8s" repeatCount="indefinite" />
          </line>
          
          {/* Data packets moving along lines */}
          <circle r="2" fill="#60a5fa" opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 10,20 L 30,40" />
          </circle>
          <circle r="2" fill="#818cf8" opacity="0.8">
            <animateMotion dur="3s" begin="0.5s" repeatCount="indefinite" path="M 30,40 L 50,30" />
          </circle>
          <circle r="2" fill="#a78bfa" opacity="0.8">
            <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M 50,30 L 70,50" />
          </circle>
          <circle r="2" fill="#60a5fa" opacity="0.8">
            <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 70,50 L 90,35" />
          </circle>
          <circle r="2" fill="#818cf8" opacity="0.8">
            <animateMotion dur="3s" begin="0.8s" repeatCount="indefinite" path="M 20,70 L 40,80" />
          </circle>
          <circle r="2" fill="#a78bfa" opacity="0.8">
            <animateMotion dur="3s" begin="1.3s" repeatCount="indefinite" path="M 40,80 L 60,75" />
          </circle>
          
          {/* Network nodes with pulsing effect */}
          <circle cx="10%" cy="20%" r="4" fill="#60a5fa" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="30%" cy="40%" r="4" fill="#818cf8" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="30%" r="4" fill="#a78bfa" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="70%" cy="50%" r="4" fill="#60a5fa" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="90%" cy="35%" r="4" fill="#818cf8" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="20%" cy="70%" r="4" fill="#a78bfa" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="40%" cy="80%" r="4" fill="#60a5fa" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="60%" cy="75%" r="4" fill="#818cf8" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="85%" r="4" fill="#a78bfa" opacity="0.6">
            <animate attributeName="r" values="4;7;4" dur="2s" begin="1.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1.7s" repeatCount="indefinite" />
          </circle>
        </svg>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        {/* Diagonal light streaks */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
      </div>

      {/* Back to Home Link */}
      <Link
        to="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors z-50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-slate-800/70 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/20"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-block bg-white px-4 py-2 rounded-md mb-6">
                <img 
                  src="/logo.png" 
                  alt="MIPL Logo" 
                  className="h-16 w-auto mx-auto"
                />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-slate-800">Welcome Back</h1>
              <p className="text-slate-600">
                Sign in to access the Project Dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@consultmipl.com"
                    required
                    className="pl-10 h-12 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10 h-12 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-blue-600 text-primary-foreground font-semibold h-12 text-base mt-6"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500">
                For access issues, contact IT support at{" "}
                <a href="mailto:info@consultmipl.com" className="text-primary hover:underline">
                  info@consultmipl.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
