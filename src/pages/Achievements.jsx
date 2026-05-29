import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Award, Trophy, Star, Target, CheckCircle } from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";

const iconMap = {
  Trophy,
  Star,
  Target,
  CheckCircle,
  Award
};

const defaultAchievements = [
  { year: "2014", title: "Security Excellence Awards - Finalist", location: "London, UK", description: "First international recognition for outstanding contributions to security technology and management.", category: "International Recognition" },
  { year: "2015", title: "Security Excellence Awards - Finalist", location: "London, UK", description: "Second consecutive year as finalist, showcasing consistent excellence in security management.", category: "International Recognition" },
  { year: "2017", title: "Security Excellence Awards - Finalist", location: "London, UK", description: "Recognized as finalist for innovative security solutions and implementations in the international arena.", category: "International Recognition" },
  { year: "2017", title: "Nanded Safe City Project", location: "Nanded, Maharashtra", description: "Implemented comprehensive safe city solution recognized nationally and internationally for its innovative approach and effectiveness.", category: "Safe City Projects" },
  { year: "2017", title: "Kolhapur Safe City Project", location: "Kolhapur, Maharashtra", description: "Delivered integrated surveillance and security management system for enhanced public safety recognized nationally and internationally.", category: "Safe City Projects" },
];

const defaultHighlights = [
  { icon: "Trophy", title: "3x International Finalist", description: "Security Excellence Awards, London (2014, 2015, 2017)" },
  { icon: "Star", title: "Industry Pioneer", description: "First C&C system in Indian refinery sector" },
  { icon: "Target", title: "Scale Leader", description: "Largest biometric project in India" },
  { icon: "CheckCircle", title: "Government Trust", description: "Supreme Court-mandated implementations" },
];

const Achievements = () => {
  const { data: achievementsData } = useCmsData('Achievements', defaultAchievements);
  const achievements = achievementsData.length > 0 ? achievementsData : defaultAchievements;

  const { data: highlightsData } = useCmsData('AchievementsHighlights', defaultHighlights);
  const highlights = highlightsData.length > 0 ? highlightsData : defaultHighlights;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Recognition & Excellence</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              Our Achievements
            </h1>
            <p className="text-xl text-slate-600">
              Over two decades of excellence, innovation, and recognition in security management 
              and technology implementation across India and internationally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon] || Trophy;
              return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 text-center bg-slate-50 border border-gray-200 rounded-xl hover:border-primary/50 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">{highlight.title}</h3>
                <p className="text-sm text-slate-600">{highlight.description}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
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
                className="p-8 bg-slate-50 border border-gray-200 rounded-xl hover:border-primary/50 group"
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
                      <h3 className="text-xl font-bold text-slate-900">{achievement.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {achievement.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {achievement.location}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 text-center max-w-3xl mx-auto bg-slate-50 border border-gray-200 rounded-xl"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to Work with Award-Winning Experts?</h2>
            <p className="text-slate-600 mb-8">
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