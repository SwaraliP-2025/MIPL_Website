import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProfessionalNetworkBackground } from "@/components/ProfessionalNetworkBackground";

const features = [
  {
    icon: AlertTriangle,
    title: "Threat Detection",
    description: "Real-time identification of security vulnerabilities",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description: "Quantified risk assessment with actionable insights",
  },
  {
    icon: CheckCircle2,
    title: "Compliance Mapping",
    description: "Automated compliance checks against standards",
  },
];

export const TravaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <ProfessionalNetworkBackground density="medium" />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Proprietary Technology</span>
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Introducing{" "}
              <span className="gradient-text">TRAVA</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Our proprietary Risk Analysis Tool that transforms how organizations 
              identify, assess, and mitigate security threats. TRAVA provides 
              comprehensive vulnerability detection and actionable intelligence.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              asChild
              className="bg-primary hover:bg-blue-600 text-primary-foreground shadow-lg shadow-primary/25 group"
            >
              <Link to="/services">
                Learn About TRAVA
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-slow" />
              
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-primary/30">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 animate-glow" />
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full -translate-x-1/2 translate-y-1/2" />
                <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-400 rounded-full -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute right-0 top-1/2 w-3 h-3 bg-orange-400 rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>

              {/* Inner content */}
              <div className="absolute inset-16 glass-card rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text">TRAVA</div>
                  <p className="text-sm text-muted-foreground mt-2">Risk Analysis</p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-1/4 right-0 px-4 py-2 glass-card rounded-lg text-sm animate-float">
                <span className="text-green-400">✓</span> Secure
              </div>
              <div className="absolute bottom-1/4 left-0 px-4 py-2 glass-card rounded-lg text-sm animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-primary">98%</span> Accuracy
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
