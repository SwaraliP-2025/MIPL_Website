import { motion } from "framer-motion";

export const ClientLogos = () => {
  const clients = [
    { name: "HPCL", logo: "/clients/hpcl-logo.png" },
    { name: "JNPT", logo: "/clients/jnpt-logo.png" },
    { name: "Aurangabad Smart City", logo: "/clients/ascdcl-logo.png" },
    { name: "IOCL", logo: "/clients/iocl-logo.png" },
    { name: "BNP Paribas", logo: "/clients/bnp-paribas.jpg" },
    { name: "Nayara Energy", logo: "/clients/nayara-logo.jpg" },
    { name: "MRPL", logo: "/clients/mrpl-logo.jpg" },
    { name: "Gujarat Police", logo: "/clients/gujarat-police-logo.jpg" },
    { name: "Surat Diamond Bourse", logo: "/clients/sdb-logo.png" },
    { name: "Maharashtra Govt", logo: "/clients/maharashtra-logo.png" },
  ];

  return (
    <section className="py-16 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-10" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've partnered with government agencies, Fortune 500 companies, and industry leaders 
            to deliver world-class security solutions across India
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 border border-gray-200 hover:border-[#E9863C]/50 transition-all group"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-16 md:h-20 w-auto object-contain transition-all opacity-90 group-hover:opacity-100 group-hover:scale-110 mb-3"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p className="text-xs text-center text-slate-900 font-medium">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats below logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Serving 50+ clients across government, energy, banking, and industrial sectors
          </p>
        </motion.div>
      </div>
    </section>
  );
};
