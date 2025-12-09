import { HeroSection } from "@/components/hero-section";
import { DealsSection } from "@/components/deals-section";
import { CategorySection } from "@/components/category-section";
import { TrendingSection } from "@/components/trending-section";
import { TrustSection } from "@/components/trust-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DealsSection />
      <CategorySection />
      <TrendingSection />
      <TrustSection />
    </div>
  );
}
