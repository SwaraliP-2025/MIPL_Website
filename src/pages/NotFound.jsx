import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, Shield, Building2, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";

const popularLinks = [
  { name: "Security Consultancy", href: "/services", icon: Shield },
  { name: "Our Clients", href: "/projects", icon: Building2 },
  { name: "About MIPL", href: "/about", icon: Building2 },
  { name: "Career Opportunities", href: "/careers", icon: Briefcase },
  { name: "Contact Us", href: "/contact", icon: Phone },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <PageHero
        eyebrow="Page Not Found"
        title="We couldn't find that page."
        description="Let's get you somewhere with better answers."
        image="/bgimage.png"
      />

      <div className="pb-16 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Oops! We couldn't find the page you were looking for.
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Try one of these popular pages instead.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-blue-600 text-primary-foreground font-semibold px-8"
                >
                  <Link to="/">
                    <Home className="mr-2 w-5 h-5" />
                    Visit the homepage
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 px-8"
                >
                  <Link to="/services">
                    <Search className="mr-2 w-5 h-5" />
                    Explore Services
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Image/Visual */}
            <ScrollFloat strength={48}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[200px] font-bold text-primary/10 select-none">
                      404
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-12 rounded-3xl bg-slate-50 border border-gray-200 shadow-xl">
                      <Shield className="w-32 h-32 text-primary mx-auto" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollFloat>
          </div>

          {/* Popular Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="text-2xl font-bold mb-8">Popular Pages</h2>
            <div className="card-grid-equal grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularLinks.map((link, index) => (
                <ScrollFloat key={link.name} strength={24 + index * 2} className="h-full min-h-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="h-full"
                  >
                    <Link
                      to={link.href}
                      className="card-fill block p-6 bg-slate-50 border border-gray-200 rounded-xl hover:border-[#E9863C]/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <link.icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {link.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </ScrollFloat>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
