import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "2000",
    title: "Company Formation",
    description: "MIPL established as an independent technology consulting organisation in security technology management & IT consulting",
    image: "/clients/hpcl-logo.png" // placeholder
  },
  {
    year: "2010",
    title: "First Safe City Project in India",
    description: "Pioneered the concept of true Command & Control in Safe City Projects",
    image: "/clients/ascdcl-logo.png"
  },
  {
    year: "2012",
    title: "Oil & Gas Projects",
    description: "Became consultant of choice for major oil & gas organisations like HPCL & MRPL",
    image: "/clients/mrpl-logo.jpg"
  },
  {
    year: "2017",
    title: "eCourts Projects",
    description: "Award-winning eGovernance implementation",
    image: "/clients/jnpt-logo.png"
  },
  {
    year: "2019",
    title: "Smart City Projects",
    description: "Multiple smart city consultancy projects across India",
    image: "/clients/sdb-logo.png"
  }
];

export const JourneyTimeline = () => {
  return (
    <section className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Our Journey of Excellence
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            25+ years of shaping India's security and smart governance landscape
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E9863C] to-[#d67734] md:-translate-x-px" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Circle */}
              <div className="hidden md:block w-1/2" />
              <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-[#E9863C] border-4 border-[#0f172a] md:-translate-x-1/2 z-10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>

              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <div className="text-[#E9863C] font-bold text-xl mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
