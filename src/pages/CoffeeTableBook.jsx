import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Maximize2,
  Minimize2,
  Download
} from "lucide-react";

const CoffeeTableBook = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use Heyzine for flip functionality (same as consultmipl.com)
  const pdfUrl = "https://heyzine.com/flip-book/8e32e1ee95.html";

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <Layout>
      <PageHero
        align="center"
        eyebrow="Digital Showcase"
        title="CSN Digital Coffee Table Book"
        description="Experience our comprehensive security solutions showcase in an interactive digital format. Flip through pages just like a real book."
        image="/projects/0148.png"
      />

      {/* Flipbook Viewer Section */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollFloat strength={40}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
            {/* Flipbook Container */}
            <div className={`glass-card overflow-hidden transition-all duration-300 ${
              isFullscreen 
                ? 'fixed inset-4 z-50 flex flex-col' 
                : 'relative'
            }`}>
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-semibold hidden sm:inline">CSN Digital Coffee Table Book</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="gap-2"
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Exit Fullscreen</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Fullscreen</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Heyzine Flipbook - Same as consultmipl.com */}
              <div className={`bg-white flex-1 relative overflow-hidden ${
                isFullscreen 
                  ? 'h-full' 
                  : 'h-[50vh] sm:h-[600px] md:h-[700px] lg:h-[90vh]'
              }`}>
                <div className="relative w-full h-full">
                  <iframe
                    src={pdfUrl}
                    className="w-full border-0"
                    title="CSN Digital Coffee Table Book"
                    allowFullScreen
                    allow="fullscreen; autoplay; encrypted-media"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    style={{ 
                      background: 'white',
                      height: 'calc(100% + 80px)',
                      marginBottom: '-80px',
                      touchAction: 'auto'
                    }}
                  />
                </div>
                {/* White overlay to cover branding at bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 pointer-events-none" 
                  style={{
                    height: '80px',
                    background: 'white',
                    zIndex: 9999
                  }}
                />
              </div>
            </div>

            {/* Info Text and Feedback Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center space-y-6"
            >
              <p className="text-muted-foreground">
                Click on page corners to flip through the book. Use fullscreen mode for the best experience.
              </p>
              
              {/* Feedback Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-blue-600 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                >
                  <a href="/ctb-feedback">Give Your Feedback on CTB</a>
                </Button>
              </motion.div>
            </motion.div>
            </motion.div>
          </ScrollFloat>
        </div>
      </section>
    </Layout>
  );
};

export default CoffeeTableBook;
