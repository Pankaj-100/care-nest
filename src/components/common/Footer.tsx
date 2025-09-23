import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import youtube from "../../../public/Youtube.svg";
import facebook from "../../../public/Facebook.svg";
import tiktok from "../../../public/tiktok.svg";
import instagram from "../../../public/instagram.svg";
import linkedin from "../../../public/linkedin.svg";


type linkItems = {
  icons?: string;
  title?: string;
  link: string;
};
type linkSection = {
  [section: string]: linkItems[];
};

const link: linkSection[] = [
  {
    Company: [
      { title: "About Us", link: "/about" },
      { title: "Pricing", link: "/pricing" },
      { title: "Features", link: "/features" },
      { title: "We accept Medicaid", link: "/medicaid" },
    ],
    "Other Services": [
      { title: "Transportation", link: "/services/transportation" },
      { title: "Veteran Homecare", link: "/services/veteran-homecare" },
      { title: "Private Sitters", link: "/services/private-sitters" },
      { title: "Homemakers", link: "/services/homemakers" },
    ],
    "Locations we cover": [
      { title: "Sugarland, TX", link: "/locations/sugarland" },
      { title: "Katy, TX", link: "/locations/katy" },
      { title: "Spring, TX", link: "/locations/spring" },
      { title: "Cypress, TX", link: "/locations/cypress" },
    ],
    "Quick Links": [
      { title: "FAQs", link: "/faq" },
      { title: "Privacy Policy", link: "/privacy" },
      { title: "Resources", link: "/resources" },
      { title: "Veterans Financial Assistance", link: "/veterans-assistance" },
    ],
  },
];

const footerLink: linkItems[] = [
  { title: "Terms", link: "/terms" },
  { title: "Privacy", link: "/privacy" },
  { title: "Cookies", link: "/cookies" },
  { title: "Legal", link: "/legal" },
  { title: "Recalls", link: "/recalls" },
];

const socialLink: linkItems[] = [
  { icons: youtube, link: "/" },
  { icons: tiktok, link: "/" },
  { icons: linkedin, link: "/" },
  { icons: instagram, link: "/" },
  { icons: facebook, link: "/" },
];

const Footer = () => {
  return (
    <div className="pt-8 pb-8 lg:px-29 md:px-12 px-6 bg-[var(--navy)] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12 items-center">
        {/* Logo and Description */}
        <div className="lg:col-span-2 mt-8">
          <Link href="/" aria-label="Go to home" className="relative w-45 h-40 block cursor-pointer mb-4">
            <Image src="/Logo_1.svg" alt="Carenest logo" fill priority />
          </Link>
          <p className={`text-base text-[#FFFFFF] font-light`}>
            CareWorks provides compassionate, <br /> personalized eldercare services that <br/> support seniors and their families with <br/> dignity and respect.
          </p>
        </div>

        {/* Company Links */}
        <div className="mt-8">
          <FooterLink title="Company" links={link[0]["Company"]} />
        </div>
        
        {/* Other Services */}
        <div className="mt-8">
          <FooterLink title="Other Services" links={link[0]["Other Services"]} />
        </div>
        
        {/* Locations we cover */}
        <div className="mt-8">
          <FooterLink title="Locations we cover" links={link[0]["Locations we cover"]} />
        </div>
        
        {/* Quick Links */}
        <div className="mt-8">
          <FooterLink title="Quick Links" links={link[0]["Quick Links"]} />
        </div>
      </div>

      <div className="my-7 flex items-center justify-between flex-wrap gap-y-5">
        <div>
          <h3 className="text-lg font-medium lg:mb-3">
            Subscribe to our newsletter
          </h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="outline-none border-b py-2 sm:w-60 w-70 bg-transparent text-white placeholder-gray-300"
            />
            <button className="bg-[var(--yellow)] text-black px-4 py-4 rounded-t-lg cursor-pointer">
              <ChevronRight />
            </button>
          </div>
        </div>

        <div>
          <h1 className="font-bold xl:text-[120px] lg:text-[80px] text-gray-400/30 tracking-widest sm:mt-0 mt-2">
            CAREWORKS
          </h1>
        </div>
      </div>

      <hr className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-0 h-px bg-white/20 my-6" />

      <div className="flex flex-wrap gap-y-4 items-center justify-between sm:my-4 sm:mt-4 mt-8">
        <div className="flex items-center justify-around sm:w-auto w-full gap-x-5">
          {footerLink.map((item, i) => (
            <Link href={item.link} key={i} className="text-sm text-gray-200">
              {item.title}
            </Link>
          ))}
        </div>

        <div className="sm:w-auto w-full flex justify-center sm:order-0 order-1">
          <p className="text-sm text-[#FFFFFF] font-medium">
            © 2024 Copyright | All rights reserved
          </p>
        </div>

        <div className="flex sm:w-auto w-full justify-around items-center gap-x-5">
          {socialLink.map((item, i) => (
            <Link
              href={item.link}
              key={i}
              className="text-sm text-gray-200 p-2 rounded-full border border-gray-200"
            >
              <div className="relative w-4 h-4">
                <Image src={item.icons || ""} alt="icons" fill />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const FooterLink = ({
  title,
  links,
}: {
  title: string;
  links: linkItems[];
}) => {
  return (
    <div>
      <p className="font-medium mb-6 text-white">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.link} 
              className="text-sm font-light text-gray-300 hover:text-white transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
