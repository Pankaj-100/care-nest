import BlogsSection from "@/components/landingPage/BlogsSection";
import HeroSection from "@/components/landingPage/HeroSection";
import JoinCommunity from "@/components/landingPage/JoinCommunity";
import ServiceWeProvide from "@/components/landingPage/ServiceWeProvide";
import Testimonials from "@/components/landingPage/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServiceWeProvide />
      <Testimonials />
      <JoinCommunity />
      <BlogsSection />
    </div>
  );
}
