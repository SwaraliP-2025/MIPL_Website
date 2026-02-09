import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProfessionalNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    iconImage: "sec_cons.png",  
    title: "Security Consultancy",
    description: "MIPL is the consultant of choice for several large organisations for designing and managing enterprise-class security technology solutions. MIPL has also advised several safe city, smart city programs and is currently involved in the application of AI & IOT in security management.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    iconImage: "secaudit.png",  
    title: "Security Audits",
    description: "MIPL conducts risk analysis and security audits using TRAVA. It detects if there are any vulnerabilities in the hardware or software. It also checks whether there are any weaknesses in the network and if the staff is sensitive enough while collecting, sharing and storing data.MIPL’s experienced team can help your organisation in conducting the audit, suggesting and implementing the necessary changes to fortify the system and train human resources.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    iconImage: "egov.png",  
    title: "eGovernance Consultancy",
    description: "MIPL provides unparalleled expertise in designing security & eGovernance programs with its two decades of experience in designing IT & security solutions across enterprises in the government vertical and large industrial premises.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    iconImage: "smartcity.png",  
    title: "Smart City",
    description: "MIPL can work with municipal bodies in designing, implementing and maintaining a Smart City. We are equipped to provide high grade video surveillance via CCTVs, traffic management, emergency response and command and control mechanisms; besides making workplaces and sensitive locations secure using biometrics and other tools.",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    iconImage: "sectrain.png",  
    title: "Security Training",
    description: "MIPL can provide handholding and training programs related to generic technology as well as during specific project implementation.",
    gradient: "from-red-500/20 to-rose-500/20",
  },
  {
    iconImage: "safecity.png",  
    title: "Safe City",
    description: "MIPL can design and implement an all-inclusive and integrated security management system for an entire city based on the risks and security needs, as analysed with the help of local civic bodies. We provide security solutions for domestic as well as commercial locations like banks, ATMs, industrial and educational institutes,  courts, shopping malls, ports, airports and public transport systems.",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
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
              key={service.title}
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
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
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
