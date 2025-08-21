import React from "react";
import Image from "next/image";

const FAQImageSection: React.FC = () => {
  return (
    <div className="w-full md:w-[55%]">
      <Image
        src="/Contact/contact-image.png"
        alt="Elderly Care"
        width={600}
        height={400}
        className="rounded-xl w-full  object-cover"
      />
    </div>
  );
};

export default FAQImageSection;
