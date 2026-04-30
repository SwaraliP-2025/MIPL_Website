import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { useCmsConfig } from "@/hooks/useCmsConfig";

export const Footer = () => {
  const { config: cmsConfig, loading } = useCmsConfig();

  // Get footer data from CMS or use defaults
  const footer = loading ? {} : cmsConfig.footer;
  const logoConfig = loading ? { src: '/logo.png', alt: 'MIPL Logo', width: 96, height: 96 } :
    (cmsConfig.logos.find(l => l.type === 'main') || { src: '/logo.png', alt: 'MIPL Logo', width: 96, height: 96 });

  // Quick links from CMS
  const quickLinks = loading ? [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ] : [
    { name: footer.quicklinks_link_1_name || "About Us", href: footer.quicklinks_link_1_href || "/about" },
    { name: footer.quicklinks_link_2_name || "Our Team", href: footer.quicklinks_link_2_href || "/about" },
    { name: footer.quicklinks_link_3_name || "Careers", href: footer.quicklinks_link_3_href || "/careers" },
    { name: footer.quicklinks_link_4_name || "Contact", href: footer.quicklinks_link_4_href || "/contact" },
  ];

  // Services from CMS
  const services = loading ? [
    { name: "Security Consultancy", href: "/services" },
    { name: "Security Audits (TRAVA)", href: "/services" },
    { name: "eGovernance", href: "/services" },
    { name: "Smart City & Safe City", href: "/services" },
  ] : [
    { name: footer.services_service_1_name || "Security Consultancy", href: footer.services_service_1_href || "/services" },
    { name: footer.services_service_2_name || "Security Audits (TRAVA)", href: footer.services_service_2_href || "/services" },
    { name: footer.services_service_3_name || "eGovernance", href: footer.services_service_3_href || "/services" },
    { name: footer.services_service_4_name || "Smart City & Safe City", href: footer.services_service_4_href || "/services" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <Link to="/" className="flex items-center group">
              <div className="dark:bg-white dark:p-2 dark:rounded-lg transition-colors">
                <img 
                  src={logoConfig.src}
                  alt={logoConfig.alt || 'MIPL Logo'}
                  style={{ width: parseInt(logoConfig.width) || 96, height: parseInt(logoConfig.height) || 96 }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {footer.company_description || "A New Era of Security. Security & IT consultancy from India."}
            </p>
            <div className="flex gap-3">
              <motion.a
                href={footer.company_linkedin_url || "https://www.linkedin.com/company/mipl-security-&-it-consultants/about/"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={footer.company_twitter_url || "https://x.com/consultmipl"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-primary" />
                <span>{footer.contact_email || "info@consultmipl.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-primary" />
                <span>{footer.contact_phone || "+91 98213 01414"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary" />
                <span>{footer.contact_locations || "Thane – Chhatrapati Sambhajinagar – Navi Mumbai – Dubai"}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>{footer.bottom_copyright_text || "© 2026 Maha Infotech Pvt. Ltd. All rights reserved."}</p>
          <div className="flex gap-4">
            <Link 
              to={footer.bottom_privacy_href || "/privacy"}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to={footer.bottom_terms_href || "/terms"}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
