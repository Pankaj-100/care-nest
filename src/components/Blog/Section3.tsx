import Image from "next/image";
import React from "react";

type BlogItem = {
  id: string;
  mainImage?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorProfilePic?: string;
  blogDate?: string;
  content?: string;
};

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "";

const Section3: React.FC<{ blog?: BlogItem | null }> = ({ blog }) => {
  // if no blog, render placeholder same shape as previous static UI
  const imageSrc = blog?.mainImage ?? "/Blog/care-img.png";
  const author = blog?.authorName ?? "Unknown Author";
  const date = formatDate(blog?.blogDate) || "11 January 2025";
  const title = blog?.title ?? "Elderly Care at Home: How to Ensure Comfort...";
  const desc = blog?.description ?? "What the data says about the harm of unnecessary medical tests...";

  return (
    <div className="relative flex items-center justify-center h-[450px] mt-16 px-4 sm:px-6">
      <div className="relative w-full max-w-7xl h-[390px] rounded-3xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div
          className="absolute top-0 left-0 h-full w-2/3 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #233D4D00 0%, #233D4D 100%)",
          }}
        ></div>

        <div className="absolute bottom-6 left-6 text-white flex flex-col gap-4 max-w-md sm:max-w-lg">
          <div className="flex items-center gap-3">
            <Image
              src={blog?.authorProfilePic && blog.authorProfilePic.trim() !== "" ? blog.authorProfilePic : "/Blog/avatar_img.png"}
              width={24}
              height={24}
              alt="Author Avatar"
              className="rounded-full"
            />
            <div className="flex items-center gap-2 text-md">
              <h4 className="font-semibold">{author}</h4>
              <div className="bg-white/50 w-2 h-2 rounded-full"></div>
              <p>{date}</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-2xl font-semibold leading-[120%] font-urbanist">
            {title}
          </h2>

          <p className="text-sm sm:text-lg font-medium leading-[120%] font-urbanist">
            {desc}
          </p>

          {/* Learn More */}
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <a href={`/blogs/${blog?.id ?? ""}`} className="text-lg leading-[150%] font-urbanist">
              Learn More
            </a>
            <Image
              src="/Blog/right-arrow.png"
              alt="Arrow right"
              width={16}
              height={12}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
