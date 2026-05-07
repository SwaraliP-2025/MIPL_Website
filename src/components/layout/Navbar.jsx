import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useCmsConfig } from "@/hooks/useCmsConfig";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();
  const { config: cmsConfig, loading } = useCmsConfig();

  // const clearDropdownTimeout = () => {
  //   if (dropdownTimeoutRef.current) {
  //     clearTimeout(dropdownTimeoutRef.current);
  //     dropdownTimeoutRef.current = null;
  //   }
  // };

  // const handleDropdownMouseEnter = (name) => {
  //   clearDropdownTimeout();
  //   setOpenDropdown(name);
  // };

  // const handleDropdownMouseLeave = () => {
  //   clearDropdownTimeout();
  //   dropdownTimeoutRef.current = setTimeout(() => {
  //     setOpenDropdown(null);
  //   }, 800); // Delay before closing
  // };

  // useEffect(() => {
  //   return () => clearDropdownTimeout();
  // }, []);

  // Don't close dropdown on route change - let user control it
  // This was causing the dropdown to disappear after navigation

  // Build nav links from CMS config or use defaults
  const defaultLinks = [
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

  // const navLinks = loading ? defaultLinks
  //   : (cmsConfig?.navbar && Array.isArray(cmsConfig.navbar) && cmsConfig.navbar.length > 0
  //       ? cmsConfig.navbar.map(item => ({
  //           name: item.name,
  //           href: item.href,
  //           dropdown: item.dropdown_items
  //             ? item.dropdown_items.split(',').map(d => {
  //                 const [name, href] = d.split('|');
  //                 return { name: name?.trim() || '', href: href?.trim() || '' };
  //               }).filter(d => d.name && d.href)
  //             : undefined,
  //         }))
  //       : defaultLinks
  //     );

  const navLinks =
  cmsConfig?.navbar &&
  Array.isArray(cmsConfig.navbar) &&
  cmsConfig.navbar.length > 0
    ? cmsConfig.navbar.map((item) => {
        let parsedDropdown = [];

        // SAFELY PARSE DROPDOWN
        if (
          typeof item.dropdown_items === "string" &&
          item.dropdown_items.trim() !== ""
        ) {
          parsedDropdown = item.dropdown_items
            .split(",")
            .map((d) => {
              const [name, href] = d.split("|");

              return {
                name: name?.trim() || "",
                href: href?.trim() || "",
              };
            })
            .filter((d) => d.name && d.href);
        }

        // FORCE ABOUT DROPDOWN IF CMS FAILS
        if (
          item.name === "About" &&
          parsedDropdown.length === 0
        ) {
          parsedDropdown = [
            { name: "About MIPL", href: "/about" },
            { name: "Our Achievements", href: "/achievements" },
            { name: "Our Publications", href: "/publications" },
            { name: "Our Social Contribution", href: "/social-activities" },
            { name: "Gallery", href: "/gallery" },
          ];
        }

        return {
          name: item.name,
          href: item.href,
          dropdown:
            parsedDropdown.length > 0
              ? parsedDropdown
              : undefined,
        };
      })
    : defaultLinks;

  // Get logo from CMS config
  const logoConfig = loading
    ? { src: '/logo.png', alt: 'MIPL Logo', width: 56, height: 56 }
    : (cmsConfig?.logos?.find(l => l.type === 'main') || { src: '/logo.png', alt: 'MIPL Logo', width: 56, height: 56 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // // Close mobile menu on route change, but keep desktop dropdown open
  // useEffect(() => {
  //   setIsMobileMenuOpen(false);
  //   setMobileOpenDropdown(null);
  //   // IMPORTANT: Do NOT close openDropdown - it should persist across navigation
  //   // Clear any pending timeouts to prevent dropdown from closing unexpectedly
  //   clearDropdownTimeout();
  // }, [location.pathname]);
  useEffect(() => {
  setIsMobileMenuOpen(false);
  setMobileOpenDropdown(null);
  setOpenDropdown(null);
}, [location.pathname]);

  const isActiveLink = (link) => {
    if (link.dropdown && link.dropdown.length > 0) {
      return link.dropdown.some(item => location.pathname === item.href);
    }
    return location.pathname === link.href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-18" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="MIPL Home">
            <div className="dark:bg-white dark:px-1.5 dark:py-0.5 dark:rounded transition-colors">
              <img
                src={logoConfig.src}
                alt={logoConfig.alt || 'MIPL Logo'}
                style={{ width: parseInt(logoConfig.width) || 56, height: parseInt(logoConfig.height) || 56 }}
                className="transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                // onMouseEnter={() => link.dropdown && link.dropdown.length > 0 && handleDropdownMouseEnter(link.name)}
                // onMouseLeave={() => link.dropdown && link.dropdown.length > 0 && handleDropdownMouseLeave()}
                onMouseEnter={() => {
  if (link.dropdown && link.dropdown.length > 0) {
    setOpenDropdown(link.name);
  }
}}
onMouseLeave={() => {
  setOpenDropdown(null);
}}
              >
                {link.dropdown && link.dropdown.length > 0 ? (
                  <>
                    {/* Dropdown button */}
                    <Link
                      to={link.href}
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
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </Link>

                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-56 z-[9999]"
                          role="menu"
                        >
                          {/* Invisible bridge to prevent dropdown from closing */}
                          {/* <div className="h-2 w-full" /> */}
                          <div className="glass-card shadow-xl border border-border rounded-xl overflow-hidden">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                role="menuitem"
                                className={`block px-4 py-3 text-sm hover:bg-muted transition-colors cursor-pointer ${
                                  location.pathname === item.href
                                    ? "text-primary bg-primary/10 font-medium"
                                    : "text-foreground"
                                }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
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
                  {link.dropdown && link.dropdown.length > 0 ? (
                    <div>
                      <button
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.name ? null : link.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                          isActiveLink(link)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileOpenDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-1 overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => {
                                  setMobileOpenDropdown(null);
                                  setIsMobileMenuOpen(false);
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
                  <Link to="/contact">Book a Consultation</Link>
                </Button>
                <Link
                  to="/login"
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
