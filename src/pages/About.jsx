import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
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
  CheckCircle,
  BarChart3,
  Search
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import { useCmsSheet } from "@/hooks/useCmsConfig";
import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
import { EditorialProjectStrip } from "@/components/home/EditorialProjectStrip";
import { aboutPrinciples } from "@/data/aboutTimeline";

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
  mission: "To help organisations stay safe and run better through honest security and technology advice that fits real needs.",
  vision: "To be known as India's most trusted security and smart-city advisory firm — practical, clear, and dependable.",
};

const defaultValues = [
  { icon: "Shield", title: "Integrity", description: "We uphold the highest ethical standards in all our engagements." },
  { icon: "Target", title: "Excellence", description: "We strive for exceptional quality in every project we undertake." },
  { icon: "Eye", title: "Transparency", description: "Open communication and honest reporting guide our client relationships." },
  { icon: "TrendingUp", title: "Innovation", description: "We continuously evolve to stay ahead of emerging threats and technologies." },
];

const defaultLeadership = [
  {
    name: "Prasad Patil",
    designation: "Director, MIPL",
    education: "Mechanical Engineering (COEP), MBA (IIM Bangalore)",
    vision: "Prasad is one of the leading security consultants and safe city experts in India. He has advised several municipal corporations, government departments, PSUs & large private sector organisations on the effective use of technology in the field of security management. He has nearly more than two decades of experience as a consultant in information technology and security management. As a security consultant, Prasad actively advocates 'appropriateness' of technology usage and believes in the value of detailed risk assessment. He has been involved in several large security implementations in cities & industrial premises. He has been invited to several national and international conferences to speak on issues concerning the security industry in India and solutions for the same. Prasad completed his mechanical engineering from the College of Engineering, Pune in 1992 and then received an MBA from the prestigious IIM Bangalore in 1994. Prasad is the founder Chairman of SECONA, the Security Consultants' Association, the first association in India creating a unique collaboration platform for independent security consultants. SECONA has also launched a|s|t|r|a, the Academy of Security Technology Training Research and Application. Prasad is also the founder Trustee of Aatman Educational Society, a non-profit trust that manages Aatman Academy, an inclusive school for children with learning differences & disabilities.",
    image: "ps_img-removebg-preview.png"
  },
  {
    name: "Sudhir Deshpande",
    designation: "Director, MIPL",
    education: "Electronics Engineering (JNEC Aurangabad)",
    vision: "Sudhir is a leading consultant in India in the field of security management, including large CCTV systems, access control technologies and emergency and disaster management preparedness. For the past 20 years, Mr. Deshpande has been actively advising large corporations on networking, communication and security management projects. As a security consultant, Sudhir has been involved in several large security implementations including the award winning Nanded Safe City Project, Kolhapur, Aurangabad, Nashik, Godhra, Dahod and Bharuch. He has been involved in the conceptualization and rollout of one of the largest biometric access control project in the world for HPCL, on a pan India basis. As a consultant, Sudhir has the ability to encapsulate the needs of the customers in specific functional requirements, that enable customers to choose technologies in a more effective manner. He is specialized in CCTV technologies, networking and control room operations and has delivered this ability to many private sector organisations too. Sudhir completed his electronics engineering from JNEC Aurangabad in 1990. Sudhir is the founder Trustee of Aatman Educational Society, a non-profit trust that manages Aatman Academy, an inclusive school for children with learning differences & disabilities. He is also the member Secretary of SECONA.",
    image: "ss_img-removebg-preview.png"
  }
];

const stats = [
  { icon: Users, value: "25+", label: "Years of Experience" },
  { icon: Globe, value: "4", label: "Office Locations" },
  { icon: Award, value: "Award", label: "Winning Consultancy" },
];

const About = () => {
  const { data: leadershipData, loading: leadershipLoading } = useCmsData('Leadership', defaultLeadership);
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
      <Helmet>
        <title>About Us | MIPL - Maha Infotech Pvt. Ltd.</title>
        <meta name="description" content="Learn about MIPL - India's leading security & IT consultancy with 25+ years of expertise in Safe Cities, Smart Governance, and Enterprise Infrastructure Security." />
        <meta name="keywords" content="about MIPL, Maha Infotech Pvt Ltd, security consultancy, IT consultancy, safe city experts, leadership team" />
      </Helmet>
      <PageHero
        eyebrow="Founded 2000"
        title="India's trusted independent security advisory."
        description="When cities and enterprises needed honest, practical security advice, Prasad Patil and Sudhir Deshpande built MIPL — 25 years and 50+ cities later, that trust continues."
        image="/bgimage.png"
      />

      {/* Stats */}
      <section className="py-12 border-b border-gray-200 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {aboutStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Award;
              return (
                <ScrollFloat key={index} strength={28}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
                    <p className="text-slate-600">{stat.label}</p>
                  </motion.div>
                </ScrollFloat>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="card-grid-equal grid lg:grid-cols-2 gap-12">
            <ScrollFloat strength={38} className="h-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex h-full min-h-[280px] flex-col p-8 lg:p-10 bg-[#0f172a] rounded-2xl"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
                <p className="flex-1 text-slate-300 leading-relaxed">
                  {missionVision.mission}
                </p>
              </motion.div>
            </ScrollFloat>

            <ScrollFloat strength={38} className="h-full">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex h-full min-h-[280px] flex-col p-8 lg:p-10 bg-[#0f172a] rounded-2xl"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
                <p className="flex-1 text-slate-300 leading-relaxed">
                  {missionVision.vision}
                </p>
              </motion.div>
            </ScrollFloat>
          </div>
        </div>
      </section>

      {/* Advisory principles */}
      <section className="bg-[#0d1b3e] px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-black text-white">How we work</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {aboutPrinciples.map((p, i) => (
              <ScrollFloat key={p.title} strength={28 + i * 4}>
                <div className="border border-white/10 p-8">
                  <h3 className="text-lg font-bold text-[#f0a500]">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{p.description}</p>
                </div>
              </ScrollFloat>
            ))}
          </div>
        </div>
      </section>

      {/* Values - Updated heading */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="card-grid-equal grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsValues.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Shield;
              return (
              <ScrollFloat key={value.title} strength={34} className="h-full min-h-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex h-full min-h-[260px] flex-col items-center p-6 text-center bg-[#0f172a] rounded-2xl transition-all"
                >
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-300">{value.description}</p>
                </motion.div>
              </ScrollFloat>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Our Leadership</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Led by experienced security advisors and safe-city specialists
            </p>
          </motion.div>

          {leadershipLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="card-grid-equal grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {leadershipData.map((member, index) => (
                <ScrollFloat key={index} strength={42} className="h-full min-h-0">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col p-8 bg-[#0f172a] rounded-2xl"
                  >
                    <div className="mb-5 flex shrink-0 justify-center">
                      <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-primary/20">
                        <img 
                          src={index === 0 ? "ps_img-removebg-preview.png" : "ss_img-removebg-preview.png"}
                          alt={member.name}
                          className="h-full w-full object-cover object-[center_20%]"
                        />
                      </div>
                    </div>

                    <div className="mb-4 shrink-0 text-center">
                      <h3 className="text-2xl font-bold mb-1 text-white">{member.name}</h3>
                      <p className="text-primary text-sm font-medium">{member.designation}</p>
                    </div>

                    {member.education && (
                      <div className="mb-3 shrink-0 border-b border-gray-700 pb-3">
                        <p className="text-xs text-slate-400 font-medium text-center">
                          Education: {member.education}
                        </p>
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-sm text-slate-300 leading-relaxed text-justify whitespace-pre-line" style={{ lineHeight: '1.85' }}>
                        {member.vision}
                      </p>
                    </div>
                  </motion.div>
                </ScrollFloat>
              ))}
            </div>
          )}
        </div>
      </section>

      <EditorialProjectStrip
        eyebrow="Selected Work"
        title="Advisory work on national assignments."
        ctaHref="/projects"
      />
    </Layout>
  );
};

export default About;
