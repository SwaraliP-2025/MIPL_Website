import { motion } from "framer-motion";

// Default industry data
const defaultIndustries = [
  {
    image: "",
    title: "Oil & Gas",
    description: "Oil & gas refineries, pipelines, distribution terminals and retail outlets have long been under the radar of miscreants as high visibility targets. The MIPL team has been involved with some of the most innovative security projects in this sector, which have tackled security threats in some of the most volatile environments in the world.",
  },
  {
    image: "",
    title: "Smart City & Safe City",
    description: "Safe City projects are a culmination of integrated security design that is based on several security technologies such as video surveillance & analytics, traffic management, emergency response, vehicle tracking and command & control. MIPL can work with city councils to design and implement Safe City Projects that take into consideration local risks and security needs.",
  },
  {
    image: "",
    title: "Judiciary",
    description: "Court infrastructure such as district courts and high courts are areas requiring specialized security management. MIPL provides surveillance systems, access control, and integrated security management solutions that ensure the integrity and security of judicial proceedings across all court locations.",
  },
  {
    image: "",
    title: "Healthcare",
    description: "Healthcare facilities require patient-centric security solutions that balance protection with accessibility. MIPL provides AI-powered diagnostics, integrated healthcare management systems, and security infrastructure that protects sensitive patient data and ensures facility safety.",
  },
  {
    image: "",
    title: "Cyber Security",
    description: "Cyber threats are evolving rapidly and require advanced protection strategies. MIPL provides advanced threat detection, 24/7 security operations, compliance management, and enterprise protection for critical assets. Our solutions protect your organization from sophisticated cyber attacks and data breaches.",
  },
  {
    image: "",
    title: "Artificial Intelligence",
    description: "AI is transforming enterprise operations and governance systems. MIPL delivers AI-powered governance solutions, intelligent infrastructure systems, enterprise transformation services, and AI-driven analytics that enable data-driven decision-making and operational excellence.",
  },
  {
    image: "",
    title: "Information Technology",
    description: "Enterprise IT infrastructure is the backbone of modern organizations. MIPL provides comprehensive IT solutions including cloud-native infrastructure, data centers, enterprise IT services, and digital infrastructure built for growth, scalability, and future-ready operations.",
  },
];

export function IndustriesWeServe({ industries = defaultIndustries }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Industries We Serve
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            We serve a variety of businesses & industries with tailored security solutions
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-slate-50 border border-gray-200 hover:border-[#E9863C]/50 transition-all"
            >
              {/* Image */}
              {industry.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-[#E9863C] transition-colors">{industry.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed text-justify">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
