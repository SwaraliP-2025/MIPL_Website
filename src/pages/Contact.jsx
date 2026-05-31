import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";

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
      const response = await fetch('https://script.google.com/macros/s/AKfycbyAAAWZbJCvjdC3rvaT9ydrHcgezmb_JuUFIWzWs-03fk4GPAIqNeA6GvmzkxqBEQ4WbQ/exec', {
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
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Talk to MIPL about security, smart city, or site safety advisory services."
        image="/bgimage2.png"
      />

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-[#0d1b3e] py-8">
        <div className="container mx-auto flex flex-wrap justify-center gap-8 px-4 text-center text-sm font-semibold text-white/90 lg:px-8">
          <span>25+ years advisory</span>
          <span className="text-[#f0a500]">·</span>
          <span>50+ cities across India</span>
          <span className="text-[#f0a500]">·</span>
          <span>Response within 24 hours</span>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Left — steps & offices */}
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="text-2xl font-black text-[#0d1b3e]">How we work with you</h2>
                <ol className="mt-6 space-y-6">
                  {[
                    { step: "1", title: "Tell us your need", detail: "City programme, audit, campus, or plant — share context in the form." },
                    { step: "2", title: "We listen & advise", detail: "A senior consultant reviews your situation and suggests a practical path." },
                    { step: "3", title: "Plan together", detail: "Scope, timeline, and next steps — no jargon, no overselling." },
                  ].map((item, i) => (
                    <ScrollFloat key={item.step} strength={24 + i * 4}>
                      <li className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1565c0] text-sm font-bold text-white">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                        </div>
                      </li>
                    </ScrollFloat>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Contact Information</h2>
                <p className="mb-6 text-slate-600">
                  Reach us by email, phone, or visit our Thane headquarters.
                </p>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <ScrollFloat key={item.label} strength={24 + index * 4}>
                      <motion.a
                        href={item.href}
                        whileHover={{ x: 8 }}
                        className="flex items-center gap-4 rounded-xl border border-gray-200 bg-slate-50 p-4 transition-all hover:border-[#E9863C]/50 group"
                      >
                        <div className="rounded-lg bg-[#E9863C]/20 p-3 text-[#E9863C] group-hover:bg-[#E9863C] group-hover:text-white transition-colors">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="font-medium text-slate-900">{item.value}</p>
                        </div>
                      </motion.a>
                    </ScrollFloat>
                  ))}
                </div>
              </div>

              <ScrollFloat strength={40}>
                <div>
                  <h3 className="font-semibold mb-2 text-slate-900">Headquarters — Thane</h3>
                  <p className="text-sm text-slate-600 mb-4">708/B, Lodha Supremus, Kolshet Road, Thane — 400607</p>
                  <a 
                    href="https://www.google.com/maps/place/Lodha+Supremus,+Thane/@19.236275,72.986007,17z" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block aspect-video overflow-hidden rounded-xl border border-gray-200 bg-slate-50 hover:border-[#E9863C]/50 transition-all"
                    title="Open in Google Maps"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1434.7196072455104!2d72.98600659169911!3d19.236275053074987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bbb093af5bb5%3A0x3eb081913331e6bf!2sLodha%20Supremus!5e1!3m2!1sen!2sin!4v1769423226727!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, pointerEvents: "none" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MIPL Headquarter - Thane"
                    />
                  </a>
                </div>
              </ScrollFloat>
            </div>

            {/* Right — Contact Form */}
            <ScrollFloat strength={36} className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-8 lg:p-10 rounded-2xl bg-slate-50 border border-gray-200 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Send us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-600 mb-4">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900">Message Sent!</h3>
                    <p className="text-slate-600 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-[#E9863C] text-[#E9863C] hover:bg-[#E9863C]/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-900">First Name</label>
                        <Input
                          name="firstName"
                          required
                          placeholder="FirstName"
                          className="bg-white border border-gray-200 text-slate-900 placeholder:text-slate-500 focus:border-[#E9863C] focus:outline-none focus:ring-0 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-900">Last Name</label>
                        <Input
                          name="lastName"
                          required
                          placeholder="LastName"
                          className="bg-white border border-gray-200 text-slate-900 placeholder:text-slate-500 focus:border-[#E9863C] focus:outline-none focus:ring-0 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Email</label>
                      <Input
                        name="email"
                        required
                        type="email"
                        placeholder="user@company.com"
                        className="bg-white border border-gray-200 text-slate-900 placeholder:text-slate-500 focus:border-[#E9863C] focus:outline-none focus:ring-0 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Organization</label>
                      <Input
                        name="organization"
                        placeholder="Your Company"
                        className="bg-white border border-gray-200 text-slate-900 placeholder:text-slate-500 focus:border-[#E9863C] focus:outline-none focus:ring-0 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Service Interest</label>
                      <select name="serviceInterest" className="w-full h-10 rounded-lg bg-white border border-gray-200 text-slate-900 focus:border-[#E9863C] focus:outline-none focus:ring-0">
                        <option value="" className="text-slate-900">Select a service</option>
                        <option value="consultancy" className="text-slate-900">Security Consultancy</option>
                        <option value="security-audit" className="text-slate-900">Security Audits</option>
                        <option value="safe-city" className="text-slate-900">Safe City</option>
                        <option value="smart-city" className="text-slate-900">Smart City</option>
                        <option value="egovernance" className="text-slate-900">eGovernance</option>
                        <option value="surveillance" className="text-slate-900">Video Surveillance</option>
                        <option value="training" className="text-slate-900">Security Training</option>
                        <option value="other" className="text-slate-900">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Message</label>
                      <Textarea
                        name="message"
                        required
                        placeholder="Tell us about your project or security needs..."
                        className="bg-white border border-gray-200 text-slate-900 placeholder:text-slate-500 focus:border-[#E9863C] focus:outline-none focus:ring-0 min-h-[150px] rounded-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#E9863C] to-[#f5a85c] hover:from-[#d97a2f] hover:to-[#e89a4f] text-white font-semibold py-6 rounded-lg"
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
            </ScrollFloat>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Contact;
