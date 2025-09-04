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
      { title: "About Us", link: "/" },
      { title: "Pricing", link: "/" },
      { title: "Features", link: "/" },
      { title: "We accept Medicaid", link: "/" },
    ],
    Resource: [
      { title: "Blog", link: "/" },
      { title: "Customer Stories", link: "/" },
      { title: "Information", link: "/" },
      { title: "Legal", link: "/" },
      { title: "Payments", link: "/" },
    ],
    Carrer: [
      { title: "Jobs", link: "/" },
      { title: "Hiring", link: "/" },
      { title: "News", link: "/" },
      { title: "Tips and Tricks", link: "/" },
    ],
    Help: [
      { title: "FAQ", link: "/" },
      { title: "Help Center", link: "/" },
      { title: "Support", link: "/" },
    ],
  },
];

const footerLink: linkItems[] = [
  {
    title: "Terms",
    link: "/",
  },
  {
    title: "Privacy",
    link: "/",
  },
  {
    title: "Cookies",
    link: "/",
  },
  {
    title: "Legal",
    link: "/",
  },
  {
    title: "Recalls",
    link: "/",
  },
];
const socialLink: linkItems[] = [
  {
    icons: youtube,
    link: "/",
  },
  {
    icons: tiktok,
    link: "/",
  },
  {
    icons: linkedin,
    link: "/",
  },
  {
    icons: instagram,
    link: "/",
  },
  {
    icons: facebook,
    link: "/",
  },
];
const Footer = () => {
  return (
    <div className="pt-18 pb-8 lg:px-29 md:px-12 px-6 bg-[var(--navy)] text-white overflow-hidden">
      <div className="flex flex-wrap justify-between gap-4 ">
        <div className="sm:w-75 w-full ">
          <Link href="/" aria-label="Go to home" className="relative w-37 h-37 block cursor-pointer">
            <Image src="/Logo_1.svg" alt="Carenest logo" fill priority />
          </Link>
          <p className="mt-4 text-md text-white">
            CareWorks provides compassionate, personalized eldercare services that support seniors and their families with dignity and respect.
          </p>
        </div>

        <FooterLink title="Company" links={link[0]["Company"]} />
        <FooterLink title="Resource" links={link[0]["Resource"]} />
        <FooterLink title="Carrer" links={link[0]["Carrer"]} />
        <FooterLink title="Help" links={link[0]["Help"]} />
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
              className="outline-none border-b py-2 sm:w-60 w-70"
            />
            <button className="bg-[var(--yellow)] text-black px-4 py-4 rounded-t-lg cursor-pointer">
              <ChevronRight />{" "}
            </button>
          </div>
        </div>

        <div>
          <h1
            className="font-bold xl:text-[120px] lg:text-[80px] 
           text-gray-400/30 tracking-widest sm:mt-0 mt-2"
          >
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
          <p className="text-sm text-[#FFFFFF] font-medium ">
            {" "}
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
      <p className="font-medium mb-4">{title}</p>
      <ul className="flex flex-col gap-5">
        {links.map((item, index) => (
          <li className="text-sm font-light text-gray-300" key={index}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
