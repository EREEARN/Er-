import Image from "next/image";
import NavBar from "@/components/layouts/landing/nav-bar";
import Hero from "@/components/layouts/landing/hero";
import HowItWorks from "@/components/layouts/landing/how-it-works";
import ExploreBounties from "@/components/layouts/landing/explore-bounties";
import ForOrganizations from "@/components/layouts/landing/for-organizations";
import CallToAction from "@/components/layouts/landing/call-to-action";
import Footer from "@/components/layouts/landing/footer";
export default function Home() {
  return (
    <div className="h-screen ">
      <NavBar />
      <Hero/>
      <HowItWorks/>
      <ExploreBounties/>
      <ForOrganizations/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}
