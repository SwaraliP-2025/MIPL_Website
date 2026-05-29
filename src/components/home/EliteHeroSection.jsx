import { Link } from "react-router-dom";

export const EliteHeroSection = () => {
  const handleExploreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sectorsSection = document.getElementById('sectors-section');
    if (sectorsSection) {
      sectorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Securing India's Critical Infrastructure
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            25+ years of expertise in Safe Cities, Smart Governance, ICCC Command & Control, and Enterprise Infrastructure Security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E9863C] text-white font-semibold rounded-lg hover:bg-[#d67734] transition-colors">
              Schedule Consultation
            </a>
            
            <button
              onClick={handleExploreClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-gray-500 hover:border-white hover:bg-white/10 transition-colors">
              Explore Sectors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
