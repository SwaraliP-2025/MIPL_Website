import { motion } from "framer-motion";

const sectors = [
  {
    title: "Urban Spaces",
    description: "MIPL has been involved with many urban environments across India for employing technology to improve quality of life and security of participating entities.",
    projects: ["Aurangabad Smart City", "Surat Diamond Bourse", "Nanded Safe City", "Kolhapur Safe City"],
    color: "from-blue-600 to-blue-800"
  },
  {
    title: "Oil & Gas",
    description: "MIPL has been consultant of choice for major oil & gas organisations such as HPCL & MRPL, for redefining the way security is undertaken with the use of technology.",
    projects: ["HPCL Mumbai Refinery", "MRPL Mangaluru", "Nayara Energy Refinery"],
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Large Premises",
    description: "MIPL has designed security technologies for large premises such as Surat Diamond Bourse, Madhya Pradesh High Court and Maharashtra Vidhan Bhavan, with end-to-end implementation support.",
    projects: ["MP High Court (210 Courts)", "Maharashtra Vidhan Bhavan", "JNPT Port"],
    color: "from-purple-600 to-indigo-800"
  }
];

export const SectoralShowcase = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Sectoral Focus
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Deep domain expertise across critical sectors in India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`h-48 rounded-t-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold">{sector.title}</h3>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-b-2xl border border-slate-200">
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {sector.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Key Projects:</h4>
                  <ul className="space-y-1">
                    {sector.projects.map((project, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E9863C]" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
