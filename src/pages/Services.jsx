import { useState } from "react";
import { useCmsData } from "@/hooks/useCmsData";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  Shield, 
  Building2, 
  FileCheck, 
  Camera, 
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Zap,
  HeartPulse,
  Gavel,
  Brain
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
import { EditorialProjectStrip } from "@/components/home/EditorialProjectStrip";
import { ServicesEditorialOverview } from "@/components/services/ServicesEditorialOverview";
import { projectImages } from "@/data/projectImages";
import { getServiceImage } from "@/data/serviceImages";

const services = [
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV",
    shortDesc: "Video management covering capture, transmission, recording, and analytics",
    description: "Video management is not only about capturing, but also about transmission, recording and analytics.",
    features: [
      "IP Camera Network Planning",
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
  {
    id: "ict",
    icon: Cpu,
    title: "ICT",
    shortDesc: "Information & Communication Technology",
    description: "Comprehensive ICT solutions for modern enterprises, including network infrastructure, cloud services, and digital transformation.",
    features: [
      "Network Infrastructure Design",
      "Cloud Computing Solutions",
      "Digital Transformation",
      "Enterprise Software Integration",
      "Data Center Management",
      "Unified Communications",
    ],
  },
  {
    id: "smart-city",
    icon: Building2,
    title: "Smart City",
    shortDesc: "Smart & Safe City Solutions",
    description: "End-to-end smart city solutions integrating urban infrastructure, IoT, and data analytics for sustainable, efficient cities.",
    features: [
      "Smart Traffic Management",
      "Public Safety Systems",
      "Urban IoT Infrastructure",
      "Waste Management Solutions",
      "Energy Efficiency Programs",
      "Citizen Engagement Platforms",
    ],
  },
  {
    id: "cyber-security",
    icon: Shield,
    title: "Cyber Security",
    shortDesc: "Cybersecurity & Threat Intelligence",
    description: "Advanced cybersecurity solutions protecting your digital assets from evolving threats with proactive threat intelligence.",
    features: [
      "Network Security",
      "Threat Detection & Response",
      "Penetration Testing",
      "Security Audits & Compliance",
      "Data Protection & Encryption",
      "Incident Response Planning",
    ],
  },
  {
    id: "oil-gas",
    icon: Zap,
    title: "Oil & Gas",
    shortDesc: "Oil & Gas Infrastructure Security",
    description: "Specialized security solutions for oil and gas facilities, protecting critical infrastructure from physical and cyber threats.",
    features: [
      "Perimeter Security for Facilities",
      "Pipeline Monitoring Systems",
      "Critical Asset Protection",
      "Remote Surveillance Solutions",
      "Emergency Response Systems",
      "Compliance Management",
    ],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    shortDesc: "Healthcare & Medical Infrastructure",
    description: "Comprehensive security and technology solutions for healthcare facilities, ensuring patient safety and data protection.",
    features: [
      "Hospital Security Systems",
      "Patient Monitoring Solutions",
      "Medical Device Security",
      "HIPAA Compliance",
      "Access Control for Restricted Areas",
      "Emergency Response Systems",
    ],
  },
  {
    id: "judiciary",
    icon: Gavel,
    title: "Judiciary",
    shortDesc: "Judiciary & Legal Infrastructure",
    description: "Secure and efficient technology solutions for judicial systems, courts, and legal institutions.",
    features: [
      "Courtroom Security Systems",
      "Evidence Management",
      "Access Control for Sensitive Areas",
      "Surveillance & Monitoring",
      "Case Management Integration",
      "Cybersecurity for Legal Data",
    ],
  },
  {
    id: "ai-iot",
    icon: Brain,
    title: "AI & IoT",
    shortDesc: "Artificial Intelligence & IoT Systems",
    description: "Cutting-edge AI and IoT solutions transforming businesses with intelligent automation and data-driven insights.",
    features: [
      "Machine Learning Solutions",
      "IoT Device Integration",
      "Predictive Analytics",
      "Automation Systems",
      "Smart Sensors Planning",
      "AI-Powered Decision Support",
    ],
  },
];

const iconMap = {
  Camera,
  Shield,
  Cpu,
  Building2,
  Zap,
  HeartPulse,
  Gavel,
  Brain,
  FileCheck,
  GraduationCap,
};

const Services = () => {
  const { data: cmsServices } = useCmsData("Services", services);

  // Normalize CMS rows — features comes as comma-separated string
  const resolveServiceIcon = (s) => {
    const id = s.id || s.title;
    if (typeof s.icon === "function") return s.icon;
    if (typeof s.icon === "string" && iconMap[s.icon]) return iconMap[s.icon];
    return services.find((x) => x.id === id)?.icon || Shield;
  };

  const allServices = cmsServices.map((s) => {
    const id = s.id || s.title;
    return {
      id,
      icon: resolveServiceIcon(s),
      title: s.title || "",
      shortDesc: s.shortDesc || s.description || "",
      description: s.description || "",
      features:
        typeof s.features === "string"
          ? s.features.split(",").map((f) => f.trim()).filter(Boolean)
          : s.features || [],
      image: getServiceImage(id),
    };
  });

  const [activeService, setActiveService] = useState(null);
  const currentService = activeService || allServices[0];

  if (!currentService) {
    return (
      <Layout>
        <p className="p-20 text-center text-slate-600">No services available.</p>
      </Layout>
    );
  }

  const currentImage = currentService.image || getServiceImage(currentService.id);

  return (
    <Layout>
      <Helmet>
        <title>Our Services | MIPL - Security & Smart Solutions</title>
        <meta name="description" content="Explore MIPL's comprehensive services including CCTV, biometrics, intrusion detection, command & control, ICT, smart city, cybersecurity, healthcare, judiciary, and AI & IoT solutions." />
        <meta name="keywords" content="MIPL services, CCTV, biometrics, intrusion detection, command and control, access control, smart city, cybersecurity, ICT, healthcare security, judiciary security, AI & IoT" />
      </Helmet>
      <PageHero
        eyebrow="Our Services"
        title="Security, IT, smart cities, and control rooms."
        description="Advisory services from safety review and planning to setup guidance and ongoing support."
        image={projectImages.aurangabadSmartCity}
      />

      <ServicesEditorialOverview />

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
            Capabilities
          </p>
          <h2 className="mb-10 text-3xl font-black text-[#0d1b3e] md:text-4xl">
            Explore our service areas
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-2 lg:col-span-1">
              {allServices.map((service, index) => {
                const active = currentService.id === service.id;
                const Icon = service.icon;
                return (
                  <ScrollFloat key={service.id} strength={24 + index * 2}>
                    <motion.button
                      type="button"
                      onClick={() => setActiveService(service)}
                      whileHover={{ x: 6 }}
                      className={`flex w-full items-center gap-4 rounded-sm border p-4 text-left transition-all ${
                        active
                          ? "border-[#E9863C] bg-[#0d1b3e] text-white shadow-md"
                          : "border-slate-200 bg-[#f8fafc] hover:border-[#1565c0]/40"
                      }`}
                    >
                      <div
                        className={`rounded-sm p-3 ${
                          active ? "bg-[#E9863C]/20 text-[#E9863C]" : "bg-white text-[#1565c0]"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`truncate font-semibold ${active ? "text-white" : "text-[#0d1b3e]"}`}>
                          {service.title}
                        </h3>
                        <p className={`line-clamp-2 text-sm ${active ? "text-white/75" : "text-slate-600"}`}>
                          {service.shortDesc}
                        </p>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 shrink-0 ${active ? "text-[#E9863C]" : "text-slate-300"}`}
                      />
                    </motion.button>
                  </ScrollFloat>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <ScrollFloat strength={42}>
                  <motion.div
                    key={currentService.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-sm border border-slate-200 bg-[#0d1b3e] shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <img
                        src={currentImage}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-md"
                      />
                      <img
                        src={currentImage}
                        alt={currentService.title}
                        className="relative z-10 h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e] via-[#0d1b3e]/40 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
                        <div className="rounded-sm bg-[#E9863C]/20 p-3 text-[#E9863C]">
                          <currentService.icon className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-black text-white lg:text-3xl">
                          {currentService.title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10">
                      <p className="mb-8 text-lg leading-relaxed text-white/85">
                        {currentService.description}
                      </p>
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E9863C]">
                        Key capabilities
                      </h3>
                      <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
                        {(currentService.features || []).map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            className="flex min-h-[56px] items-start gap-3 border border-white/10 bg-white/5 p-3"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E9863C]" />
                            <span className="text-sm text-white/85">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </ScrollFloat>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <EditorialProjectStrip
        eyebrow="Our Services in Action"
        title="Sites we have advised on."
        images={[
          { image: projectImages.hpclMumbai, label: "HPCL Refinery" },
          { image: projectImages.iocl, label: "IOCL" },
          { image: projectImages.thanePolice, label: "Thane Police" },
          { image: projectImages.mpHighCourt, label: "MP High Court" },
          { image: projectImages.mrplFeatured, label: "MRPL" },
          { image: projectImages.suratDiamond, label: "Surat Diamond Bourse" },
        ]}
      />
    </Layout>
  );
};

export default Services;
