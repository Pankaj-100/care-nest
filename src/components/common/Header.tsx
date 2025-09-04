"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { YellowButton } from "./CustomButton";
import { ChevronDown } from "lucide-react";
import { NavbarDropdown } from "./CustomDropdown";
import { usePathname, useRouter } from "next/navigation";
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

  const isValidToken = Cookies.get("authToken") ? true : false;

  const path = usePathname();
  const router = useRouter();

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleNotificationOpen = () => {
    setOpenNotifications((prev) => !prev);
  };

  useEffect(() => {
    setIsLoggedIn(isValidToken);
  }, [isValidToken]);

  const unseenNotifications = true;

  // Build menu
  const NavbarMenuTitle: NavbarTypes[] = [
    { title: "Home", link: "/" },
    { title: "Find A Caregiver", link: "/care-giver" },
    { title: "Become A Caregiver", link: "/care-provider" },
    {
      title: "Services",
      services: [
        { title: "Personal care", link: "/service/personal-care" },
        { title: "Assisted care/Home care", link: "/service/home-care" },
        { title: "Memory care", link: "/service/memory-care" },
        { title: "Private pay skilled nursing", link: "/service/skilled-nursing" },
      ],
    },
  ];

  if (!isLoggedInUser) {
    NavbarMenuTitle.push({ title: "Blogs", link: "/blogs" });
    NavbarMenuTitle.push({ title: "Login", link: "/signin" });
  } else {
    NavbarMenuTitle.push({ title: "Inbox", link: "/inbox" });
  }

  const navContent = (
    <div className="flex lg:flex-row flex-col items-center md:gap-x-18 lg:py-0 py-4">
      <nav className="flex lg:flex-row flex-col items-center justify-between gap-11">
        {NavbarMenuTitle.map((item, index) => (
          <NavbarMenu
            key={index}
            title={item.title}
            link={item.link}
            path={path}
            services={item?.services}
          />
        ))}
      </nav>

      <div className="flex lg:flex-row flex-col items-center gap-6 lg:mt-0 mt-4">
        {isLoggedInUser && (
          <button className="relative" onClick={handleNotificationOpen}>
            <NotificationIcon size={20} />
            {unseenNotifications && (
              <div className="w-2 h-2 rounded-full bg-[var(--golden-yellow)] absolute top-0 right-[0.1rem]" />
            )}
          </button>
        )}

        {/* Phone badge (always visible on large screens) */}
        <Link
          href="tel:9876543210"
          className="hidden lg:flex items-center gap-2 rounded-full bg-[#F2E9CE] text-[var(--navy)] px-3 py-2 text-sm font-medium"
        >
          <PhoneIcon />
          <span>987 654 3210</span>
        </Link>

        {!isLoggedInUser && (
          <Link
            href="/choose-path"
            className="rounded-full bg-[var(--yellow)] text-[var(--navy)] font-medium px-6 py-3 text-sm hover:brightness-105 transition"
          >
            Get Started
          </Link>
        )}

        {isLoggedInUser && (
          <YellowButton
            onClick={() => {
              router.push("/profile");
            }}
            className="flex items-center gap-2"
          >
            {profileIcon()}
            <span className="text-[var(--navy)] font-semibold">My Profile</span>
          </YellowButton>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex lg:px-28 px-10 py-4 items-center justify-between bg-[var(--navy)] text-white overflow-hidden">
        <div className="flex items-center gap-2">
          <Image src={"/Logo_1.svg"} alt="logo" width={100} height={100} />
        </div>

        <button onClick={handleOpenMenu} className="lg:hidden">
          <MenuIcon size={30} />
        </button>

        <div className="lg:block hidden"> {navContent}</div>
        <CustomDrawer
          className="bg-[var(--navy)] text-white lg-hidden"
          open={openMenu}
          handleOpen={handleOpenMenu}
        >
          {navContent}
        </CustomDrawer>
      </div>

      <Notification
        open={openNotifications}
        handleOpen={handleNotificationOpen}
      />
    </>
  );
};

const NavbarMenu = ({ title, link, path, services }: NavbarTypes) => {
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
          <NavbarDropdown isOpen={openDropdown} items={services || []} />
        </div>
      )}
    </div>
  );
};

export default Header;
