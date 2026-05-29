import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from "lucide-react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-t border-white/10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-4"
          >
            <Link to="/" className="flex items-center group w-fit">
              <img 
                src={logoConfig.src}
                alt={logoConfig.alt || 'MIPL Logo'}
                style={{ width: parseInt(logoConfig.width) || 96, height: parseInt(logoConfig.height) || 96 }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              {footer.company_description || "Securing India's critical infrastructure and enabling smart governance through innovative technology solutions."}
            </p>
            <div className="flex gap-3 pt-2">
              <motion.a
                href={footer.company_linkedin_url || "https://www.linkedin.com/company/mipl-security-&-it-consultants/about/"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-orange-500/20 hover:text-orange-400 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={footer.company_twitter_url || "https://x.com/consultmipl"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-orange-500/20 hover:text-orange-400 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-widest">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <a href={`mailto:${footer.contact_email || "info@consultmipl.com"}`} className="flex items-start gap-3 hover:text-orange-400 transition-colors group">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{footer.contact_email || "info@consultmipl.com"}</span>
              </a>
              <a href={`tel:${footer.contact_phone || "+919821301414"}`} className="flex items-start gap-3 hover:text-orange-400 transition-colors group">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{footer.contact_phone || "+91 98213 01414"}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{footer.contact_locations || "Thane – Chhatrapati Sambhajinagar – Navi Mumbai – Dubai"}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400"
        >
          <p>{footer.bottom_copyright_text || "© 2026 Maha Infotech Pvt. Ltd. All rights reserved."}</p>
          <div className="flex gap-6">
            <Link 
              to={footer.bottom_privacy_href || "/privacy"}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to={footer.bottom_terms_href || "/terms"}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-orange-400 transition-colors"
            >
              Compliance
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
