import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ArrowUpRight, Building2, Landmark, Factory, CreditCard } from "lucide-react";

const categories = [
  { id: "all", label: "All Projects", icon: null },
  { id: "government", label: "Government", icon: Landmark },
  { id: "smart-city", label: "Smart City", icon: Building2 },
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "banking", label: "Banking", icon: CreditCard },
];

const projects = [
  {
    id: 1,
    title: "National Smart City Command Center",
    category: "smart-city",
    client: "Ministry of Urban Development",
    challenge: "Lack of integrated city-wide monitoring and emergency response coordination.",
    solution: "Deployed a unified command center with real-time analytics, video surveillance integration, and emergency management systems.",
    result: "40% improvement in emergency response time, 99.9% system uptime achieved.",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format",
  },
  {
    id: 2,
    title: "Enterprise Security Transformation",
    category: "industrial",
    client: "Fortune 500 Manufacturing Company",
    challenge: "Outdated security infrastructure vulnerable to cyber threats and physical intrusions.",
    solution: "Comprehensive security overhaul including network segmentation, access control, and 24/7 monitoring.",
    result: "Zero security breaches since implementation, 50% reduction in security incidents.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format",
  },
  {
    id: 3,
    title: "Digital Governance Platform",
    category: "government",
    client: "State Government of Maharashtra",
    challenge: "Paper-based processes causing delays and corruption in citizen services.",
    solution: "End-to-end digital platform for 200+ government services with secure authentication.",
    result: "10M+ citizens served digitally, 70% reduction in processing time.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&auto=format",
  },
  {
    id: 4,
    title: "Banking Fraud Detection System",
    category: "banking",
    client: "Leading Private Bank",
    challenge: "Rising fraud incidents and inability to detect suspicious transactions in real-time.",
    solution: "AI-powered fraud detection system with machine learning models and real-time alerting.",
    result: "95% fraud detection rate, ₹500Cr+ saved in prevented fraud.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&auto=format",
  },
  {
    id: 5,
    title: "Safe City Surveillance Network",
    category: "smart-city",
    client: "Delhi Police",
    challenge: "Crime monitoring across large urban area with limited manpower.",
    solution: "5000+ camera network with AI-based video analytics and facial recognition.",
    result: "25% reduction in street crime, improved investigation success rate.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format",
  },
  {
    id: 6,
    title: "Critical Infrastructure Protection",
    category: "industrial",
    client: "National Power Grid Corporation",
    challenge: "Protecting critical energy infrastructure from cyber and physical threats.",
    solution: "Multi-layered security framework with SCADA security and perimeter protection.",
    result: "100% compliance achieved, zero critical incidents in 3 years.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format",
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
            <span className="text-primary font-medium mb-4 block">Our Work</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Case Studies & Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of successful implementations across 
              government, enterprise, and smart city domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-white/10 sticky top-20 z-30 glass">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="glass-card overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                          {categories.find(c => c.id === project.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.client}
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Case Study
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-8">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                  {categories.find(c => c.id === selectedProject.category)?.label}
                </span>
                <h2 className="text-2xl font-bold mt-4 mb-2">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedProject.client}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Solution</h4>
                    <p className="text-muted-foreground">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Result</h4>
                    <p className="text-muted-foreground">{selectedProject.result}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-8 w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Projects;
