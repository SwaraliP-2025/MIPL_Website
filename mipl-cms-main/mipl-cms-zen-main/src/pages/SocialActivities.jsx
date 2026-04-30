import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { Heart, Users, GraduationCap, HandHeart, Award, Target } from "lucide-react";

const initiatives = [
  {
    icon: GraduationCap,
    title: "Aatman Educational Society",
    role: "Founder Trustee",
    description: "Founded and managing a non-profit trust dedicated to inclusive education and supporting children with learning differences and disabilities.",
    impact: "Providing quality education to children who need specialized learning support",
    year: "Ongoing"
  },
  {
    icon: Users,
    title: "Aatman Academy",
    role: "Managing Trustee",
    description: "An inclusive school specifically designed for children with learning differences and disabilities, offering specialized curriculum and support systems.",
    impact: "Empowering differently-abled children with education and life skills",
    year: "Ongoing"
  },
  {
    icon: Award,
    title: "SECONA",
    role: "Member Secretary",
    description: "Active member and secretary of Security Consultants Association of India, contributing to industry standards and best practices.",
    impact: "Shaping security industry standards and promoting professional excellence",
    year: "Ongoing"
  },
  // {
  //   icon: HandHeart,
  //   title: "Community Security Awareness",
  //   role: "Program Lead",
  //   description: "Conducting regular awareness programs on security, safety, and emergency preparedness for communities and organizations.",
  //   impact: "Educating thousands on personal and community safety measures",
  //   year: "Ongoing"
  // },
  // {
  //   icon: Target,
  //   title: "Skill Development Initiatives",
  //   role: "Mentor & Advisor",
  //   description: "Supporting skill development programs in security management and technology for youth and professionals.",
  //   impact: "Creating employment opportunities in the security sector",
  //   year: "Ongoing"
  // },
  // {
  //   icon: Heart,
  //   title: "Educational Support Programs",
  //   role: "Contributor",
  //   description: "Providing educational support and resources to underprivileged students pursuing careers in technology and security.",
  //   impact: "Enabling access to quality education for deserving students",
  //   year: "Ongoing"
  // },
];

const impactStats = [
  { value: "500+", label: "Students Supported", icon: Users },
  { value: "50+", label: "Awareness Programs", icon: Target },
  { value: "15+", label: "Years of Service", icon: Heart },
  { value: "10+", label: "Community Initiatives", icon: HandHeart },
];

const SocialActivities = () => {
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
            <span className="text-primary font-medium mb-4 block">Giving Back to Society</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Social Activities & Community Impact
            </h1>
            <p className="text-xl text-muted-foreground">
              Beyond business, we are committed to making a positive impact on society through 
              education, community service, and social welfare initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 relative overflow-hidden border-b border-border">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center hover:glow-border group"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Initiatives */}
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Social Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Making a difference through dedicated programs and community engagement
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 hover:glow-border group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <initiative.icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{initiative.title}</h3>
                        <span className="text-sm text-primary font-medium">{initiative.role}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {initiative.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {initiative.description}
                    </p>
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Impact</p>
                        <p className="text-sm text-muted-foreground">{initiative.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aatman Academy Spotlight */}
      <section className="py-24 relative overflow-hidden">
        <ProfessionalNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Aatman Academy</h2>
                  <p className="text-primary font-medium">Inclusive Education for All</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Aatman Academy stands as a beacon of hope for children with learning differences and 
                disabilities. Our inclusive approach ensures that every child receives personalized 
                attention, specialized curriculum, and the support they need to thrive academically 
                and socially.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary mb-1">100+</div>
                  <p className="text-sm text-muted-foreground">Students Enrolled</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary mb-1">20+</div>
                  <p className="text-sm text-muted-foreground">Specialized Educators</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary mb-1">95%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>

              <a
                href="https://aatmanacademy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-primary-foreground font-semibold rounded-lg transition-all"
              >
                Visit Aatman Academy
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section 
      <section className="py-16 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
            <p className="text-muted-foreground mb-8">
              Partner with us in our social initiatives or learn more about how you can contribute
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-blue-600 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get Involved
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>*/}
    </Layout>
  );
};

export default SocialActivities;
