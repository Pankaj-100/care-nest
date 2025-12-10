"use client";
export default function ContactButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/contact";
      }}
      className="bg-[#F2A307] text-[#233D4D] text-base sm:text-xl font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center gap-3 hover:bg-[#d89a06] transition"
    >
      Contact Us <span className="ml-2">&#8594;</span>
    </button>
  );
}