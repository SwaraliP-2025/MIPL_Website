import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TravaSection } from "@/components/home/TravaSection";
import { CTASection } from "@/components/home/CTASection";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <ClientLogos />
      <Testimonials />
      <TravaSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
