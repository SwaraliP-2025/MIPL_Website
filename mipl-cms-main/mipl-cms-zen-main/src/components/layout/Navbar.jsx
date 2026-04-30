import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const navLinks = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    dropdown: [
      { name: "About MIPL", href: "/about" },
      { name: "Our Achievements", href: "/achievements" },
      { name: "Our Publications", href: "/publications" },
      { name: "Our Social Contribution", href: "/social-activities" },
      { name: "Gallery", href: "/gallery" },
    ]
  },
  { name: "Services", href: "/services" },
  { name: "Our Clients", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
  { name: "CSN Digital Coffee Table Book", href: "/coffee-table-book" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveLink = (link) => {
    if (link.dropdown) {
      return link.dropdown.some(item => location.pathname === item.href);
    }
    return location.pathname === link.href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-18" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="MIPL Home">
            <div className="dark:bg-white dark:px-1.5 dark:py-0.5 dark:rounded transition-colors">
              <img 
                src="/logo.png" 
                alt="MIPL Logo" 
                className="h-14 md:h-16 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {navLinks.map((link) => (
              <div key={link.name} className="relative" ref={link.dropdown ? dropdownRef : null}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === link.name}
                      className={`flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        isActiveLink(link)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setOpenDropdown(link.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="absolute top-full left-0 mt-2 w-56 glass-card shadow-xl border border-border rounded-xl overflow-hidden"
                          role="menu"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={() => setOpenDropdown(null)}
                              role="menuitem"
                              className={`block px-4 py-3 text-sm hover:bg-muted transition-colors ${
                                location.pathname === item.href
                                  ? "text-primary bg-primary/10 font-medium"
                                  : "text-foreground"
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    role="menuitem"
                    className={`px-2.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    aria-current={location.pathname === link.href ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side: Language + Theme Toggle + CTA + User Icon */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Button
              asChild
              className="bg-primary hover:bg-blue-600 text-primary-foreground font-semibold px-4 py-2 text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            >
              <Link to="/contact">Book Consultation</Link>
            </Button>
            <Link
              to="/login"
              className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center"
              aria-label="Login"
            >
              <User className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>

          {/* Mobile: Language + Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-border"
            role="menu"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                          isActiveLink(link)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                                  location.pathname === item.href
                                    ? "text-primary bg-primary/10 font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem"
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      aria-current={location.pathname === link.href ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 space-y-2"
              >
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-blue-600 text-primary-foreground font-semibold"
                >
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Book a Consultation
                  </Link>
                </Button>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
