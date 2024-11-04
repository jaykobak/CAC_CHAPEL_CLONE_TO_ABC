import React from "react";
import { useSearchParams } from "react-router-dom"; // For React Router
import MainLayout from "../layouts/MainLayout";
import Hero from "@/components/About/Hero";
import WhoAreWe from "@/components/About/WhoAreWe";
import OurHistory from "@/components/About/OurHistory";
import Cores from "@/components/About/Cores";
import OurVision from "@/components/About/OurVision";

const About = () => {
  const [searchParams] = useSearchParams();
  const core = searchParams.get("core");

  return (
    <MainLayout>
      <div className="flex flex-col gap-20">
        {!core && (
          <>
            <Hero />
            <WhoAreWe />
            <OurHistory />
            <Cores />
          </>
        )}
        {core ? <OurVision /> : null}
      </div>
    </MainLayout>
  );
};

export default About;
