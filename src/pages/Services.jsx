import { useState } from "react";
import { useCmsData } from "@/hooks/useCmsData";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { 
  Shield, 
  Building2, 
  FileCheck, 
  Camera, 
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Cpu
} from "lucide-react";

const services = [
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV",
    shortDesc: "Video management covering capture, transmission, recording, and analytics",
    description: "Video management is not only about capturing, but also about transmission, recording and analytics.",
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
    id: "biometrics",
    icon: Shield,
    title: "BIOMETRICS",
    shortDesc: "Biometric identification, authentication, and verification",
    description: "Biometric identification, authentication & verification... unimodal or multimodal from fingerprints to vascular to face recognition to iris.",
    features: [
      "Fingerprint Recognition Systems",
      "Vascular Pattern Recognition",
      "Face Recognition Technology",
      "Iris Scanning Solutions",
      "Unimodal & Multimodal Systems",
      "Access Control Integration",
    ],
  },
  {
    id: "intrusion-detection",
    icon: Shield,
    title: "INTRUSION DETECTION",
    shortDesc: "Perimeter intrusion detection systems",
    description: "PIDS – or perimeter intrusion detection systems – offer establishments a proactive tool to tackle a potential criminal before the incident is committed.",
    features: [
      "Perimeter Security Systems",
      "Motion Detection & Alerts",
      "Thermal Imaging Integration",
      "Fence-Mounted Sensors",
      "Underground Detection Systems",
      "Real-Time Threat Assessment",
    ],
  },
  {
    id: "command-control",
    icon: Cpu,
    title: "COMMAND & CONTROL",
    shortDesc: "Critical command and control center design",
    description: "Designing the command & control is a critical task since wrong designs will always lead to faulty implementations.",
    features: [
      "Command Center Architecture",
      "Integrated Security Operations",
      "Real-Time Monitoring Systems",
      "Emergency Response Coordination",
      "Multi-Agency Integration",
      "Decision Support Systems",
    ],
  },
  {
    id: "access-control",
    icon: Shield,
    title: "ACCESS CONTROL",
    shortDesc: "Controls and monitors people, vehicles, and information",
    description: "Anything that comes in or goes out of an enterprise has to be identified, controlled and monitored.",
    features: [
      "Card-Based Access Systems",
      "Biometric Access Control",
      "Vehicle Access Management",
      "Visitor Management Systems",
      "Emergency Lockdown Protocols",
      "Integration with CCTV & Alarms",
    ],
  },
];

const Services = () => {
  const { data: cmsServices } = useCmsData("Services", services);

  // Normalize CMS rows — features comes as comma-separated string
  const allServices = cmsServices.map((s) => ({
    id: s.id || s.title,
    icon: s.icon || null,
    title: s.title || "",
    shortDesc: s.shortDesc || s.description || "",
    description: s.description || "",
    features: typeof s.features === "string"
      ? s.features.split(",").map(f => f.trim()).filter(Boolean)
      : s.features || [],
  }));

  const [activeService, setActiveService] = useState(null);
  const currentService = activeService || allServices[0] || services[0];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <ProfessionalNetworkBackground density="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Why MIPL?
            </h1>
            <p className="text-lg text-muted-foreground">
              MIPL has the expertise, acumen, technology, will and the resolve to ensure safety 
              and security of data, systems, networks that are entrusted to us.Years of experience coupled with the ability 
              to adapt to technological upgrades makes MIPL your trustworthy partner. 
              Besides, we are also a one-stop solution for all your security needs, 
              be it CCTV, biometrics, intrusion detection, command & control and access control.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Navigation */}
            <div className="lg:col-span-1 space-y-2">
              {allServices.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  whileHover={{ x: 8 }}
                  className={`w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all ${
                    currentService.id === service.id
                      ? "glass-card border-primary/50 glow-border"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      currentService.id === service.id
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
                      currentService.id === service.id
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
                  key={currentService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 lg:p-12"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-primary/20 text-primary">
                      <currentService.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {currentService.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8">
                    {currentService.description}
                  </p>

                  <h3 className="text-lg font-semibold mb-4">Key Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(currentService.features || []).map((feature, index) => (
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
