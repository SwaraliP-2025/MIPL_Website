import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCmsSheet } from "@/hooks/useCmsConfig";
import { clientLogos as defaultClientLogos } from "@/data/experienceTimeline";

const cmsDefaults = [
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

export const ClientTrustBand = () => {
  const { data: cmsClients } = useCmsSheet("ClientLogos", cmsDefaults);

  const clients =
    cmsClients.length > 0
      ? cmsClients.map((c) => ({
          name: c.name,
          image: c.logo || c.image,
        }))
      : defaultClientLogos.map((c) => ({ name: c.name, image: c.image }));

  const doubled = [...clients, ...clients];

  return (
    <section className="overflow-hidden border-y border-slate-200 bg-white py-16">
      <div className="mb-10 px-6 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">Our Clients</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Trusted by Leading Organizations
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Government agencies, public sector undertakings, and industry leaders across India.
        </p>
        <Link
          to="/projects"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#244884] transition-colors hover:text-[#E9863C]"
        >
          View Client Projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center gap-8 px-6 md:gap-12"
        >
          {doubled.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex h-24 w-44 shrink-0 flex-col items-center justify-center rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 shadow-sm transition-transform hover:scale-105 md:h-28 md:w-48"
            >
              <div className="flex h-16 w-full items-center justify-center">
                <img
                  src={client.image}
                  alt={`${client.name} logo`}
                  className="max-h-12 max-w-[120px] object-contain opacity-90 md:max-h-14"
                />
              </div>
              <p className="mt-2 text-center text-[10px] font-semibold leading-tight text-slate-800 md:text-xs">
                {client.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-12 text-center text-sm text-slate-600">
        Serving 50+ clients across government, energy, banking, and industrial sectors
      </p>
    </section>
  );
};
