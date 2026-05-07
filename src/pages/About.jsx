import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { 
  Shield, 
  Target, 
  Eye,
  Award,
  Users,
  Globe,
  TrendingUp,
  Loader2,
  Zap,
  CheckCircle2,
  BarChart3,
  Search,
  CheckCircle
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import { useCmsSheet } from "@/hooks/useCmsConfig";

const iconMap = {
  Shield, 
  Target, 
  Eye,
  Award,
  Users,
  Globe,
  TrendingUp,
  Zap,
  CheckCircle2,
  BarChart3,
  Search,
  CheckCircle
};

const defaultMissionVision = {
  mission: "To empower organizations with cutting-edge security solutions and innovative technology that protect assets, enable growth, and build a safer digital future for all stakeholders.",
  vision: "To be the global leader in integrated security and smart city solutions, recognized for our innovation, integrity, and commitment to creating secure, intelligent environments.",
};

const defaultValues = [
  { icon: "Shield", title: "Integrity", description: "We uphold the highest ethical standards in all our engagements." },
  { icon: "Target", title: "Excellence", description: "We strive for exceptional quality in every project we undertake." },
  { icon: "Eye", title: "Transparency", description: "Open communication and honest reporting guide our client relationships." },
  { icon: "TrendingUp", title: "Innovation", description: "We continuously evolve to stay ahead of emerging threats and technologies." },
];

const defaultMilestones = [
  { year: "2000", title: "Company Founded", description: "MIPL established as security & IT consultancy" },
  { year: "2010", title: "Government Projects", description: "Started major government and PSU projects" },
  { year: "2015", title: "Udaan iMEGA", description: "Delivered Udaan iMEGA eGovernance project" },
  { year: "2017", title: "Kolhapur Safe City", description: "Implemented Kolhapur Safe City project" },
  { year: "2018", title: "Refinery C&C", description: "First Command & Control system in Indian refinery" },
  { year: "2020", title: "Court Security", description: "Supreme Court-mandated security rollout for courts" },
];

const defaultLeadership = [
  {
    name: "Prasad Patil",
    designation: "Director, MIPL",
    education: "Mechanical Engineering (COEP), MBA (IIM Bangalore)",
    vision: "Prasad is one of the leading security consultants and safe city experts in India. He has advised several municipal corporations, government departments, PSUs & large private sector organisations on the effective use of technology in the field of security management. He has nearly more than two decades of experience as a consultant in information technology and security management.",
    image: "prasadsir.png"
  },
  {
    name: "Sudhir Deshpande",
    designation: "Director, MIPL",
    education: "Electronics Engineering (JNEC Aurangabad)",
    vision: "Sudhir is a leading consultant in India in the field of security management, including large CCTV systems, access control technologies and emergency and disaster management preparedness. For the past 20 years, Mr. Deshpande has been actively advising large corporations on networking, communication and security management projects.",
    image: "sudhir_sir-removebg-preview.png"
  }
];

const stats = [
  { icon: Users, value: "25+", label: "Years of Experience" },
  { icon: Globe, value: "4", label: "Office Locations" },
  { icon: Award, value: "Award", label: "Winning Consultancy" },
];

const About = () => {
  const { data: leadershipData, loading: leadershipLoading } = useCmsData('Leadership', defaultLeadership);
  const { data: journeyData, loading: journeyLoading } = useCmsData('Journey', defaultMilestones);
  const { data: cmsStats, loading: statsLoading } = useCmsSheet('Stats', [
    { icon: 'Users', value: "25+", label: "Years of Experience", page: 'about' },
    { icon: 'Globe', value: "4", label: "Office Locations", page: 'about' },
    { icon: 'Award', value: "Award", label: "Winning Consultancy", page: 'about' },
  ]);
  
  // Mission & Vision from CMS
  const { data: missionVisionData } = useCmsData('AboutMissionVision', defaultMissionVision);
  const missionVision = missionVisionData[0] || defaultMissionVision;
  
  // Core Values from CMS
  const { data: valuesData } = useCmsData('AboutValues', defaultValues);
  const cmsValues = valuesData.length > 0 ? valuesData : defaultValues;

  const filteredAboutStats = cmsStats.filter(s => (s.page || '').toLowerCase().trim() === 'about');
  const aboutStats = filteredAboutStats.length > 0 ? filteredAboutStats : [
    { icon: 'Users', value: "25+", label: "Years of Experience", page: 'about' },
    { icon: 'Globe', value: "4", label: "Office Locations", page: 'about' },
    { icon: 'Award', value: "Award", label: "Winning Consultancy", page: 'about' },
  ];

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
            <span className="text-primary font-medium mb-4 block">About MIPL</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About MIPL
            </h1>
            <p className="text-xl text-muted-foreground">
              Maha Infotech Pvt. Ltd. (MIPL) is a consultancy company, focusing on delivering 
              a wide range of advisory services in the field of Security Management & Information 
              Technology. MIPL assists its Customers in reducing risks in the modern competitive 
              scenarios using latest IT and Security tools & processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 animated-grid opacity-30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {aboutStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Award;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 lg:p-10"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                {missionVision.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 lg:p-10"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                {missionVision.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              MIPL is an award-winning security & IT consultancy company from India. Some of our 
              projects – the Udaan iMEGA eGovernance project, the Kolhapur Safe City project and 
              the Nanded Safe City project have been recognised with national & international awards.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 lg:p-10"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Security Excellence Awards, London</h3>
                  <p className="text-muted-foreground mb-4">
                    MIPL has been recognized on the international stage for excellence in security solutions and innovation.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Shortlisted Finalist - 2014</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Shortlisted Finalist - 2015</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">Shortlisted Finalist - 2017</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - Updated heading */}
      <section className="py-24 bg-card/50 relative overflow-hidden">
        <ProfessionalNetworkBackground density="medium" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsValues.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Shield;
              return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:glow-border transition-all"
              >
                <div className="inline-flex p-4 rounded-xl bg-white/5 text-primary group-hover:bg-primary/20 transition-colors mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Led by India's leading security consultants and safe-city experts
            </p>
          </motion.div>

          {leadershipLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {leadershipData.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 hover:glow-border group"
                >
                  {/* Photo */}
                  <div className="mb-5 flex justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all">
                      {member.image ? (
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-12 h-12 text-primary/40" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Name & Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.designation}</p>
                  </div>
                  
                  {/* Education */}
                  {member.education && (
                    <div className="pb-3 mb-3 border-b border-white/10">
                      <p className="text-xs text-muted-foreground font-medium text-center">
                        Education: {member.education}
                      </p>
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify whitespace-pre-line" style={{ lineHeight: '1.85' }}>
                    {member.vision}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 relative overflow-hidden">
        <ProfessionalNetworkBackground density="medium" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our 25+ year journey of excellence
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {journeyLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-px" />

                {journeyData.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block w-1/2" />
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />
                    <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="glass-card p-6">
                        <span className="text-primary font-bold text-lg">{milestone.year}</span>
                        <h3 className="font-semibold mt-1">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
