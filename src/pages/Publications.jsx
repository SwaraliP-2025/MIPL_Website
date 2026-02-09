import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { BookOpen, FileText, Newspaper, Download, ExternalLink } from "lucide-react";

const publications = [
  {
    type: "Technical Paper",
    title: "Advanced CCTV Surveillance Systems: Design and Implementation",
    description: "Comprehensive guide on designing and implementing large-scale CCTV surveillance systems for urban environments and critical infrastructure.",
    year: "2023",
    category: "Security Technology"
  },
  {
    type: "White Paper",
    title: "Emergency Management Preparedness in Smart Cities",
    description: "Strategic framework for integrating emergency response systems with smart city infrastructure for enhanced disaster management.",
    year: "2023",
    category: "Smart Cities"
  },
  {
    type: "Case Study",
    title: "Nanded Safe City Project: A Model Implementation",
    description: "Detailed analysis of the award-winning Nanded Safe City project, covering design, deployment, and operational outcomes.",
    year: "2022",
    category: "Safe City"
  },
  {
    type: "Journal Article",
    title: "Biometric Access Control: Challenges and Solutions at Scale",
    description: "Insights from implementing one of India's largest biometric access control systems across multiple locations.",
    year: "2022",
    category: "Access Control"
  },
  {
    type: "Technical Paper",
    title: "Command & Control Centers: Best Practices for Refineries",
    description: "Industry-first documentation on implementing integrated C&C systems in refinery environments with focus on safety and efficiency.",
    year: "2021",
    category: "Industrial Security"
  },
  {
    type: "White Paper",
    title: "Video Analytics and AI in Public Safety",
    description: "Exploring the role of artificial intelligence and video analytics in enhancing public safety and security operations.",
    year: "2021",
    category: "AI & Analytics"
  },
  {
    type: "Case Study",
    title: "Court Security Implementation: Supreme Court Guidelines",
    description: "Comprehensive documentation of security rollout for court premises following Supreme Court mandates.",
    year: "2020",
    category: "Government Projects"
  },
  {
    type: "Journal Article",
    title: "Networking Infrastructure for Large-Scale Surveillance",
    description: "Technical insights on designing robust networking infrastructure to support city-wide surveillance systems.",
    year: "2020",
    category: "Network Design"
  },
  {
    type: "Technical Paper",
    title: "Integration of Physical and Cyber Security Systems",
    description: "Framework for converging physical security systems with cybersecurity measures for comprehensive protection.",
    year: "2019",
    category: "Integrated Security"
  },
  {
    type: "White Paper",
    title: "eGovernance and Security: A Holistic Approach",
    description: "Strategic recommendations for integrating security considerations into eGovernance initiatives.",
    year: "2019",
    category: "eGovernance"
  },
];

const categories = [
  { name: "Security Technology", count: 3, icon: FileText },
  { name: "Smart Cities", count: 2, icon: BookOpen },
  { name: "Case Studies", count: 2, icon: Newspaper },
  { name: "Access Control", count: 1, icon: FileText },
  { name: "Industrial Security", count: 1, icon: FileText },
  { name: "AI & Analytics", count: 1, icon: FileText },
];

const Publications = () => {
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
            <span className="text-primary font-medium mb-4 block">Knowledge Sharing</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Publications & Research
            </h1>
            <p className="text-xl text-muted-foreground">
              Sharing expertise through technical papers, white papers, case studies, and journal 
              articles on security management, smart cities, and technology implementation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 relative overflow-hidden border-b border-border">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Publication Categories</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4 text-center hover:glow-border group cursor-pointer"
              >
                <category.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">{category.name}</p>
                <span className="text-xs text-muted-foreground">{category.count} {category.count === 1 ? 'publication' : 'publications'}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Publications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of technical papers, white papers, and case studies
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {publications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-8 hover:glow-border group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon & Type */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                          {publication.type}
                        </span>
                        <h3 className="text-xl font-bold mt-1">{publication.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {publication.category}
                        </span>
                        <span className="text-sm text-muted-foreground">{publication.year}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {publication.description}
                    </p>
                    <div className="flex gap-3">
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View Online
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <ProfessionalNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Latest Research</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive notifications about new publications and industry insights
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-blue-600 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Publications;
