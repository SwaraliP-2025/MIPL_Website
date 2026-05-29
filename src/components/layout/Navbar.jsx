import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCmsConfig } from "@/hooks/useCmsConfig";
import { useNavLinks } from "@/context/NavContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const location = useLocation();
  const { config: cmsConfig, loading } = useCmsConfig();
  const { navLinks } = useNavLinks();

  // Get logo from CMS config
  const logoConfig = loading
    ? { src: '/logo.png', alt: 'MIPL Logo', width: 80, height: 80 }
    : (cmsConfig?.logos?.find(l => l.type === 'main') || { src: '/logo.png', alt: 'MIPL Logo', width: 80, height: 80 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20" 
          : "bg-white"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center !bg-transparent" aria-label="MIPL Home">
            <div className="flex items-center justify-center !bg-transparent">
              <img
                src={logoConfig.src}
                alt={logoConfig.alt || 'MIPL Logo'}
                style={{ width: parseInt(logoConfig.width) || 80, height: parseInt(logoConfig.height) || 80 }}
                className="!bg-transparent"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 notranslate" translate="no" role="menubar">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
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
                      className={`flex items-center gap-1 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                        isActiveLink(link)
                          ? "text-[#E9863C] bg-[#E9863C]/10"
                          : "text-gray-700 hover:text-[#244884] hover:bg-gray-100"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </Link>

                    {openDropdown === link.name && (
                      <div
                        className="absolute top-full left-0 w-56 z-[9999] notranslate"
                        translate="no"
                        role="menu"
                      >
                        <div className="shadow-lg border border-gray-200 rounded-xl overflow-hidden mt-2 bg-white">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              role="menuitem"
                              className={`block px-4 py-3 text-sm hover:bg-gray-100 transition-colors cursor-pointer ${
                                location.pathname === item.href
                                  ? "text-[#E9863C] bg-[#E9863C]/10 font-medium"
                                  : "text-gray-700 hover:text-[#244884]"
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    role="menuitem"
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                      location.pathname === link.href
                        ? "text-[#E9863C] bg-[#E9863C]/10"
                        : "text-gray-700 hover:text-[#244884] hover:bg-gray-100"
                    }`}
                    aria-current={location.pathname === link.href ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side: User Icon */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Login"
            >
              <User className="w-5 h-5 text-gray-600 hover:text-[#E9863C] transition-colors" />
            </Link>
          </div>

          {/* Mobile: Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#E9863C] transition-colors"
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
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-gray-200 bg-white notranslate"
          translate="no"
          role="menu"
        >
          <div className="container mx-auto px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown && link.dropdown.length > 0 ? (
                  <div>
                    <button
                      onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.name ? null : link.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                        isActiveLink(link)
                          ? "text-[#E9863C] bg-[#E9863C]/10"
                          : "text-gray-700 hover:text-[#244884] hover:bg-gray-100"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileOpenDropdown === link.name && (
                      <div
                        className="ml-4 mt-2 space-y-1 notranslate"
                        translate="no"
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
                                ? "text-[#E9863C] bg-[#E9863C]/10 font-medium"
                                : "text-gray-600 hover:text-[#244884] hover:bg-gray-100"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    role="menuitem"
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === link.href
                        ? "text-[#E9863C] bg-[#E9863C]/10"
                        : "text-gray-700 hover:text-[#244884] hover:bg-gray-100"
                    }`}
                    aria-current={location.pathname === link.href ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2 border-t border-gray-200 notranslate" translate="no">
              <Button
                asChild
                className="w-full bg-[#E9863C] hover:bg-[#d67734] text-white font-semibold transition-colors"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-[#244884] hover:bg-gray-100 transition-all"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
