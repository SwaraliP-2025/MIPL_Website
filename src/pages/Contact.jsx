import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Linkedin,
  Twitter,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@consultmipl.com",
    href: "mailto:info@consultmipl.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "98213 01414",
    href: "tel:+919821301414",
  },
  {
    icon: MapPin,
    label: "Locations",
    value: "Thane, Chhatrapati Sambhajinagar, Navi Mumbai, Dubai",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon-Fri: 10am – 6pm",
    href: "#",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      organization: form.organization.value,
      serviceInterest: form.serviceInterest.value,
      message: form.message.value
    };

    console.log('Sending data:', formData); // Debug log

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz-uPbkix6pZUL9bEqz_JAuWE4Gy84R60UA1MX7ng7Df4mqLl9mnFHcAx-d63QYrhbgmQ/exec', {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Response:', result); // Debug log
      
      if (result.status === 'success') {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
            <span className="text-primary font-medium mb-4 block">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to secure your organization? Our team of experts at Maha Infotech Pvt. Ltd. 
              is here to help you navigate your security challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 lg:p-10">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-400 mb-4">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/20"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <Input
                          name="firstName"
                          required
                          placeholder="FirstName"
                          className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 focus:border-primary focus:outline-none focus:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input
                          name="lastName"
                          required
                          placeholder="LastName"
                          className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 focus:border-primary focus:outline-none focus:ring-0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        name="email"
                        required
                        type="email"
                        placeholder="user@company.com"
                        className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 focus:border-primary focus:outline-none focus:ring-0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Organization</label>
                      <Input
                        name="organization"
                        placeholder="Your Company"
                        className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 focus:border-primary focus:outline-none focus:ring-0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Service Interest</label>
                      <select name="serviceInterest" className="w-full h-10 rounded-lg bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 px-3 text-sm focus:border-primary focus:outline-none focus:ring-0">
                        <option value="">Select a service</option>
                        <option value="security-audit">Security Audits</option>
                        <option value="smart-city">Smart City Solutions</option>
                        <option value="egovernance">eGovernance</option>
                        <option value="ai-iot">AI & IoT Integration</option>
                        <option value="surveillance">Video Surveillance</option>
                        <option value="training">Security Training</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        name="message"
                        required
                        placeholder="Tell us about your project or security needs..."
                        className="bg-white/5 dark:bg-white/5 border-2 border-black/20 dark:border-white/20 focus:border-primary focus:outline-none focus:ring-0 min-h-[150px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-blue-600 text-primary-foreground font-semibold py-6"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  Have questions? Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 p-4 rounded-xl glass-card group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office Locations */}
              {/* Map */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Our Headquarter at Thane</h3>
                <h6 className="text-sm text-muted-foreground mb-4">708/B, Lodha Supremus, Kolshet Road, Thane -4000607.</h6>
                <div className="aspect-video rounded-xl overflow-hidden glass-card">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1434.7196072455104!2d72.98600659169911!3d19.236275053074987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bbb093af5bb5%3A0x3eb081913331e6bf!2sLodha%20Supremus!5e1!3m2!1sen!2sin!4v1769423226727!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MIPL Headquarter - 708/B, Lodha Supremus, Kolshet Road, Thane"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
