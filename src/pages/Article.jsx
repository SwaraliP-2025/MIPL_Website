import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
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
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
        Smart cities leverage cutting-edge technology to enhance quality of life, improve efficiency, and ensure public safety. This article explores best practices for implementing comprehensive security systems in urban environments.
      </p>
      <h2 class="text-2xl font-bold text-slate-900 mb-4">AI-Powered Threat Detection</h2>
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
        Advanced machine learning algorithms can analyze video feeds in real-time to identify potential security threats, allowing for faster response times and more effective incident management.
      </p>
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Integrated Command & Control</h2>
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
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
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
        Critical infrastructure like petroleum refineries require robust security measures to protect against both physical and cyber threats. This article discusses the multi-layered approach to industrial security.
      </p>
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Perimeter Security</h2>
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
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
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
        Digital transformation of municipal services has revolutionized how citizens interact with their local governments. This case study examines successful implementations across India.
      </p>
      <h2 class="text-2xl font-bold text-slate-900 mb-4">Citizen-Centric Services</h2>
      <p class="text-lg text-slate-600 leading-relaxed mb-6">
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
      <PageHero
        eyebrow="Published Article"
        title={article.title}
        description={article.description}
        image={article.image}
        topChildren={
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Publications
          </Link>
        }
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <BookOpen className="h-4 w-4 text-[#E9863C]" />
          <span className="text-sm font-medium text-white">Article</span>
          <span className="text-white/40">|</span>
          <Calendar className="h-4 w-4 text-white/70" />
          <span className="text-sm text-white/80">{article.date}</span>
        </div>
      </PageHero>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollFloat strength={36}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl"
            >
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 shadow-xl">
                <div className="h-72 w-full overflow-hidden md:h-96">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </div>
            </motion.div>
          </ScrollFloat>
        </div>
      </section>
    </Layout>
  );
};

export default Article;
