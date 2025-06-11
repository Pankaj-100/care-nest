import React from "react";
import FAQImageSection from "./FAQImageSection";
import FAQSection from "./FAQSection";

const FAQBlock: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row lg:gap-[4.5rem]  gap-6 px-6 py-12 justify-between">
      <FAQImageSection />
      <FAQSection />
    </section>
  );
};

export default FAQBlock;
