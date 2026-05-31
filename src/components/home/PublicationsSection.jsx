import { Link } from "react-router-dom";
import { Calendar, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollFloat } from "@/components/ScrollFloat";

export const PublicationsSection = () => {
  // Publications data
  const publications = [
    {
      id: 1,
      title: "Smart City Security Best Practices",
      description: "Comprehensive guide to implementing modern security systems in urban environments, featuring AI-powered threat detection and real-time monitoring.",
      date: "January 2026",
      image: "/projects/suratdiam.jpg",
      type: "article"
    },
    {
      id: 2,
      title: "Enterprise Infrastructure Security",
      description: "Insights into securing critical infrastructure for petroleum refineries and industrial complexes with multi-layer security architecture.",
      date: "February 2026",
      image: "/projects/hpclmum.jpg",
      type: "article"
    },
    {
      id: 3,
      title: "Digital Governance Transformation",
      description: "Case study on implementing e-governance solutions for municipal corporations to improve citizen services and operational efficiency.",
      date: "March 2026",
      image: "/projects/nanded corp.jpg",
      type: "article"
    },
    {
      id: 4,
      title: "Case Study 1",
      description: "IVSS for District & Subordinate Courts of Madhya Pradesh",
      date: "2022",
      image: "/projects/0148.png",
      type: "pdf",
      url: "/publications/CASE STUDY1_MIPL.pdf"
    },
    {
      id: 5,
      title: "Case Study 2",
      description: "ISMS for Mangalore Refineries & Petrochemicals Ltd.",
      date: "2023",
      image: "/projects/Hydrocracker_Units.jpg",
      type: "pdf",
      url: "/publications/CASE STUDY 2_MIPL.pdf"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Our Publications
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Insights, articles, and case studies from our team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {publications.map((item, index) => (
            <ScrollFloat key={item.id} strength={32 + index * 2}>
              <div>
                <Card className="h-full border border-gray-200 bg-[#0f172a] overflow-hidden">
                {/* Featured Image */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  {item.type === "pdf" && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 text-xs font-medium text-white flex items-center gap-1">
                      <FileText className="w-3 h-3 mr-1" />
                      PDF
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: "#E9863C" }}>
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {item.type === "article" ? (
                    <Link
                      to={`/article/${item.id}`}
                      className="inline-flex items-center gap-2 font-medium" style={{ color: "#E9863C" }}>
                      Read More
                    </Link>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium" style={{ color: "#E9863C" }}>
                      Read More
                    </a>
                  )}
                </div>
              </Card>
              </div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
};