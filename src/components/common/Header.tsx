"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavbarDropdown } from "./CustomDropdown";
import { usePathname } from "next/navigation";
import Notification from "../Notification";
import { IoNotificationsOutline as NotificationIcon } from "react-icons/io5";
import CustomDrawer from "./CustomDrawer";
import { MdMenu as MenuIcon } from "react-icons/md";
import Cookies from "js-cookie";
import { profileIcon } from "../icons/page";
import { PhoneIcon } from "../icons/page";

export interface NavbarTypes {
  title: string;
  link?: string;
  services?: NavbarTypes[];
  path?: string;
}

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isLoggedInUser, setIsLoggedIn] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const isValidToken = Cookies.get("authToken") ? true : false;

  const path = usePathname();

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleNotificationOpen = () => {
    setOpenNotifications((prev) => !prev);
  };

  useEffect(() => {
    setIsLoggedIn(isValidToken);
  }, [isValidToken]);

  useEffect(() => {
    setOpenDropdownIndex(null);
  }, [path]);

  const unseenNotifications = true;

  // Build menu
  const NavbarMenuTitle: NavbarTypes[] = [
    { title: "Home", link: "/" },
    {
      title: "Who we are",
      services: [
        { title: "About Us", link: "/aboutUs" },
        { title: "Who We Are", link: "/who-we-are" },
        { title: "We Accept Medicaid", link: "/medicaid" },
        { title: "Privacy Policy", link: "/privacy" },
        { title: "Resources", link: "/resources" },
        { title: "FAQ", link: "/faq" },
      ],
    },
    { title: "Become A Caregiver", link: "/care-provider" },
    {
      title: "Services",
      services: [
        { title: "Personal care", link: "/service/personal-care" },
        { title: "Home Maker Service", link: "/service/home-maker" },
        { title: "Specialized care", link: "/service/specialized-care" },
        { title: "Sitter Services", link: "/service/sitter-service" },
        { title: "Companion Care", link: "/service/companion-care" },
        { title: "Transportation", link: "/service/transportation" },
        { title: "Veteran's Home Care Services", link: "/veterans" },
      ],
    },
    {
      title: "Locations",
      services: [
        { title: "Sugarland, TX", link: "/location/sugarLand" },
        { title: "Cypress, TX", link: "/location/cypress" },
        { title: "Spring, TX", link: "/location/spring" },
        { title: "Katy, TX", link: "/location/katy" },
        { title: "Pearland, TX", link: "/location/pearland" },
      ],
    },
    { title: "Blogs", link: "/blogs" },
  ];

  if (!isLoggedInUser) {
    NavbarMenuTitle.push({
      title: "Login",
      services: [
        { title: "Login as Care Seeker", link: "/signin" },
        { title: "Login as Care Giver", link: "https://carenest-caregiver.vercel.app/signin" },
      ],
    });
  } else {
    NavbarMenuTitle.push({ title: "Inbox", link: "/inbox" });
  }

  const navContent = (
    <div className="flex lg:flex-row flex-col items-center lg:gap-x-6 xl:gap-x-9 lg:py-0 py-4 w-full  lg:w-auto">
      <nav className="flex lg:flex-row flex-col items-center justify-between gap-6 lg:gap-4 xl:gap-6 w-full lg:w-auto">
        {NavbarMenuTitle.map((item, index) => (
          <NavbarMenu
            key={index}
            title={item.title}
            link={item.link}
            path={path}
            services={item?.services}
            index={index}
            openDropdownIndex={openDropdownIndex}
            setOpenDropdownIndex={setOpenDropdownIndex}
          />
        ))}
      </nav>

      <div className="flex lg:flex-row flex-col items-center gap-4 lg:gap-3 xl:gap-5 lg:mt-0 mt-6 w-full lg:w-auto">
        {isLoggedInUser && (
          <button className="relative" onClick={handleNotificationOpen} aria-label="Notifications">
            <NotificationIcon size={28} className="lg:w-7 lg:h-7" />
            {unseenNotifications && (
              <div className="w-2 h-2 rounded-full bg-[var(--golden-yellow)] absolute top-0 right-[0.1rem]" />
            )}
          </button>
        )}

        {/* Phone badge - hidden on mobile, shown on lg+ */}
        <Link
          href="tel:9876543210"
          className="hidden lg:flex items-center gap-2 rounded-full bg-[#F2E9CE] text-[var(--navy)] px-3 xl:px-6 py-2 xl:py-3 text-sm xl:text-base font-extrabold transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg whitespace-nowrap"
        >
          <PhoneIcon className="w-5 h-5 xl:w-6 xl:h-6" />
          <span>832-237-2273</span>
        </Link>

        {!isLoggedInUser && (
          <Link
            href="/choose-path"
            className="rounded-full bg-[var(--yellow)] text-[var(--navy)] font-bold px-4 py-3 text-lg lg:text-base hover:brightness-105 transition w-full lg:w-auto text-center"
          >
            Get Started
          </Link>
        )}

        {isLoggedInUser && (
          <Link
            href="/profile"
            className="rounded-full bg-[var(--yellow)] text-[var(--navy)] font-bold px-5 py-2.5 text-sm lg:text-base hover:brightness-105 transition flex items-center justify-center gap-2 w-full lg:w-auto"
          >
            {profileIcon()}
            <span>My Profile</span>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex px-4 sm:px-6 lg:px-6 xl:px-10 py-4 sm:py-5 lg:py-6 items-center justify-between bg-[var(--navy)] text-white overflow-hidden">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image 
              src="/Logo_1.svg" 
              alt="logo" 
              width={120} 
              height={120} 
              className="w-24 sm:w-32 lg:w-36 xl:w-40 h-auto"
            />
          </Link>
        </div>

        <button onClick={handleOpenMenu} className="lg:hidden p-2" aria-label="Menu">
          <MenuIcon size={32} className="sm:w-10 sm:h-10" />
        </button>

        <div className="lg:block hidden">{navContent}</div>
        
        <CustomDrawer
          className="bg-[var(--navy)] text-white"
          open={openMenu}
          handleOpen={handleOpenMenu}
        >
          <div className="px-4 py-6">{navContent}</div>
        </CustomDrawer>
      </div>

      <Notification open={openNotifications} handleOpen={handleNotificationOpen} />
    </>
  );
};

const NavbarMenu = ({
  title,
  link,
  path,
  services,
  index,
  openDropdownIndex,
  setOpenDropdownIndex,
}: NavbarTypes & {
  index: number;
  openDropdownIndex: number | null;
  setOpenDropdownIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const isActive = path === link;
  const isDropdownOpen = openDropdownIndex === index;

  return (
    <div
      className="flex items-center gap-x-1 cursor-pointer relative w-full lg:w-auto justify-center lg:justify-start py-2 lg:py-0"
    >
      {link ? (
        <Link
          href={link}
          className={`${
            isActive ? "text-[var(--yellow)]" : "text-white"
          } text-base lg:text-base xl:text-lg hover:text-[var(--yellow)] transition-colors`}
        >
          {title}
        </Link>
      ) : (
        <span 
          className="text-base lg:text-base xl:text-lg"
          onClick={() => {
            if (title === "Services" || title === "Login" || title === "Who we are" || title === "Locations") {
              setOpenDropdownIndex(isDropdownOpen ? null : index);
            }
          }}
        >
          {title}
        </span>
      )}

      {(title === "Services" || title === "Who we are" || title === "Login" || title === "Locations") && (
        <ChevronDown 
          size={18} 
          className="lg:w-[18px] lg:h-[18px] xl:w-[20px] xl:h-[20px]"
          onClick={() => {
            if (title === "Services" || title === "Login" || title === "Who we are" || title === "Locations") {
              setOpenDropdownIndex(isDropdownOpen ? null : index);
            }
          }}
        />
      )}

      {/* Dropdowns - only show on desktop (lg+) */}
      {(title === "Services" || title === "Who we are" || title === "Login" || title === "Locations") && (
        <div className="hidden lg:block lg:mt-5 lg:absolute lg:left-auto lg:-right-10 z-50">
          <NavbarDropdown isOpen={isDropdownOpen} items={services || []} />
        </div>
      )}
    </div>
  );
};

export default Header;
