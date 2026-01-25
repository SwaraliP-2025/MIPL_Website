import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  Shield, 
  Building2, 
  FileCheck, 
  Cpu, 
  Camera, 
  GraduationCap,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    id: "security-audits",
    icon: Shield,
    title: "Security Audits",
    shortDesc: "Comprehensive risk analysis and vulnerability assessments",
    description: "Our security audit services provide in-depth analysis of your organization's security posture, identifying vulnerabilities before they can be exploited.",
    features: [
      "Penetration Testing & Vulnerability Assessment",
      "Network Security Architecture Review",
      "Application Security Testing",
      "Compliance Gap Analysis (ISO 27001, GDPR, etc.)",
      "Social Engineering Assessment",
      "Security Policy Review & Development",
    ],
  },
  {
    id: "smart-cities",
    icon: Building2,
    title: "Smart City Solutions",
    shortDesc: "Command centers, surveillance, and emergency response",
    description: "Transform urban infrastructure with intelligent systems that enhance safety, efficiency, and citizen services through cutting-edge technology.",
    features: [
      "Integrated Command & Control Centers",
      "City-wide Video Surveillance Networks",
      "Emergency Response Management Systems",
      "Traffic Management & Analytics",
      "Public Safety Communication Networks",
      "Environmental Monitoring Solutions",
    ],
  },
  {
    id: "egovernance",
    icon: FileCheck,
    title: "eGovernance",
    shortDesc: "Digital transformation for government operations",
    description: "Enable seamless digital delivery of government services with secure, scalable, and citizen-centric solutions.",
    features: [
      "Citizen Service Portals",
      "Digital Document Management",
      "Online Payment Integration",
      "Government Process Automation",
      "Data Analytics & Reporting Dashboards",
      "Inter-department Integration",
    ],
  },
  {
    id: "ai-iot",
    icon: Cpu,
    title: "AI & IoT Integration",
    shortDesc: "Intelligent automation and connected ecosystems",
    description: "Leverage artificial intelligence and IoT to create smart, automated systems that drive efficiency and innovation.",
    features: [
      "AI-Powered Analytics & Insights",
      "IoT Device Management Platforms",
      "Predictive Maintenance Systems",
      "Smart Building Automation",
      "Edge Computing Solutions",
      "Machine Learning Model Deployment",
    ],
  },
  {
    id: "surveillance",
    icon: Camera,
    title: "Video Surveillance",
    shortDesc: "Enterprise-grade CCTV and video analytics",
    description: "Comprehensive video surveillance solutions with advanced analytics for comprehensive security monitoring.",
    features: [
      "IP Camera Network Design & Deployment",
      "Video Management Systems (VMS)",
      "AI-Based Video Analytics",
      "Facial Recognition Integration",
      "License Plate Recognition (ANPR)",
      "Cloud & On-Premise Storage Solutions",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Security Training",
    shortDesc: "Capacity building for security teams",
    description: "Empower your workforce with comprehensive security training programs designed to build lasting capabilities.",
    features: [
      "Cybersecurity Awareness Programs",
      "Technical Security Certifications",
      "Incident Response Training",
      "Executive Security Briefings",
      "Hands-on Workshop Sessions",
      "Continuous Learning Platforms",
    ],
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative network-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comprehensive Security & Technology Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              From risk assessment to implementation, we provide end-to-end consulting 
              services tailored to your unique requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Navigation */}
            <div className="lg:col-span-1 space-y-2">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  whileHover={{ x: 8 }}
                  className={`w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all ${
                    activeService.id === service.id
                      ? "glass-card border-primary/50 glow-border"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      activeService.id === service.id
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.shortDesc}</p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-opacity ${
                      activeService.id === service.id
                        ? "opacity-100 text-primary"
                        : "opacity-0"
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {/* Service Details */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 lg:p-12"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-primary/20 text-primary">
                      <activeService.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {activeService.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8">
                    {activeService.description}
                  </p>

                  <h3 className="text-lg font-semibold mb-4">Key Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeService.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
