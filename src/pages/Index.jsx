import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home | MIPL - Securing India's Critical Infrastructure</title>
        <meta name="description" content="MIPL is India's trusted partner for Safe Cities, Smart Governance, ICCC Command & Control, and Enterprise Infrastructure Security solutions with 25+ years of expertise." />
        <meta name="keywords" content="MIPL, home, safe cities, smart governance, command control, enterprise security, security solutions India" />
      </Helmet>

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0f172a]">
        {/* Background image placeholder - Replace with actual aerial city surveillance photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80")' 
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative h-full w-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl px-6 lg:px-12 text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
              25 Years. Smarter Cities. Safer Lives.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10">
              India's foremost technology consulting firm for security & smart city infrastructure.
            </p>
            <Link to="#work">
              <Button className="bg-[#E9863C] hover:bg-[#d67734] text-white font-bold text-lg px-10 py-6 rounded-lg shadow-xl">
                Explore Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. NUMBERS BAR */}
      <section className="py-6 bg-[#0f172a] w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 lg:px-12">
          {[
            { num: "25+", label: "Years" },
            { num: "10+", label: "Cities" },
            { num: "USD 10M", label: "Avg Project" },
            { num: "8+", label: "National Awards" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-white">{stat.num}</div>
              <div className="text-lg text-white/80 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section id="work" className="w-full py-0">
        <div className="grid md:grid-cols-3 gap-0">
          {/* Card 1 - Safe & Smart Cities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-[700px] group cursor-pointer overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-white">Safe & Smart Cities</h3>
            </div>
          </motion.div>

          {/* Card 2 - Oil & Gas Security */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative h-[500px] md:h-[700px] group cursor-pointer overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1612815442539-558b50648d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-white">Oil & Gas Security</h3>
            </div>
          </motion.div>

          {/* Card 3 - Large Premises & Campuses */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative h-[500px] md:h-[700px] group cursor-pointer overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-white">Large Premises & Campuses</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="py-24 bg-white w-full px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-16" style={{ color: '#0f172a' }}>Featured Projects</h2>
          
          {/* Asymmetric grid */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Large left image (60%) */}
            <div className="md:col-span-7">
              <div className="relative h-[600px] group overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")' 
                  }}
                />
              </div>
              <p className="text-lg mt-4 font-semibold" style={{ color: '#0f172a' }}>Aurangabad Smart City</p>
              <p className="text-sm text-slate-600">Integrated command & control for 2.5M residents</p>
            </div>

            {/* 3 stacked right images (40%) */}
            <div className="md:col-span-5 space-y-6">
              {[
                { title: "Nanded Safe City", desc: "360° surveillance deployment" },
                { title: "MRPL Mangaluru", desc: "Refinery-wide security solution" },
                { title: "Surat Diamond Bourse", desc: "World's largest diamond exchange security" }
              ].map((proj, idx) => (
                <div key={idx}>
                  <div className="relative h-[180px] group overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ 
                        backgroundImage: idx === 0 
                          ? 'url("https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
                          : idx === 1
                          ? 'url("https://images.unsplash.com/photo-1612815442539-558b50648d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
                          : 'url("https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
                      }}
                    />
                  </div>
                  <p className="text-lg mt-3 font-semibold" style={{ color: '#0f172a' }}>{proj.title}</p>
                  <p className="text-sm text-slate-600">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Second row: 4 equal images */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "MP High Court", desc: "Jabalpur security upgrade" },
              { title: "Vidhan Bhavan MH", desc: "Legislative assembly security" },
              { title: "Panvel City Surveillance", desc: "Panvel city wide cameras" },
              { title: "Nagpur ITMS", desc: "Intelligent traffic system" }
            ].map((proj, idx) => (
              <div key={idx}>
                <div className="relative h-[220px] group overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ 
                      backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' 
                    }}
                  />
                </div>
                <p className="text-lg mt-3 font-semibold" style={{ color: '#0f172a' }}>{proj.title}</p>
                <p className="text-sm text-slate-600">{proj.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. OUR JOURNEY */}
      <section className="py-24 bg-[#0f172a] w-full overflow-x-auto">
        <div className="px-6 lg:px-12 min-w-max">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-16">Our Journey</h2>
          
          <div className="flex gap-12 items-start">
            {[
              { year: "2000", label: "Company Founded" },
              { year: "2010", label: "First Safe City" },
              { year: "2012", label: "Oil & Gas" },
              { year: "2017", label: "eCourts Projects" },
              { year: "2019", label: "Smart City Scale" },
              { year: "2026", label: "25 Years Strong" }
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0"
              >
                <div className="text-6xl font-black text-[#E9863C] mb-3">{milestone.year}</div>
                <div className="text-2xl font-bold text-white">{milestone.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERTISE */}
      <section className="py-24 bg-[#0f172a] w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-12">Deep Expertise Across Domains</h2>
          
          <div className="flex flex-wrap gap-3">
            {[
              "Video Surveillance", "Access Control", "Command & Control", "Data Centres", "AI/ML Analytics", "ITMS", "IoT", "Cyber Security", "eGovernance", "GIS", "Biometrics", "Safe Cities", "Smart Cities", "Traffic Management", "Emergency Management"
            ].map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white text-lg font-semibold rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RECOGNITION */}
      <section className="py-24 bg-white w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-16" style={{ color: '#0f172a' }}>Recognized Nationally & Globally</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "GSN Award USA", "SECONA Shield (×4)", "ASME Global Innovation", "Skoch Order of Merit", "SEA Shortlist 2023", "Gold Medal GoM"
            ].map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 border border-gray-200 rounded-xl text-center"
              >
                <p className="text-lg font-semibold" style={{ color: '#0f172a' }}>{award}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CSR */}
      <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-[#0f172a]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80")' 
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full w-full flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-3xl text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">Building Inclusive Futures</h2>
            <p className="text-xl text-white/90">Founders of Aatman Academy — inclusive education since 2010.</p>
          </div>
        </div>
      </section>

      {/* 10. CONTACT / FOOTER */}
      <footer className="py-24 bg-[#0f172a] w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10">Let's build smarter together.</h2>
          
          <div className="space-y-4 mb-12">
            <a href="mailto:info@consultmipl.com" className="text-2xl text-white/90 hover:text-white">info@consultmipl.com</a>
            <br />
            <a href="https://www.consultmipl.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-white/90 hover:text-white">www.consultmipl.com</a>
          </div>
          
          <div className="text-lg text-white/70 mb-12">
            Thane · Sambhajinagar · Mangaluru · Jabalpur · Dubai
          </div>
          
          <p className="text-white/60">© {new Date().getFullYear()} Maha Infotech Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
