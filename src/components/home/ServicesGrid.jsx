import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProfessionalNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { ArrowUpRight } from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";

const defaultServices = [
  { id: 1, iconImage: "sec_cons.png", title: "Security Consultancy", description: "MIPL is the consultant of choice for several large organisations for designing and managing enterprise-class security technology solutions.", gradient: "from-blue-500/20 to-cyan-500/20" },
  { id: 2, iconImage: "secaudit.png", title: "Security Audits", description: "MIPL conducts risk analysis and security audits using TRAVA. It detects if there are any vulnerabilities.", gradient: "from-purple-500/20 to-pink-500/20" },
  { id: 3, iconImage: "egov.png", title: "eGovernance Consultancy", description: "MIPL provides unparalleled expertise in designing security & eGovernance programs.", gradient: "from-green-500/20 to-emerald-500/20" },
  { id: 4, iconImage: "smartcity.png", title: "Smart City", description: "MIPL can work with municipal bodies in designing, implementing and maintaining a Smart City.", gradient: "from-orange-500/20 to-amber-500/20" },
  { id: 5, iconImage: "sectrain.png", title: "Security Training", description: "MIPL can provide handholding and training programs related to generic technology.", gradient: "from-red-500/20 to-rose-500/20" },
  { id: 6, iconImage: "safecity.png", title: "Safe City", description: "MIPL can design and implement an all-inclusive and integrated security management system.", gradient: "from-indigo-500/20 to-violet-500/20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const ServicesGrid = () => {
  const { data: cmsServices } = useCmsData('HomeServices', defaultServices);
  const services = cmsServices.length > 0 ? cmsServices : defaultServices;

  return (
    <section className="py-24 relative overflow-hidden">
      <ProfessionalNetworkBackground density="medium" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">What We Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Core Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The implementation of successful security projects demands a great amount of experience 
            and significant expertise – both abundantly available with the MIPL team. We are able to 
            offer security advice, services & training that are a culmination of clear understanding 
            of security risks and precise knowledge of appropriate technologies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id || service.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/services"
                className={`block h-full p-8 rounded-2xl glass-card group relative overflow-hidden`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient || 'from-blue-500/20 to-cyan-500/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon Image */}
                  <div className="mb-6 flex justify-center">
                    <div className="p-6 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                      <img 
                        src={service.iconImage} 
                        alt={`${service.title} icon`}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors text-justify leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};