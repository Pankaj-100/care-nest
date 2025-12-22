"use client";

import Link from "next/link";
import { ContactIcon } from "../icons/page";
import { Phone } from "lucide-react";

const FloatingContactButton = () => {
  return (
    <>
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
          }
        }
        
        @keyframes blink-bg {
          0%, 100% {
            background-color: var(--yellow);
          }
          50% {
            background-color: #fff9e6;
          }
        }
        
        .pulse-animation {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite,
                     blink-bg 1s ease-in-out infinite;
        }
      `}</style>
      
      <Link
        href="/contact"
        className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--yellow)] text-[var(--navy)] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 pulse-animation group"
        aria-label="Contact Us"
      >
        <Phone 
          className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" 
          strokeWidth={2.5}
        />
        {/* <ContactIcon /> */}
        
        {/* Tooltip on hover - desktop only */}
        <span className="hidden lg:block absolute right-full mr-3 px-4 py-2 bg-[var(--navy)] text-white text-sm font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Contact Us
        </span>
      </Link>
    </>
  );
};

export default FloatingContactButton;
