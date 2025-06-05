"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { YellowButton } from "./CustomButton";
import { ChevronDown } from "lucide-react";
import { NavbarDropdown } from "./CustomDropdown";
import { usePathname, useRouter } from "next/navigation";

export interface NavbarTypes {
  title: string;
  link?: string;
  services?: NavbarTypes[];
  path?: string;
}

const NavbarMenuTitle: NavbarTypes[] = [
  { title: "Home", link: "/" },
  { title: "Find a caregiver", link: "/care-giver" },
  { title: "Become a care provider", link: "/care-provider" },
  {
    title: "Services",
    services: [
      { title: "Personal care", link: "/service/personal-care" },
      { title: "Assisted care/Home care", link: "/service/home-care" },
      { title: "Memory care", link: "/service/memory-care" },
      {
        title: "Private pay skilled nursing",
        link: "/service/skilled-nursing",
      },
    ],
  },
  { title: "Blogs", link: "/blogs" },
  { title: "Contact Us", link: "/contact" },
];

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex md:px-28 py-5 items-center justify-between bg-[var(--navy)] text-white">
      <div className="flex items-center gap-2">
        <Image src={"/Logo.svg"} alt="logo" width={50} height={50} />
      </div>
      <div className="flex items-center md:gap-x-18">
        <nav className="flex items-center justify-between gap-x-5">
          {NavbarMenuTitle.map((item, index) => (
            <NavbarMenu
              key={index}
              title={item.title}
              link={item.link}
              path={path}
            />
          ))}
        </nav>

        <div>
          <YellowButton
            onClick={() => {
              router.push("/signin");
            }}
          >
            Login as Client
          </YellowButton>
        </div>
      </div>
    </div>
  );
};

const NavbarMenu = ({ title, link, path }: NavbarTypes) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const isActive = path === link;

  return (
    <div
      className="flex items-center gap-x-1 cursor-pointer relative"
      onClick={() => {
        if (title === "Services") setOpenDropdown(!openDropdown);
      }}
    >
      {link ? (
        <Link
          href={link}
          className={`${
            isActive ? "text-[var(--yellow)] font-medium" : ""
          } text-sm`}
        >
          {title}
        </Link>
      ) : (
        <span className="text-sm">{title}</span>
      )}

      {title === "Services" && <ChevronDown size={19} />}

      {/* Dropdown */}
      {title === "Services" && (
        <div className="mt-5 absolute -right-10 z-50">
          <NavbarDropdown
            isOpen={openDropdown}
            items={NavbarMenuTitle[3].services || []}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
