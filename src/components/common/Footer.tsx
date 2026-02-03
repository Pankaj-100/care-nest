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
      { title: "Become A Caregiver", link: "/care-provider" },
      { title: "Who We Are", link: "/who-we-are" },
      { title: "We Accept Medicaid", link: "/medicaid" },
      { title: "Admin panel", link: "http://admin.careworks.biz"},
      { title: "Caregiver", link: "https://carenest-caregiver.vercel.app/signin" },
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
  // { title: "Cookies", link: "/cookies" },
  { title: "Legal", link: "/legal" },
  // { title: "Recalls", link: "/recalls" },
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
  const locationLinks: linkItems[] = (footerData?.locations || []).map((loc) => {
    // Remove commas, trim, replace multiple spaces with one, then replace spaces with hyphens
    // e.g., 'Sugarland, TX' -> 'Sugarland-TX'
    const cleaned = loc.replace(/,/g, '').trim().replace(/\s+/g, '-');
    return {
      title: loc,
      link: `/location/${cleaned}`,
    };
  });

  // Prepare dynamic social links from API
  const dynamicSocialLinks: linkItems[] = (footerData?.socialLinks || []).map((social) => ({
    icons: social.icon,
    link: social.url,
  }));

  const displayDescription = footerData?.footerDescription || 
    "CareWorks provides compassionate, \n personalized eldercare services that \n support seniors and their families with \n dignity and respect.";
  return (
    <div className="pt-1 pb-1 lg:px-29 md:px-12 px-6 bg-[var(--navy)] text-white overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 mb-0 items-start md:items-center md:justify-center">
        {/* Logo and Description */}
        <div className="col-span-2 lg:col-span-2 mt-0 flex flex-col items-center lg:items-start">
          <Link href="/" aria-label="Go to home" className="relative w-45 h-45 block cursor-pointer mb-0">
            <Image src="/Logo_1.svg" alt="Carenest logo" fill priority />
          </Link>
          <p className={`text-lg text-[#FFFFFF] mt-0 font-light text-center lg:text-left`}>
            CareWorks provides compassionate, <br/> personalized eldercare services that <br/> support seniors and their families <br/>with dignity and respect.
          </p>
          {dynamicSocialLinks.length > 0 && (
            <div className="mt-5 flex flex-col gap-3 items-center lg:items-start">
              <p className="text-base font-medium mt-5 text-[#F2A307]">Follow us on Social Platforms</p>
              <div className="flex items-center gap-4">
                {dynamicSocialLinks.map((item, i) => (
                  <Link
                    href={item.link}
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-22 h-22 flex items-center justify-center rounded-full transition-colors"
                    aria-label="Visit our social link"
                  >
                    <div className="relative mt-2 w-16 h-16">
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
          )}
        </div>

        {/* Company Links */}
        <div className="col-span-1 mt-8 text-xl flex flex-col justify-start h-full md:items-center md:text-center lg:items-start lg:text-left">
          <FooterLink title="Company" links={link[0]["Company"]} />
        </div>
        
        {/* Other Services */}
        <div className="col-span-1 mt-8 text-xl flex flex-col justify-start h-full md:items-center md:text-center lg:items-start lg:text-left">
          <FooterLink title="Other Services" links={link[0]["Other Services"]} />
        </div>
        
        {/* Locations we cover */}
        <div className="col-span-1 mt-8 text-xl flex flex-col justify-start h-full md:items-center md:text-center lg:items-start lg:text-left">
          {loading ? (
            <div>
              <p className="font-medium mb-6 text-white md:text-center lg:text-left">Locations we cover</p>
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
        <div className="col-span-1 mt-8 text-xl flex flex-col justify-start h-full md:items-center md:text-center lg:items-start lg:text-left">
          <FooterLink title="Quick Links" links={link[0]["Quick Links"]} />
        </div>
      </div>

      <div className="py-10 lg:py-0">
        {/* Proud Partners Section - match expected image */}
        <div className="flex flex-col items-center mb-0 lg:mb-2">
          <div className="w-full flex flex-col items-center">
            <h3 className="text-2xl font-medium mb-3 text-white text-center lg:text-left w-full lg:max-w-md" style={{ marginLeft: '0px' }}>Proud Partners</h3>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center lg:justify-end items-center lg:items-end gap-6 lg:gap-12 w-full max-w-6xl mb-4">
              {/* First row - single wide image */}
              <div className="flex justify-center w-full lg:w-auto">
                <Image src="/partners/veterans-care.png" alt="Veterans Care Coordination" width={220} height={60} className="object-contain h-12 lg:h-16 w-auto" />
              </div>
              {/* Second row - three images */}
              <div className="flex flex-row flex-nowrap lg:flex-wrap justify-center lg:justify-end items-center gap-4 lg:gap-12 w-full lg:w-auto">
                <Image src="/partners/caring-com.png" alt="Caring.com" width={100} height={100} className="object-contain h-13 lg:h-16 w-auto flex-shrink-0" />
                <Image src="/partners/a-place-for-mom.png" alt="A Place for Mom" width={220} height={60} className="object-contain h-12 lg:h-16 w-auto flex-shrink-0" />
                <Image src="/carescout.png" alt="Carescout Qualtiy network" width={100} height={100} className="object-contain h-13 lg:h-16 w-auto flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter and CAREWORKS branding */}
      <div className="my-1 flex items-center justify-center flex-wrap gap-y-1">
        {/* <div> 
          <h3 className="text-xl font-medium lg:mb-3">Subscribe to our newsletter</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="outline-none border-b py-2 sm:w-80 w-70 text-xl bg-transparent text-white placeholder-gray-300"
            />
            <button className="bg-[var(--yellow)] text-black px-4 py-4 rounded-t-lg cursor-pointer">
              <ChevronRight />
            </button>
          </div>
        </div> */}
        <div>
          <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[135px] text-gray-400/30 tracking-widest sm:mt-0 mt-0">
            CAREWORKS
          </h1>
        </div>
      </div>

      <hr className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-0 h-px bg-white/20 my-6" />

      <div className="flex flex-col sm:flex-row flex-wrap gap-y-4 items-center justify-center sm:justify-between sm:my-4 sm:mt-4 mt-8">
        <div className="flex items-center justify-around sm:w-auto w-full gap-x-5">
          {footerLink.map((item, i) => (
            <Link href={item.link} key={i} className="text-lg text-gray-200">
              {item.title}
            </Link>
          ))}
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end order-1 sm:order-0 text-center sm:text-right">
          <p className="text-lg text-[#FFFFFF] font-medium">
            © 2024 Copyright | All rights reserved
          </p>
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
      <p className="font-medium mb-6 text-white text-start lg:text-left">{title}</p>
      <ul className="flex flex-col gap-3 items-start">
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
