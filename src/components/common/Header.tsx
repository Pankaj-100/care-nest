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

export interface NavbarTypes {
  title: string;
  link?: string;
  services?: NavbarTypes[];
  path?: string;
}

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const path = usePathname();
  const router = useRouter();

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleNotificationOpen = () => {
    setOpenNotifications((prev) => !prev);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Action: Local storage is used for static build only
  const isLoggedInUser = isClient
    ? localStorage.getItem("care_nest_token")
      ? true
      : false
    : false;
  const unseenNotifications = true;

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
  ];

  if (!isLoggedInUser) {
    NavbarMenuTitle.push({ title: "Blogs", link: "/blogs" });
    NavbarMenuTitle.push({ title: "Contact Us", link: "/contact" });
  } else {
    NavbarMenuTitle.push({ title: "Inbox", link: "/inbox" });
  }

  const navContent = (
    <div className="flex lg:flex-row flex-col items-center md:gap-x-18 lg:py-0 py-4">
      <nav className="flex lg:flex-row flex-col items-center justify-between gap-5">
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

        {!isLoggedInUser && (
          <YellowButton
            onClick={() => {
              router.push("/signin");
            }}
          >
            Login as Client
          </YellowButton>
        )}

        {isLoggedInUser && (
          <YellowButton
            onClick={() => {
              router.push("/profile");
            }}
          >
            My Profile
          </YellowButton>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex lg:px-28 px-10 py-5 items-center justify-between bg-[var(--navy)] text-white overflow-hidden">
        <div className="flex items-center gap-2">
          <Image src={"/Logo.svg"} alt="logo" width={50} height={50} />
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
