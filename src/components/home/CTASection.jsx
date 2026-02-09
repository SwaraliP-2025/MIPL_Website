import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProfessionalNetworkBackground } from "@/components/ProfessionalNetworkBackground";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <ProfessionalNetworkBackground density="medium" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-blue-600/10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-8">
            <Shield className="w-12 h-12 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Secure Your Future?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Partner with MIPL for comprehensive security solutions tailored to 
            your organization's unique needs. Let's build a safer tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-blue-600 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
            >
              <Link to="/contact">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg"
            >
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
