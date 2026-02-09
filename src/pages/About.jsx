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
  TrendingUp
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our engagements.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for exceptional quality in every project we undertake.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open communication and honest reporting guide our client relationships.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We continuously evolve to stay ahead of emerging threats and technologies.",
  },
];

const milestones = [
  { year: "2000", title: "Company Founded", description: "MIPL established as security & IT consultancy" },
  { year: "2010", title: "Government Projects", description: "Started major government and PSU projects" },
  { year: "2015", title: "Udaan iMEGA", description: "Delivered Udaan iMEGA eGovernance project" },
  { year: "2017", title: "Kolhapur Safe City", description: "Implemented Kolhapur Safe City project" },
  { year: "2018", title: "Refinery C&C", description: "First Command & Control system in Indian refinery" },
  { year: "2020", title: "Court Security", description: "Supreme Court-mandated security rollout for courts" },
];

const stats = [
  { icon: Users, value: "25+", label: "Years of Experience" },
  { icon: Globe, value: "4", label: "Office Locations" },
  { icon: Award, value: "Award", label: "Winning Consultancy" },
];

const About = () => {
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
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
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
                To empower organizations with cutting-edge security solutions and 
                innovative technology that protect assets, enable growth, and build 
                a safer digital future for all stakeholders.
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
                To be the global leader in integrated security and smart city 
                solutions, recognized for our innovation, integrity, and 
                commitment to creating secure, intelligent environments.
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
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:glow-border transition-all"
              >
                <div className="inline-flex p-4 rounded-xl bg-white/5 text-primary group-hover:bg-primary/20 transition-colors mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 hover:glow-border group"
            >
              {/* Photo */}
              <div className="mb-5 flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all">
                  <img 
                    src="prasadsir.png"
                    alt="Prasad Patil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Name & Title */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">Prasad Patil</h3>
                <p className="text-primary text-sm font-medium">Director, MIPL</p>
              </div>
              
              {/* Education */}
              <div className="pb-3 mb-3 border-b border-white/10">
                <p className="text-xs text-muted-foreground font-medium text-center">
                  Education: Mechanical Engineering (COEP), MBA (IIM Bangalore)
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed text-justify" style={{ lineHeight: '1.85' }}>
                Prasad is one of the leading security consultants and safe city experts in India. He has advised several municipal corporations, government departments, PSUs & large private sector organisations on the effective use of technology in the field of security management.<br />
He has nearly more than two decades of experience as a consultant in information technology and security management. <br />
As a security consultant, Prasad actively advocates “appropriateness” of technology usage and believes in the value of detailed risk assessment. He has been involved in several large security implementations in cities & industrial premises. He has been invited to several national and international conferences to speak on issues concerning the security industry in India and solutions for the same.<br />
Prasad completed his mechanical engineering from the College of Engineering, Pune in 1992 and then received an MBA from the prestigious IIM Bangalore in 1994.<br />
Prasad is the founder Chairman of SECONA, the Security Consultants’ Association, a non-profit association of security consultants formed to work in the field of training, certification, standardisation & guidelines for security technologies. Prasad is also the founder Trustee of Aatman Educational Society, a non-profit trust that manages Aatman Academy, an inclusive school for children with learning differences & disabilities.
              </p>
              
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 hover:glow-border group"
            >
              {/* Photo */}
              <div className="mb-5 flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all">
                  <img 
                    src="sudhir_sir-removebg-preview.png"
                    alt="Sudhir Deshpande"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Name & Title */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">Sudhir Deshpande</h3>
                <p className="text-primary text-sm font-medium">Director, MIPL</p>
              </div>
              
              {/* Education */}
              <div className="pb-3 mb-3 border-b border-white/10">
                <p className="text-xs text-muted-foreground font-medium text-center">
                  Education: Electronics Engineering (JNEC Aurangabad)
                </p>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed text-justify" style={{ lineHeight: '1.85' }}>
                Sudhir is a leading consultant in India in the field of security management, including large CCTV systems, access control technologies and emergency and disaster management preparedness.<br />
                For the past 20 years, Mr. Deshpande has been actively advising large corporations on networking, communication and security management projects.<br />
                As a security consultant, Sudhir has been involved in several large security implementations including the award winning Nanded Safe City Project, Kolhapur, Aurangabad, Nashik, Godhra, Dahod and Bharuch. He has been involved in the conceptualization and rollout of one of the largest biometric access control project in the world for HPCL, on a pan India basis.<br />
                As a consultant, Sudhir has the ability to encapsulate the needs of the customers in specific functional requirements, that enable customers to choose technologies in a more effective manner. He is specialized in CCTV technologies, networking and control room operations and has delivered this ability to many private sector organisations too.<br />
                Sudhir completed his electronics engineering from JNEC Aurangabad in 1990.<br />
                Sudhir is the founder Trustee of Aatman Educational Society, a non-profit trust that manages Aatman Academy, an inclusive school for children with learning differences & disabilities. He is also the member Secretary of SECONA.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements & Impact 
      <section className="py-24 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Achievements & Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our contributions to security, technology, and society
            </p>
          </motion.div> 

          <div className="grid md:grid-cols-3 gap-8">*/}

            {/* Achievements 
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 hover:glow-border group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Security Excellence Awards, London (2014, 2015, 2017 Finalist)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>First Command & Control system in Indian refinery sector</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Largest biometric access control project in India (HPCL)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Multiple award-winning Safe City implementations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Supreme Court-mandated security rollout for courts</span>
                </li>
              </ul>
            </motion.div> */}

            {/* Publications 
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 hover:glow-border group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Publications</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Regular contributor to security management journals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Technical papers on CCTV and surveillance systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Case studies on Smart City implementations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>White papers on emergency management preparedness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Industry insights on access control technologies</span>
                </li>
              </ul>
            </motion.div> */}

            {/* Social Activities 
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 hover:glow-border group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Social Activities</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Founder Trustee of Aatman Educational Society</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Managing Aatman Academy - inclusive school for children with learning differences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Member Secretary of SECONA (Security Consultants Association)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Active participation in community development initiatives</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Our Team Section */}
      <section className="py-24 relative overflow-hidden border-t border-border">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals driving innovation and excellence at MIPL
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 text-center hover:glow-border group"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <img 
      src="\team\persn1.png"  
      alt="John Doe"
      className="w-full h-full object-cover"
    />
              </div>
              <h3 className="font-bold text-lg mb-1">Fname Lname</h3>
              <p className="text-sm text-primary mb-2">Position</p>
              {/* <p className="text-xs text-muted-foreground">Brief description of role and expertise</p> */}
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 text-center hover:glow-border group"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-primary/60" />
              </div>
              <h3 className="font-bold text-lg mb-1">Team Member</h3>
              <p className="text-sm text-primary mb-2">Position Title</p>
              <p className="text-xs text-muted-foreground">Brief description of role and expertise</p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 text-center hover:glow-border group"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-primary/60" />
              </div>
              <h3 className="font-bold text-lg mb-1">Team Member</h3>
              <p className="text-sm text-primary mb-2">Position Title</p>
              <p className="text-xs text-muted-foreground">Brief description of role and expertise</p>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 text-center hover:glow-border group"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-primary/60" />
              </div>
              <h3 className="font-bold text-lg mb-1">Team Member</h3>
              <p className="text-sm text-primary mb-2">Position Title</p>
              <p className="text-xs text-muted-foreground">Brief description of role and expertise</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            {/* <p className="text-sm text-muted-foreground mb-4">
              To add team member photos, place images in the <code className="px-2 py-1 bg-primary/10 rounded text-xs">public</code> folder 
              and update the team data in <code className="px-2 py-1 bg-primary/10 rounded text-xs">src/pages/About.jsx</code>
            </p> */}
          </motion.div>
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
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-px" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
