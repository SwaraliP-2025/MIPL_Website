import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const EnhancedCTASection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-[#E9863C]/30 mb-6"
          >
            <Zap className="w-4 h-4 text-[#E9863C]" />
            <span className="text-sm font-medium text-slate-700">Ready to Transform?</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            Transform Your Enterprise
            <br />
            <span className="text-[#E9863C]">
              With India's Leading Consulting Partner
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Partner with MIPL for enterprise digital transformation, AI-powered governance, 
            and intelligent infrastructure solutions. Built in India. Scaled for the world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#E9863C] hover:bg-[#d67734] text-white font-bold px-8 py-6 text-lg transition-all group"
            >
              <Link to="/contact">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-6 text-lg font-semibold"
            >
              <Link to="/publications">View Our Publications</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
