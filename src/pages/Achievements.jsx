import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { Award, Trophy, Star, Target, CheckCircle } from "lucide-react";

const achievements = [
  {
    year: "2014",
    title: "Security Excellence Awards - Finalist",
    location: "London, UK",
    description: "First international recognition for outstanding contributions to security technology and management.",
    category: "International Recognition"
  },
   {
    year: "2015",
    title: "Security Excellence Awards - Finalist",
    location: "London, UK",
    description: "Second consecutive year as finalist, showcasing consistent excellence in security management.",
    category: "International Recognition"
  },
  {
    year: "2017",
    title: "Security Excellence Awards - Finalist",
    location: "London, UK",
    description: "Recognized as finalist for innovative security solutions and implementations in the international arena.",
    category: "International Recognition"
  },
  {
    year: "2017",
    title: "Award-Winning Nanded Safe City Project",
    location: "Nanded, Maharashtra",
    description: "Implemented comprehensive safe city solution recognized for its innovative approach and effectiveness.",
    category: "Safe City Projects"
  },
  {
    year: "2017",
    title: "Kolhapur Safe City Implementation",
    location: "Kolhapur, Maharashtra",
    description: "Delivered integrated surveillance and security management system for enhanced public safety.",
    category: "Safe City Projects"
  },
  
  {
    year: "2018",
    title: "First Command & Control System in Indian Refinery",
    location: "India",
    description: "Pioneered the implementation of integrated Command & Control system in the Indian refinery sector, setting new industry standards.",
    category: "Industry Innovation"
  },
  {
    year: "2019",
    title: "Largest Biometric Access Control Project",
    location: "Pan India - HPCL",
    description: "Successfully delivered one of the largest biometric access control projects in the world for HPCL across India.",
    category: "Major Implementation"
  },
 
  {
    year: "2020",
    title: "Supreme Court-Mandated Security Rollout",
    location: "Courts across India",
    description: "Executed large-scale security implementation for court premises as mandated by the Supreme Court of India.",
    category: "Government Projects"
  },
];

const highlights = [
  {
    icon: Trophy,
    title: "3x International Finalist",
    description: "Security Excellence Awards, London (2014, 2015, 2017)"
  },
  {
    icon: Star,
    title: "Industry Pioneer",
    description: "First C&C system in Indian refinery sector"
  },
  {
    icon: Target,
    title: "Scale Leader",
    description: "Largest biometric project in India"
  },
  {
    icon: CheckCircle,
    title: "Government Trust",
    description: "Supreme Court-mandated implementations"
  },
];

const Achievements = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <ProfessionalNetworkBackground density="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Recognition & Excellence</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Achievements
            </h1>
            <p className="text-xl text-muted-foreground">
              Over two decades of excellence, innovation, and recognition in security management 
              and technology implementation across India and internationally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 relative overflow-hidden border-b border-border">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center hover:glow-border group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Achievement Timeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A chronological journey of our major milestones and recognitions
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-8 hover:glow-border group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Year Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="text-center">
                        <Award className="w-6 h-6 text-primary mx-auto mb-1" />
                        <span className="text-primary font-bold text-sm">{achievement.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold">{achievement.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {achievement.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {achievement.location}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <ProfessionalNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Work with Award-Winning Experts?</h2>
            <p className="text-muted-foreground mb-8">
              Let our proven track record of excellence work for your security needs
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-blue-600 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;
