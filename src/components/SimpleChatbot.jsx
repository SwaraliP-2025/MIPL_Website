import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotKnowledge } from "@/lib/chatbotKnowledge";

// Intelligent answer function using comprehensive knowledge base
function getAnswer(question) {
  const q = question.toLowerCase();
  const kb = chatbotKnowledge;

  // Greetings
  if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
    return "Hello! I'm MIPL's virtual assistant. I can help you learn about our security solutions, services, projects, leadership, contact details, and career opportunities. What would you like to know?";
  }

  // Company & About - Enhanced variations
  if (q.includes("what is mipl") || q.includes("about mipl") || q.includes("who are you") || 
      q.includes("tell me about") || q.includes("what do you do") || q.includes("your company") ||
      q.includes("company info") || q.includes("mipl info")) {
    return `${kb.company.description}\n\nFounded: ${kb.company.founded}\nExperience: ${kb.company.experience}\n\n${kb.company.tagline}`;
  }
  if (q.includes("mission")) return kb.company.mission;
  if (q.includes("vision")) return kb.company.vision;
  if (q.includes("value") || q.includes("principle")) {
    return `Our core values:\n${kb.company.coreValues.join('\n')}`;
  }
  if (q.includes("founded") || q.includes("established") || q.includes("started") || q.includes("when")) {
    return `MIPL was founded in ${kb.company.founded} and has ${kb.company.experience} of experience in security & IT consulting.`;
  }
  if (q.includes("tagline") || q.includes("slogan")) return kb.company.tagline;

  // Services - General - Enhanced variations
  if ((q.includes("service") || q.includes("what do you offer") || q.includes("what can you do") ||
       q.includes("solution") || q.includes("offering")) && !q.includes("social")) {
    return `${kb.services.overview}\n\nOur main services:\n1. CCTV & Video Surveillance\n2. Biometrics\n3. Intrusion Detection\n4. Command & Control\n5. Access Control\n\nWe also provide Security Consultancy, security audits, eGovernance, Smart City, Safe City solutions, and Training.`;
  }

  // Services - Specific
  if (q.includes("cctv") || q.includes("camera") || q.includes("surveillance") || q.includes("video")) {
    return `${kb.services.cctv.description}\n\nCapabilities:\n${kb.services.cctv.capabilities.join('\n')}`;
  }
  if (q.includes("biometric") || q.includes("fingerprint") || q.includes("face recognition") || q.includes("iris")) {
    return `${kb.services.biometrics.description}\n\nCapabilities:\n${kb.services.biometrics.capabilities.join('\n')}`;
  }
  if (q.includes("intrusion") || q.includes("perimeter") || q.includes("pids")) {
    return `${kb.services.intrusionDetection.description}\n\nCapabilities:\n${kb.services.intrusionDetection.capabilities.join('\n')}`;
  }
  if (q.includes("command") || q.includes("control center") || q.includes("c&c")) {
    return `${kb.services.commandControl.description}\n\nCapabilities:\n${kb.services.commandControl.capabilities.join('\n')}`;
  }
  if (q.includes("access control") || q.includes("entry") || q.includes("visitor management")) {
    return `${kb.services.accessControl.description}\n\nCapabilities:\n${kb.services.accessControl.capabilities.join('\n')}`;
  }

  // Specialized Services
  if (q.includes("smart city") || q.includes("smart cities")) return kb.services.specialized.smartCity;
  if (q.includes("safe city") || q.includes("safe cities")) return kb.services.specialized.safeCity;
  if (q.includes("audit") || q.includes("risk") || q.includes("vulnerability")) {
    return kb.services.specialized.securityAudits;
  }
  if (q.includes("egovernance") || q.includes("e-governance") || q.includes("government")) {
    return kb.services.specialized.egovernance;
  }
  if (q.includes("training") || q.includes("course")) return kb.services.specialized.training;
  if (q.includes("consultancy") || q.includes("consulting")) return kb.services.specialized.securityConsultancy;

  // Leadership - Enhanced variations
  if (q.includes("prasad") || q.includes("patil") || q.includes("mr prasad") || q.includes("mr. prasad")) {
    return `${kb.leadership.prasadPatil.name}\n${kb.leadership.prasadPatil.role}\nEducation: ${kb.leadership.prasadPatil.education}\n\n${kb.leadership.prasadPatil.bio}`;
  }
  if (q.includes("sudhir") || q.includes("deshpande") || q.includes("mr sudhir") || q.includes("mr. sudhir")) {
    return `${kb.leadership.sudhirDeshpande.name}\n${kb.leadership.sudhirDeshpande.role}\nEducation: ${kb.leadership.sudhirDeshpande.education}\n\n${kb.leadership.sudhirDeshpande.bio}`;
  }
  if (q.includes("director") || q.includes("founder") || q.includes("leadership") || q.includes("team") || 
      q.includes("who runs") || q.includes("owner") || q.includes("ceo") || q.includes("management") ||
      q.includes("who is behind") || q.includes("who started")) {
    return `MIPL is led by two directors:\n\n1. ${kb.leadership.prasadPatil.name} - ${kb.leadership.prasadPatil.education}\n${kb.leadership.prasadPatil.role}\n\n2. ${kb.leadership.sudhirDeshpande.name} - ${kb.leadership.sudhirDeshpande.education}\n${kb.leadership.sudhirDeshpande.role}`;
  }

  // Projects & Clients - Enhanced variations
  if (q.includes("client") || q.includes("customer") || q.includes("who do you work") || 
      q.includes("work with") || q.includes("partner")) {
    return `${kb.clients.overview}.\n\nMajor clients include:\n${kb.clients.majorClients.slice(0, 10).join(', ')}, and many more.`;
  }
  if ((q.includes("project") || q.includes("work done") || q.includes("implementation") || 
       q.includes("what have you done")) && !q.includes("career")) {
    return `Major projects:\n${kb.clients.majorProjects.slice(0, 8).join('\n')}`;
  }
  if (q.includes("hpcl") || q.includes("hindustan petroleum")) {
    const hpclProjects = kb.clients.majorProjects.filter(p => p.includes("HPCL"));
    return `MIPL has implemented multiple projects for HPCL:\n${hpclProjects.join('\n')}`;
  }

  // Awards & Achievements
  if (q.includes("award") || q.includes("recognition") || q.includes("achievement")) {
    return `MIPL is an award-winning consultancy:\n\nInternational:\n${kb.achievements.international.join('\n')}\n\nNational:\n${kb.achievements.national.join('\n')}\n\nIndustry Firsts:\n${kb.achievements.industryFirst.join('\n')}`;
  }

  // Publications
  if (q.includes("publication") || q.includes("research") || q.includes("paper") || q.includes("article")) {
    return `${kb.publications.overview}.\n\nKey topics:\n${kb.publications.topics.slice(0, 5).join('\n')}`;
  }

  // Social Activities
  if (q.includes("social") || q.includes("aatman") || q.includes("secona") || q.includes("community")) {
    return `MIPL is committed to social welfare:\n\n${kb.socialActivities.aatmanAcademy.name}: ${kb.socialActivities.aatmanAcademy.description}\nImpact: ${kb.socialActivities.aatmanAcademy.impact}\nWebsite: ${kb.socialActivities.aatmanAcademy.website}\n\n${kb.socialActivities.secona.name}: ${kb.socialActivities.secona.description}`;
  }

  // Industries
  if (q.includes("industry") || q.includes("industries") || q.includes("sector")) {
    return `MIPL serves multiple industries:\n${kb.industries.join('\n')}`;
  }
  if (q.includes("petroleum") || q.includes("oil") || q.includes("gas") || q.includes("refinery")) {
    return kb.industries[0];
  }
  if (q.includes("bank") || q.includes("atm") || q.includes("financial")) {
    return kb.industries[2];
  }
  if (q.includes("port") || q.includes("airport") || q.includes("critical infrastructure")) {
    return kb.industries[4];
  }

  // Contact - Enhanced variations
  if (q.includes("contact") || q.includes("reach") || q.includes("get in touch") || 
      q.includes("talk to") || q.includes("speak to") || q.includes("connect") ||
      q.includes("how to contact") || q.includes("reach out")) {
    return `Contact MIPL:\n\nEmail: ${kb.contact.email}\nPhone: ${kb.contact.phone}\nHeadquarters: ${kb.contact.headquarters}\nLocations: ${kb.contact.locations.join(', ')}\nWorking Hours: ${kb.contact.workingHours}`;
  }
  if (q.includes("email") || q.includes("mail") || q.includes("e-mail")) return `Email us at: ${kb.contact.email}`;
  if (q.includes("phone") || q.includes("call") || q.includes("number") || q.includes("telephone")) return `Call us at: ${kb.contact.phone}`;
  if (q.includes("office") || q.includes("address") || q.includes("location") || q.includes("where") || 
      q.includes("headquarter") || q.includes("branch")) {
    return `Headquarters: ${kb.contact.headquarters}\n\nWe also have offices in: ${kb.contact.locations.join(', ')}`;
  }

  // Careers - Enhanced with more variations
  if (q.includes("career") || q.includes("job") || q.includes("hiring") || q.includes("vacancy") || 
      q.includes("opening") || q.includes("work") || q.includes("position") || q.includes("employ") ||
      q.includes("recruit") || q.includes("join") || q.includes("apply") || q.includes("current open") ||
      q.includes("available job") || q.includes("available position")) {
    const openings = kb.careers.currentOpenings.map(job => 
      `${job.title} - ${job.location} (${job.experience} experience)`
    ).join('\n');
    return `${kb.careers.overview}\n\nCurrent Openings:\n${openings}\n\nBenefits:\n${kb.careers.benefits.map(b => b.split(' - ')[0]).join(', ')}`;
  }

  // Statistics
  if (q.includes("statistic") || q.includes("number") || q.includes("how many")) {
    return `MIPL Statistics:\n${kb.company.stats.experience} of Experience\n${kb.company.stats.projects}\n${kb.company.stats.audits}\n${kb.company.stats.satisfaction}`;
  }

  // Default fallback
  return "I can help you with information about MIPL's services (CCTV, Biometrics, Access Control, Smart Cities), our projects, leadership team, contact details, career opportunities, awards, and more. Try asking about our services, clients, directors, or how to reach us!";
}

export const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm MIPL's virtual assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { text, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAnswer(text);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button - positioned above scroll to top */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 bg-primary hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[340px] h-[420px] glass-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">MIPL Assistant</h3>
                  <p className="text-xs text-white/80">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Close chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-card/30 to-card/50 backdrop-blur-sm">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user" ? "bg-primary/20" : "bg-muted"
                    }`}>
                      {msg.sender === "user" ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-foreground" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 mb-4"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card/80 backdrop-blur-sm p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-muted/50 rounded-xl outline-none text-sm focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
