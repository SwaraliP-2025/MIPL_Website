import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  ChevronDown, 
  Upload,
  CheckCircle2,
  Users,
  Lightbulb,
  Heart,
  Rocket
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with industry experts in a supportive environment",
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Work on cutting-edge security and smart city projects",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible hours and comprehensive health benefits",
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description: "Clear progression paths and continuous learning",
  },
];

const jobs = [
  {
    id: 1,
    title: "Senior Security Consultant",
    department: "Security Services",
    location: "New Delhi",
    type: "Full-time",
    experience: "5-8 years",
    description: "Lead security assessments and provide strategic guidance to enterprise clients.",
    requirements: [
      "CISSP, CISM, or equivalent certification",
      "Experience with penetration testing and vulnerability assessment",
      "Strong client-facing and presentation skills",
      "Knowledge of compliance frameworks (ISO 27001, GDPR, etc.)",
    ],
  },
  {
    id: 2,
    title: "Smart City Solutions Architect",
    department: "Technology",
    location: "Mumbai",
    type: "Full-time",
    experience: "6-10 years",
    description: "Design and architect smart city solutions including command centers and surveillance systems.",
    requirements: [
      "Experience with IoT platforms and integration",
      "Knowledge of video management systems",
      "Understanding of network architecture",
      "Project management experience",
    ],
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    department: "Technology",
    location: "Bangalore",
    type: "Full-time",
    experience: "3-5 years",
    description: "Develop machine learning models for video analytics and security applications.",
    requirements: [
      "Strong Python programming skills",
      "Experience with TensorFlow or PyTorch",
      "Computer vision expertise",
      "Understanding of edge computing",
    ],
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Delivery",
    location: "New Delhi",
    type: "Full-time",
    experience: "4-6 years",
    description: "Manage large-scale government and enterprise project implementations.",
    requirements: [
      "PMP or Prince2 certification",
      "Experience with government projects",
      "Strong stakeholder management skills",
      "Budget and resource management experience",
    ],
  },
];

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleApply = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowApplicationForm(false);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative network-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Join Our Team</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build the Future of Security
            </h1>
            <p className="text-xl text-muted-foreground">
              Join a team of innovators and experts shaping the future of 
              cybersecurity and smart city solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Join MIPL?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job – we offer a career with purpose
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our current openings and find your next opportunity
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedJob === job.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 border-t border-white/10 pt-6">
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Experience: {job.experience}
                        </p>

                        <h4 className="font-semibold mt-6 mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => handleApply(job)}
                          className="mt-6 bg-primary hover:bg-blue-600"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowApplicationForm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full max-h-[90vh] overflow-y-auto p-8"
            >
              <h2 className="text-2xl font-bold mb-2">Apply for Position</h2>
              <p className="text-muted-foreground mb-6">{selectedJob.title}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input required placeholder="John" className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input required placeholder="Doe" className="bg-white/5 border-white/10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input required type="email" placeholder="john@example.com" className="bg-white/5 border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input required placeholder="+91 XXX XXX XXXX" className="bg-white/5 border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Letter</label>
                  <Textarea
                    placeholder="Tell us why you're interested in this role..."
                    className="bg-white/5 border-white/10 min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resume</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your resume or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PDF only, max 5MB</p>
                    <input type="file" accept=".pdf" className="hidden" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 border-white/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-blue-600"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Careers;
