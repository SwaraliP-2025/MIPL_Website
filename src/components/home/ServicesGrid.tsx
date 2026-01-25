import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Building2, 
  FileCheck, 
  Cpu, 
  Camera, 
  GraduationCap,
  ArrowUpRight 
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Security Audits",
    description: "Comprehensive risk analysis and vulnerability assessments for your infrastructure.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Building2,
    title: "Smart City Solutions",
    description: "Command centers, surveillance systems, and emergency response platforms.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: FileCheck,
    title: "eGovernance",
    description: "Digital transformation solutions for government operations and citizen services.",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: Cpu,
    title: "AI & IoT Integration",
    description: "Intelligent automation and connected device ecosystems for modern enterprises.",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Camera,
    title: "Video Surveillance",
    description: "Enterprise-grade CCTV and analytics for comprehensive security monitoring.",
    gradient: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: GraduationCap,
    title: "Security Training",
    description: "Capacity building and technology handholding for your security teams.",
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-400",
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
    <section className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">What We Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Comprehensive Security Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From risk assessment to implementation, we provide end-to-end 
            security and technology consulting services.
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
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
