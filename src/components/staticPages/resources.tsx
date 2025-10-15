import { LinkIcon } from "../icons/page";

const resources = [
  {
    tags: ["Health", "Care"],
    title: "Seniors Guide to Cancer",
    description:
      "Seniors are living longer and having to face more challenges than before. A healthy lifestyle can help you deal with aging, protect you from cancer and keep you at your best. As average life expectancies increase, older adults...",
    link: "#",
  },
  {
    tags: ["Health", "Care"],
    title: "Seniors Guide to Cancer",
    description:
      "Seniors are living longer and having to face more challenges than before. A healthy lifestyle can help you deal with aging, protect you from cancer and keep you at your best. As average life expectancies increase, older adults...",
    link: "#",
  },
  {
    tags: ["Health", "Care"],
    title: "Seniors Guide to Cancer",
    description:
      "Seniors are living longer and having to face more challenges than before. A healthy lifestyle can help you deal with aging, protect you from cancer and keep you at your best. As average life expectancies increase, older adults...",
    link: "#",
  },
  {
    tags: ["Health", "Care"],
    title: "Seniors Guide to Cancer",
    description:
      "Seniors are living longer and having to face more challenges than before. A healthy lifestyle can help you deal with aging, protect you from cancer and keep you at your best. As average life expectancies increase, older adults...",
    link: "#",
  },
  // Repeat or map as needed for demo
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
      <h4 className="text-center text-[var(--yellow)] font-semibold mb-2 text-3xl">
        Resources
      </h4>
      <h1 className="text-center text-[var(--navy)] font-bold text-5xl mb-6">
        Helpful Websites For The Elderly
      </h1>
      <p className="max-w-4xl text-xl text-center text-gray-500 mb-8 text-base">
        CareWorks is providing the following list of resources that we hope will assist you in your research. Please click on a link below to visit any of these websites.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-[#F7F7F3] rounded-xl shadow-sm p-6 flex flex-col justify-between"
          >
            <div className="flex gap-2 mb-2">
              {resources[0].tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#E7E7E7] text-[#233D4D] text-md font-semibold px-6 py-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-[#233D4D] mb-2">
              {resources[0].title}
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              {resources[0].description}
            </p>
            <a
              href={resources[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#233D4D] text-white px-5 py-2 rounded-full font-semibold text-md hover:bg-[#1a2c3b] transition"
            >
              Explore Resources
              <LinkIcon/>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}