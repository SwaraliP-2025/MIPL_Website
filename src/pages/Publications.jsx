import { useCmsData } from "@/hooks/useCmsData";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { BookOpen, FileText, Newspaper, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const publications = [
  {
    "type": "Case Study",
    "title": "IVSS for District & Subordinate Courts of Madhya Pradesh",
    "description": "Comprehensive risk analysis and design of an integrated video surveillance system with distributed monitoring across 201 court premises to meet Supreme Court security mandates.",
    "year": "2022",
    "category": "Government Projects",
    "pdfPath": "/publications/CASE STUDY1_MIPL.pdf"
},
  {
    type: "Case Study",
    title: "ISMS for Mangalore Refineries & Petrochemicals Ltd.",
    description: "Comprehensive documentation of security rollout for court premises following Supreme Court mandates.",
    year: "2020",
    category: "Government Projects",
    pdfPath: "/publications/CASE STUDY 2_MIPL.pdf"
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
  const { data: cmsPublications } = useCmsData("Publications", publications);

  const allPublications = cmsPublications.map((p) => ({
    type: p.type || p.category || "Publication",
    title: p.title || "",
    description: p.abstract || p.description || "",
    year: p.year || "",
    category: p.category || "",
    pdfPath: p.link || p.pdfPath || "",
  }));

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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
            {allPublications.map((publication, index) => (
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
                      {/* <a 
                        href={publication.pdfPath} 
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a> */}
                      <a 
                        href={publication.pdfPath} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Online
                      </a>
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
