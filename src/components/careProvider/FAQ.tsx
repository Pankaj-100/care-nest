import Image from "next/image";
import React from "react";
import { CustomAccordion } from "../common/CustomAccordion";

export interface accordionProps {
  title: string;
  description: string;
  value?: number;
}
const accordionData: accordionProps[] = [
  {
    title: "Why choose this platform?",
    description:
      "CareLinx is a trusted platform that connects professional caregivers with families in need of high-quality, compassionate care. It offers caregivers flexible job opportunities, competitive pay, and access to clients that match their skills and preferences. With built-in tools for scheduling, communication, and support, CareLinx simplifies the caregiving experience so you can focus on what matters most—providing exceptional care.",
  },
  {
    title: "How can I become a Caregiver on Caregiver?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "How can I become a Caregiver on Caregiver?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "How can I become a Caregiver on Caregiver?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "How can I become a Caregiver on Caregiver?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "How can I become a Caregiver on Caregiver?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
];

const FAQ = () => {
  return (
    <div className="flex lg:flex-row flex-col  bg-[var(--navy)] lg:px-18 px-8 lg:py-18 py-12">
      <div>
        <div className="relative  w-full h-48 lg:w-38 sm:ml-8">
          <Image
            src={"/care-provider-cta.png"}
            alt="faq"
            fill
            className="rounded-t-[3rem] rounded-b-[3rem] object-cover"
          />
        </div>

        <h1 className="mt-6 text-[var(--yellow)] font-medium lg:text-5xl text-3xl lg:w-2/3">
          Curious About Caregiving on Our Platform ?  We’ve <br/>
           Got Answers!
        </h1>
      </div>

      <div className="lg:w-1/2 lg:mt-0 mt-4">
        {accordionData.map((item, index) => (
          <CustomAccordion
            title={item.title}
            description={item.description}
            key={index}
            value={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
