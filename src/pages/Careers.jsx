import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
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
    title: "Accounts & Admin Executive",
    department: "Finance & Administration",
    location: "Thane, Maharashtra",
    type: "Full-time",
    experience: "4 to 6 years",
    description: "Daily Accounting tasks, account finalisation, TDS, GST Payroll, PF, income tax, coordination with CA & CS, other financial and accounting tasks.",
    requirements: [
      "Graduate in Commerce",
      "Experience in accounts and administration",
      "Proficiency in ERP System and Accounts",
      "Strong organizational and communication skills",
    ],
  },
  {
    id: 2,
    title: "Data Analyst",
    department: "Technology",
    location: "Chhatrapati Sambhajinagar (Aurangabad), Maharashtra",
    type: "Full-time",
    experience: "4 to 6 years",
    description: "MIPL is looking for a data analyst to work across GIS and eGovernance domains.\nThe job involves cross department coordination, with the goal being increase in city taxes. The opening is based in Chhatrapati Sambhajinagar (Aurangabad),Maharashtra.",
    requirements: [
      "UG: B.B.A / B.M.S. in Any Specialization, B.Sc in Any Specialization, Any Graduate",
      "Experience with data analysis tools and techniques",
      "Knowledge of MS Office, SQL, Python, or similar tools, Smart Cities, eGovernance, ",
      "Strong analytical and problem-solving skills",
    ],
  },
  {
    id: 3,
    title: "Resident Construction Manager",
    department: "Project Management",
    location: "Mangaluru, Karnataka",
    type: "Full-time",
    experience: "6 to 8 years",
    description: "Handling civil, electrical & instrumentation project management onsite, for a refinery project and a school project, working out of Mangalore.",
    requirements: [
      "Engineering degree (Civil or related), Construction Management, Site Execution",
      "Construction management experience",
      "Knowledge of security systems installation",
      "Strong project coordination and vendor management skills",
    ],
  },
];

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workStatus, setWorkStatus] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const { toast } = useToast();

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    
    // Get resume file
    const resumeInput = form.querySelector('input[type="file"]');
    const resumeFile = resumeInput?.files[0];
    
    let resumeBase64 = '';
    let resumeFileName = '';
    
    if (resumeFile) {
      // Convert file to base64
      const reader = new FileReader();
      resumeBase64 = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(resumeFile);
      });
      resumeFileName = resumeFile.name;
    }

    const formData = {
      jobTitle: selectedJob.title,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      dateOfBirth: form.dateOfBirth.value,
      currentLocation: form.currentLocation.value,
      education: form.education.value,
      workStatus: form.workStatus.value,
      workStatusOther: workStatus === 'other' ? form.workStatusOther?.value || '' : '',
      yearsExperience: form.yearsExperience.value,
      currentSalary: form.currentSalary.value,
      coverLetter: form.coverLetter.value || '',
      resumeFile: resumeBase64,
      resumeFileName: resumeFileName
    };

    console.log('Submitting careers form:', { ...formData, resumeFile: resumeBase64 ? 'FILE_PRESENT' : 'NO_FILE' });

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyAAAWZbJCvjdC3rvaT9ydrHcgezmb_JuUFIWzWs-03fk4GPAIqNeA6GvmzkxqBEQ4WbQ/exec', {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Backend response:', result);
      
      if (result.status === 'success') {
        setIsSubmitting(false);
        setShowApplicationForm(false);
        setSelectedFileName("");
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. We'll get back to you soon.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

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
            <span className="text-primary font-medium mb-4 block">Join Our Team</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Career Opportunities
            </h1>
            <p className="text-xl text-muted-foreground">
              Join Maha Infotech Pvt. Ltd. and be part of a team shaping the future of 
              security and smart city solutions in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
      <section className="py-16 bg-card/50 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
                        <p className="text-muted-foreground mb-4 whitespace-pre-line">{job.description}</p>
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
            onClick={() => {
              setShowApplicationForm(false);
              setSelectedFileName("");
            }}
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
                    <label className="block text-sm font-medium mb-2">First Name <span className="text-red-500">*</span></label>
                    <Input name="firstName" required placeholder="FirstName" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
                    <Input name="lastName" required placeholder="LastName" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                  <Input name="email" required type="email" placeholder="user@gmail.com" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone <span className="text-red-500">*</span></label>
                  <Input name="phone" required type="tel" placeholder="+91 XXX XXX XXXX" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth <span className="text-red-500">*</span></label>
                  <Input name="dateOfBirth" required type="date" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Location <span className="text-red-500">*</span></label>
                  <Input name="currentLocation" required placeholder="City, State" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Education (Highest Degree) <span className="text-red-500">*</span></label>
                  <Input name="education" required placeholder="e.g. Bachelor's in Computer Science" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Currently Working? <span className="text-red-500">*</span></label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="workStatus" 
                        value="working" 
                        required 
                        className="appearance-auto" 
                        style={{width: '24px', height: '24px'}}
                        onChange={(e) => setWorkStatus(e.target.value)}
                      />
                      <span className="text-sm">Working</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="workStatus" 
                        value="not-working" 
                        required 
                        className="appearance-auto" 
                        style={{width: '24px', height: '24px'}}
                        onChange={(e) => setWorkStatus(e.target.value)}
                      />
                      <span className="text-sm">Not Working</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="workStatus" 
                        value="notice-period" 
                        required 
                        className="appearance-auto" 
                        style={{width: '24px', height: '24px'}}
                        onChange={(e) => setWorkStatus(e.target.value)}
                      />
                      <span className="text-sm">Serving Notice Period</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="workStatus" 
                        value="fresher" 
                        required 
                        className="appearance-auto" 
                        style={{width: '24px', height: '24px'}}
                        onChange={(e) => setWorkStatus(e.target.value)}
                      />
                      <span className="text-sm">Fresher</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="workStatus" 
                        value="other" 
                        required 
                        className="appearance-auto" 
                        style={{width: '24px', height: '24px'}}
                        onChange={(e) => setWorkStatus(e.target.value)}
                      />
                      <span className="text-sm">Other</span>
                    </label>
                    {workStatus === "other" && (
                      <div className="mt-2 ml-8">
                        <Input 
                          name="workStatusOther"
                          required 
                          placeholder="Please specify..." 
                          className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" 
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Total Years of Experience <span className="text-red-500">*</span></label>
                  <Input name="yearsExperience" required type="number" min="0" step="0.5" placeholder="e.g. 5.5" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Annual Salary (₹) <span className="text-red-500">*</span></label>
                  <Input name="currentSalary" required type="number" min="0" placeholder="Enter 0 for freshers" className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Letter</label>
                  <Textarea
                    name="coverLetter"
                    placeholder="Tell us why you're interested in this role..."
                    className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/10 min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resume <span className="text-red-500">*</span></label>
                  <label className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer block">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your resume or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PDF only, max 5MB</p>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      required 
                      className="hidden" 
                      id="resume-upload"
                      onChange={(e) => setSelectedFileName(e.target.files[0]?.name || "")}
                    />
                  </label>
                  {selectedFileName && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selected: {selectedFileName}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedFileName("");
                    }}
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
