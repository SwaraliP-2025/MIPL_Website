import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Temporary placeholder articles data (this should eventually come from CMS or a data file)
const articleData = [
  {
    id: 1,
    title: "Smart City Security Best Practices",
    description: "Comprehensive guide to implementing modern security systems in urban environments, featuring AI-powered threat detection and real-time monitoring.",
    date: "January 2026",
    content: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Smart cities leverage cutting-edge technology to enhance quality of life, improve efficiency, and ensure public safety. This article explores best practices for implementing comprehensive security systems in urban environments.
      </p>
      <h2 class="text-2xl font-bold text-white mb-4">AI-Powered Threat Detection</h2>
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Advanced machine learning algorithms can analyze video feeds in real-time to identify potential security threats, allowing for faster response times and more effective incident management.
      </p>
      <h2 class="text-2xl font-bold text-white mb-4">Integrated Command & Control</h2>
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Centralized command and control centers enable seamless coordination between various security agencies, ensuring a unified approach to public safety.
      </p>
    `,
    color: "#E9863C",
    image: "/projects/suratdiam.jpg"
  },
  {
    id: 2,
    title: "Enterprise Infrastructure Security",
    description: "Insights into securing critical infrastructure for petroleum refineries and industrial complexes with multi-layer security architecture.",
    date: "February 2026",
    content: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Critical infrastructure like petroleum refineries require robust security measures to protect against both physical and cyber threats. This article discusses the multi-layered approach to industrial security.
      </p>
      <h2 class="text-2xl font-bold text-white mb-4">Perimeter Security</h2>
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Advanced perimeter detection systems including radar, thermal cameras, and fence sensors create the first line of defense for industrial facilities.
      </p>
    `,
    color: "#64DFDF",
    image: "/projects/hpclmum.jpg"
  },
  {
    id: 3,
    title: "Digital Governance Transformation",
    description: "Case study on implementing e-governance solutions for municipal corporations to improve citizen services and operational efficiency.",
    date: "March 2026",
    content: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Digital transformation of municipal services has revolutionized how citizens interact with their local governments. This case study examines successful implementations across India.
      </p>
      <h2 class="text-2xl font-bold text-white mb-4">Citizen-Centric Services</h2>
      <p class="text-lg text-slate-300 leading-relaxed mb-6">
        Online portals and mobile apps allow citizens to access government services from anywhere, reducing wait times and improving satisfaction.
      </p>
    `,
    color: "#E9863C",
    image: "/projects/nanded corp.jpg"
  }
];

const Article = () => {
  const { id } = useParams();
  const article = articleData.find(a => a.id === parseInt(id || "1")) || articleData[0];

  return (
    <Layout>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#030712] to-[#0f172a]">
        <ProfessionalNetworkBackground density="medium" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Article Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#E9863C]/30 mb-6 glass-card">
                <BookOpen className="w-4 h-4" style={{ color: article.color }} />
                <span className="text-sm font-medium text-white">Published Article</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-400 mb-6">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: article.color }}>
                {article.title}
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mb-10">
                {article.description}
              </p>
              
              {/* Featured Image */}
              <div className="w-full h-96 rounded-xl overflow-hidden mb-10 border border-white/10">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card p-8 lg:p-12 border border-white/10">
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Article;
