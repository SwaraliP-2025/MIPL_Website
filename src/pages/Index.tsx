import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TravaSection } from "@/components/home/TravaSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <TravaSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
