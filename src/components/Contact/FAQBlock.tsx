import React from "react";
import FAQImageSection from "./FAQImageSection";
import FAQSection from "./FAQSection";


const FAQBlock: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row gap-10 px-6 py-12 justify-between">
      <FAQImageSection />
      <FAQSection />
    </section>
  );
};

export default FAQBlock;
