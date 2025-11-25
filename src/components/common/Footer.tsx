"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import youtube from "../../../public/Youtube.svg";
import facebook from "../../../public/Facebook.svg";
import tiktok from "../../../public/tiktok.svg";
import instagram from "../../../public/instagram.svg";
import linkedin from "../../../public/linkedin.svg";

type SocialLink = {
  id: string;
  url: string;
  icon: string;
  platform: string;
};

type FooterData = {
  footerDescription: string;
  locations: string[];
  socialLinks: SocialLink[];
};

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
      { title: "About Us", link: "/aboutUs" },
      { title: "Pricing", link: "/pricing" },
      { title: "Features", link: "/features" },
      { title: "We accept Medicaid", link: "/medicaid" },
    ],
    "Other Services": [
      { title: "Transportation", link: "/service/transportation" },
      { title: "Veteran Homecare", link: "/veterans" },
      { title: "Private Sitters", link: "/service/sitter-service" },
      { title: "Homemakers", link: "/service/home-maker" },
    ],
    "Quick Links": [
      { title: "FAQs", link: "/faq" },
      { title: "Privacy Policy", link: "/privacy" },
      { title: "Resources", link: "/resources" },
      { title: "Veterans Financial Assistance", link: "/veterans" },
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
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  useEffect(() => {
    const fetchFooter = async () => {
      if (!API_BASE) {
        setLoading(false);
        return;
      }

      try {
        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/footer`;
        const res = await fetch(endpoint);
        
        if (res.ok) {
          const json = await res.json();
          const footer = json?.data?.footer;
          
          if (footer) {
            setFooterData({
              footerDescription: footer.footerDescription || "",
              locations: footer.locations || [],
              socialLinks: footer.socialLinks || [],
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, [API_BASE]);

  // Prepare dynamic location links from API
  const locationLinks: linkItems[] = (footerData?.locations || []).map((loc) => ({
    title: loc,
    link: `/location/${loc.toLowerCase().replace(/,?\s+/g, "-").replace("tx", "").replace(/-$/, "")}`,
  }));

  // Prepare dynamic social links from API
  const dynamicSocialLinks: linkItems[] = (footerData?.socialLinks || []).map((social) => ({
    icons: social.icon,
    link: social.url,
  }));

  const displayDescription = footerData?.footerDescription || 
    "CareWorks provides compassionate, \n personalized eldercare services that \n support seniors and their families with \n dignity and respect.";

  const displaySocialLinks = dynamicSocialLinks.length > 0 ? dynamicSocialLinks : socialLink;
  return (
    <div className="pt-1 pb-1 lg:px-29 md:px-12 px-6 bg-[var(--navy)] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12 items-center">
        {/* Logo and Description */}
        <div className="lg:col-span-2 mt-1">
          <Link href="/" aria-label="Go to home" className="relative w-45 h-45 block cursor-pointer mb-4">
            <Image src="/Logo_1.svg" alt="Carenest logo" fill priority />
          </Link>
          <p className={`text-lg text-[#FFFFFF] font-light whitespace-pre-line`}>
            {displayDescription}
          </p>
        </div>

        {/* Company Links */}
        <div className="mt-8 text-xl">
          <FooterLink title="Company" links={link[0]["Company"]} />
        </div>
        
        {/* Other Services */}
        <div className="mt-8 text-xl">
          <FooterLink title="Other Services" links={link[0]["Other Services"]} />
        </div>
        
        {/* Locations we cover */}
        <div className="mt-8 text-xl">
          {loading ? (
            <div>
              <p className="font-medium mb-6 text-white">Locations we cover</p>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-32" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-28" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-36" />
              </div>
            </div>
          ) : (
            <FooterLink title="Locations we cover" links={locationLinks} />
          )}
        </div>
        
        {/* Quick Links */}
        <div className="mt-14 text-xl">
          <FooterLink title="Quick Links" links={link[0]["Quick Links"]} />
        </div>
      </div>

      <div className="my-7 flex items-center justify-between flex-wrap gap-y-5">
        <div>
          <h3 className="text-xl font-medium lg:mb-3">
            Subscribe to our newsletter
          </h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="outline-none border-b py-2 sm:w-60 w-70 text-lg bg-transparent text-white placeholder-gray-300"
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
            <Link href={item.link} key={i} className="text-lg text-gray-200">
              {item.title}
            </Link>
          ))}
        </div>

        <div className="sm:w-auto w-full flex justify-center sm:order-0 order-1">
          <p className="text-lg text-[#FFFFFF] font-medium">
            © 2024 Copyright | All rights reserved
          </p>
        </div>

        <div className="flex sm:w-auto w-full justify-around items-center gap-x-5">
          {displaySocialLinks.map((item, i) => (
            <Link
              href={item.link}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-200 p-2 rounded-full border border-gray-200 hover:border-[var(--yellow)] transition-colors"
            >
              <div className="relative w-4 h-4">
                <Image 
                  src={item.icons || ""} 
                  alt="social icon" 
                  fill 
                  className="object-contain"
                />
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
              className="text-lg font-light text-gray-300 hover:text-white transition-colors"
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
