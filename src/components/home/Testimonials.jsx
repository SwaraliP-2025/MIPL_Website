import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "MIPL's integrated security solution has significantly enhanced our refinery's safety and operational efficiency. Their expertise in handling complex projects is unmatched.",
      author: "Senior Manager",
      company: "HPCL Mumbai Refinery",
      role: "Operations & Security"
    },
    {
      quote: "The smart city surveillance system implemented by MIPL has transformed our city's security infrastructure. Their end-to-end approach ensured seamless deployment.",
      author: "Project Director",
      company: "Aurangabad Smart City Development Corporation",
      role: "Smart City Initiative"
    },
    {
      quote: "Working with MIPL on our port security management system was exceptional. They delivered a world-class solution that meets international standards.",
      author: "Chief Security Officer",
      company: "Jawaharlal Nehru Port Trust",
      role: "Port Security"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 animated-grid opacity-5" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading organizations across India for delivering excellence in security solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full glass-card hover:shadow-xl transition-all group">
                <Quote className="w-10 h-10 text-primary mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <blockquote className="text-justify mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-white/10 pt-6">
                  <p className="font-semibold text-lg mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-primary font-medium mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            Join 50+ organizations that trust MIPL for their security needs
          </p>
        </motion.div>
      </div>
    </section>
  );
};
