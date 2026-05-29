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
  BarChart3,
  Search,
  CheckCircle
} from "lucide-react";
import { useCmsData } from "@/hooks/useCmsData";
import { useCmsSheet } from "@/hooks/useCmsConfig";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>About Us | MIPL - Maha Infotech Pvt. Ltd.</title>
        <meta name="description" content="Learn about MIPL - India's leading security & IT consultancy with 25+ years of expertise in Safe Cities, Smart Governance, and Enterprise Infrastructure Security." />
        <meta name="keywords" content="about MIPL, Maha Infotech Pvt Ltd, security consultancy, IT consultancy, safe city experts, leadership team" />
      </Helmet>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">About MIPL</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              About MIPL
            </h1>
            <p className="text-xl text-slate-600">
              Maha Infotech Pvt. Ltd. (MIPL) is a consultancy company, focusing on delivering 
              a wide range of advisory services in the field of Security Management & Information 
              Technology. MIPL assists its Customers in reducing risks in the modern competitive 
              scenarios using latest IT and Security tools & processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-200 relative overflow-hidden bg-white">
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
                  <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-slate-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-10 bg-[#0f172a] rounded-2xl"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed">
                {missionVision.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-10 bg-[#0f172a] rounded-2xl"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed">
                {missionVision.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Awards & Recognition</h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
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
              className="p-8 lg:p-10 bg-[#0f172a] rounded-2xl"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Security Excellence Awards, London</h3>
                  <p className="text-slate-300 mb-4">
                    MIPL has been recognized on the international stage for excellence in security solutions and innovation.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-slate-300">Shortlisted Finalist - 2014</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-slate-300">Shortlisted Finalist - 2015</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-slate-300">Shortlisted Finalist - 2017</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
                className="p-6 text-center bg-[#0f172a] rounded-2xl transition-all"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
                <p className="text-sm text-slate-300">{value.description}</p>
              </motion.div>
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
                  className="p-8 bg-[#0f172a] rounded-2xl"
                >
                  {/* Photo */}
                  <div className="mb-5 flex justify-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 transition-all">
                      <img 
                        src={index === 0 ? "ps_img-removebg-preview.png" : "ss_img-removebg-preview.png"}
                        alt={member.name}
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    </div>
                  </div>
                  
                  {/* Name & Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-1 text-white">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.designation}</p>
                  </div>
                  
                  {/* Education */}
                  {member.education && (
                    <div className="pb-3 mb-3 border-b border-gray-700">
                      <p className="text-xs text-slate-400 font-medium text-center">
                        Education: {member.education}
                      </p>
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed text-justify whitespace-pre-line" style={{ lineHeight: '1.85' }}>
                    {member.vision}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Our Journey</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white md:-translate-x-1/2 z-10" />
                    <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="p-6 bg-[#0f172a] rounded-2xl">
                        <span className="text-primary font-bold text-lg">{milestone.year}</span>
                        <h3 className="font-semibold mt-1 text-white">{milestone.title}</h3>
                        <p className="text-sm text-slate-300 mt-1">{milestone.description}</p>
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
