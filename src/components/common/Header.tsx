"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
// Removed NavbarDropdown import; will implement dropdown inline
import { usePathname, useRouter } from "next/navigation";
import Notification from "../Notification";
import { IoNotificationsOutline as NotificationIcon } from "react-icons/io5";
import CustomDrawer from "./CustomDrawer";
import { MdMenu as MenuIcon } from "react-icons/md";
import Cookies from "js-cookie";
import { profileIcon } from "../icons/page";
import { useGetUnreadCountQuery } from "@/store/api/notificationApi";

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
  const [mobileLoginDropdownOpen, setMobileLoginDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const isValidToken = Cookies.get("authToken") ? true : false;
  const token = Cookies.get("authToken");

  // Get unread notification count
  const { data: unreadCountData, refetch: refetchUnreadCount } = useGetUnreadCountQuery(undefined, {
    skip: !token, // Only fetch if user is logged in
  });

  const unreadCount = unreadCountData?.data?.unreadCount || 0;

  const path = usePathname();

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleNotificationOpen = () => {
    setOpenNotifications((prev) => !prev);
    // Refetch unread count when opening notifications
    if (token) {
      refetchUnreadCount();
    }
  };

  useEffect(() => {
    setIsLoggedIn(isValidToken);
  }, [isValidToken]);

  useEffect(() => {
    setOpenDropdownIndex(null);
  }, [path]);

  // Close dropdowns when clicking outside the nav area (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current) return;
      const target = event.target as Node | null;
      if (target && !navRef.current.contains(target)) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unseenNotifications = mounted && unreadCount > 0;

  // Build menu
  const NavbarMenuTitle: NavbarTypes[] = [
    { title: "Home", link: "/" },
    {
      title: "Who We Are",
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
        { title: "Personal Care", link: "/service/personal-care" },
        { title: "Home Maker Service", link: "/service/home-maker" },
        { title: "Specialized Care", link: "/service/specialized-care" },
        { title: "Sitter Services", link: "/service/sitter-service" },
        { title: "Companion Care", link: "/service/companion-care" },
        { title: "Transportation", link: "/service/transportation" },
        { title: "Veteran's Home Care Services", link: "/veterans" },
      ],
    },
    {
      title: "Locations",
      services: [
        { title: "Sugarland, TX", link: "/location/Sugarland-TX" },
        { title: "Cypress, TX", link: "/location/Cypress-TX" },
        { title: "Spring, TX", link: "/location/Spring-TX" },
        { title: "Katy, TX", link: "/location/Katy-TX" },
        { title: "Pearland, TX", link: "/location/Pearland-TX" },
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
    <div
      ref={navRef}
      className="flex lg:flex-row flex-col items-start lg:items-center lg:gap-x-[clamp(1.3rem,1.8vw,1.8rem)] xl:gap-x-[clamp(1.8rem,2.8vw,2.8rem)] lg:py-0 py-4 w-full lg:w-auto lg:justify-end"
    >
      <nav className="flex lg:flex-row flex-col items-start lg:items-center lg:justify-end gap-6 lg:gap-[clamp(1.25rem,1.8vw,1.8rem)] xl:gap-[clamp(1.8rem,2.8vw,2.8rem)] w-full lg:w-auto">
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
            onNavigate={handleCloseMenu}
          />
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-6 xl:gap-10 lg:mt-0 w-full lg:w-auto">
        {isLoggedInUser && (
          <button className="relative lg:block hidden" onClick={handleNotificationOpen} aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}>
            <NotificationIcon size={28} className="lg:w-7 lg:h-7" />
            {/* Show unread notification indicator */}
            {mounted && unreadCount > 0 && (
              <div className="absolute -top-1 -right-1">
                <div className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                </div>
              </div>
            )}
            {/* Fallback for SSR - static dot */}
            {!mounted && unreadCount > 0 && (
              <div className="w-2 h-2 rounded-full bg-[var(--golden-yellow)] absolute top-0 right-[0.1rem]" />
            )}
          </button>
        )}

        {/* Get Started button: shows on all breakpoints, styled per design */}
        {!isLoggedInUser && (
          <Link
            href="/choose-path"
            className="rounded-full bg-[var(--yellow)] text-[var(--navy)] font-bold px-9 py-3 text-lg sm:text-lg hover:brightness-105 transition w-full lg:w-auto text-center"
          >
            Get Started
          </Link>
        )}

        {isLoggedInUser && (
          <Link
            href="/profile"
            className="hidden lg:flex items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy)] font-bold px-7 py-2 text-base lg:text-lg shadow-md hover:brightness-105 transition gap-2 min-w-[140px]"
            style={{ minHeight: 48 }}
          >
            <span className="flex items-center justify-center mr-2">
              {profileIcon()}
            </span>
            <span className="block text-center leading-tight">My Profile</span>
          </Link>
        )}
      </div>
    </div>
  );

  // Mobile-only profile menu items (shown in sidebar when logged in)
  const mobileProfileMenuItems = [
    { title: "Contact Us", link: "/contact" },
    { title: "Manage Profile", link: "/profile" },
    { title: "Recent Booking", link: "/recent-booking" },
    { title: "Saved Caregivers", link: "/saved-caregiver" },
    { title: "Reset Password", link: "/reset-password" },
    { title: "Delete Account", link: "/profile?action=delete" },
    { title: "Log Out", link: "/signin", action: "logout" },
  ];

  return (
    <>
      <div className="flex px-4 sm:px-6 lg:px-6 xl:px-10 py-4 sm:py-5 lg:py-6 items-center justify-between bg-[var(--navy)] text-white z-[2000] relative">
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

        {/* Mobile / tablet right side: login / get started before login,
            notification + menu after login */}
        <div className="flex items-center gap-4 lg:hidden">
          {!isLoggedInUser ? (
            <>
              <div className="relative">
                <button 
                  onClick={() => setMobileLoginDropdownOpen(!mobileLoginDropdownOpen)}
                  className="text-white font-light text-base flex items-center gap-1"
                >
                  Login
                  <ChevronDown size={16} className={`transition-transform ${mobileLoginDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileLoginDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 min-w-[180px] rounded-lg bg-white text-[var(--navy)] overflow-hidden shadow-lg z-[9999]">
                    <a
                      href="/signin"
                      className="px-3 py-3 text-sm font-semibold cursor-pointer hover:bg-orange-500 hover:text-white block w-full transition-colors"
                      onClick={() => setMobileLoginDropdownOpen(false)}
                    >
                      Login as Care Seeker
                    </a>
                    <div className="mx-3 h-px bg-[var(--navy)]/10" />
                    <a
                      href="https://carenest-caregiver.vercel.app/signin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-3 text-sm font-semibold cursor-pointer hover:bg-orange-500 hover:text-white block w-full transition-colors"
                      onClick={() => setMobileLoginDropdownOpen(false)}
                    >
                      Login as Care Giver
                    </a>
                  </div>
                )}
              </div>
              <Link
                href="/choose-path"
                className="text-[var(--yellow)] font-light text-base"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              className="relative flex items-center justify-center"
              onClick={handleNotificationOpen}
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <NotificationIcon size={26} className="w-7 h-7" />
              {/* Show unread notification indicator */}
              {mounted && unreadCount > 0 && (
                <div className="absolute -top-1 -right-1">
                  <div className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  </div>
                </div>
              )}
              {/* Fallback for SSR - static dot */}
              {!mounted && unreadCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--golden-yellow)] absolute -top-1 -right-1" />
              )}
            </button>
          )}

          <button onClick={handleOpenMenu} className="p-2" aria-label="Menu">
            <MenuIcon size={32} className="sm:w-10 sm:h-10" />
          </button>
        </div>

        <div className="lg:block hidden">{navContent}</div>
        
        <CustomDrawer
          className="bg-[var(--navy)] text-white"
          open={openMenu}
          handleOpen={handleOpenMenu}
          direction="left"
        >
          <div className="h-full overflow-y-auto flex flex-col">
            {/* Logo and Close Button Header */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-600">
              <Link href="/" onClick={handleOpenMenu}>
                <Image 
                  src="/Logo_1.svg" 
                  alt="logo" 
                  width={120} 
                  height={120} 
                  className="w-32 h-auto"
                />
              </Link>
              <button 
                onClick={handleOpenMenu} 
                className="text-white hover:text-[var(--yellow)] transition-colors p-2"
                aria-label="Close menu"
              >
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation Content */}
            <div className="px-4 py-6 flex-1">
              {navContent}
              
              {/* Mobile-only profile menu items */}
              {isLoggedInUser && (
                <div className="lg:hidden mt-1">
                  <nav className="flex flex-col gap-4 w-full">
                    {mobileProfileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.action === "logout") {
                            Cookies.remove("authToken");
                            router.push("/");
                          } else if (item.link) {
                            router.push(item.link);
                          }
                          handleCloseMenu();
                        }}
                        className="text-base text-white hover:text-[var(--yellow)] transition-colors py-2"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
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
  onNavigate,
}: NavbarTypes & {
  index: number;
  openDropdownIndex: number | null;
  setOpenDropdownIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onNavigate?: () => void;
}) => {
  const isActive = path === link;
  const isDropdownOpen = openDropdownIndex === index;
  const hasDropdown = title === "Services" || title === "Who We Are" || title === "Login" || title === "Locations";

  return (
    <div
      className="flex flex-col items-start gap-y-1 lg:flex-row lg:items-center lg:gap-x-1 cursor-pointer relative w-full lg:w-auto justify-start py-2 lg:py-0"
    >
      <div className="flex items-center gap-2">
        {link && !hasDropdown ? (
          <Link
            href={link}
            className={`${
              isActive ? "text-[var(--yellow)]" : "text-white"
            } text-[clamp(1rem,1.2vw,1.35rem)] lg:text-[clamp(1.1rem,1.3vw,1.3rem)] xl:text-[clamp(1.2rem,1.3vw,1.3rem)] hover:text-[var(--yellow)] transition-colors`}
            onClick={() => {
              setOpenDropdownIndex(null);
              onNavigate?.();
            }}
          >
            {title}
          </Link>
        ) : (
          <button
            type="button"
            className={`${isActive ? "text-[var(--yellow)]" : "text-white"} text-left text-[clamp(1rem,1.2vw,1.35rem)] lg:text-[clamp(1.1rem,1.3vw,1.3rem)] xl:text-[clamp(1.2rem,1.3vw,1.3rem)] flex items-center gap-2`}
            onClick={() => {
              if (hasDropdown) {
                setOpenDropdownIndex(isDropdownOpen ? null : index);
              }
            }}
          >
            {title}
            {hasDropdown && (
              <ChevronDown
                size={18}
                className="lg:w-[18px] lg:h-[18px] xl:w-[20px] xl:h-[20px]"
              />
            )}
          </button>
        )}
      </div>

      {/* Dropdowns - only show on desktop (lg+) */}
      {(title === "Services" || title === "Who We Are" || title === "Login" || title === "Locations") && (
        <div className="relative hidden lg:block z-[999]">
          {isDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-6 min-w-[230px] rounded-2xl bg-white text-[var(--navy)] p-0 overflow-hidden shadow-xl border border-black/5 z-[999]"
              onMouseLeave={() => setOpenDropdownIndex(null)}
            >
              {services && services.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.link && item.link.startsWith('http') ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-3 text-md font-semibold cursor-pointer hover:bg-orange-500 hover:text-white focus:bg-orange-500 block w-full transition-colors"
                      style={{ outline: 'none' }}
                      onClick={() => {
                        setOpenDropdownIndex(null);
                        onNavigate?.();
                      }}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      href={item.link || '#'}
                      className="px-3 py-3 text-md font-semibold cursor-pointer hover:bg-orange-500 hover:text-white focus:bg-orange-500 block w-full transition-colors"
                      style={{ outline: 'none' }}
                      onClick={() => {
                        setOpenDropdownIndex(null);
                        onNavigate?.();
                      }}
                    >
                      {item.title}
                    </Link>
                  )}
                  {idx < (services.length - 1) && (
                    <div className="mx-5 h-px bg-[var(--navy)]/10" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile dropdown (inline reveal) */}
      {hasDropdown && isDropdownOpen && services && (
        <div className="lg:hidden mt-2 w-full pl-3 text-[1.15rem] text-white/85">
          <div className="flex flex-col gap-2">
            {services.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.link && item.link.startsWith("http") ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 font-medium text-white hover:bg-orange-500 rounded transition-colors block"
                      onClick={() => {
                        setOpenDropdownIndex(null);
                        onNavigate?.();
                      }}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    href={item.link || "#"}
                    className="py-2 px-3 font-medium text-white hover:bg-orange-500 rounded transition-colors block"
                      onClick={() => {
                        setOpenDropdownIndex(null);
                        onNavigate?.();
                      }}
                  >
                    {item.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
