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
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

const MainContent: React.FC<{ blog?: BlogItem | null }> = ({ blog }) => {
  // fallbacks keep UI unchanged if blog is missing
  const imageSrc = blog?.mainImage ?? "/Blog/main-image.png";
  const author = blog?.authorName ?? "Nandy Birch";
  const date = formatDate(blog?.blogDate) || "11 January 2025";
  const title =
    blog?.title ?? "Elderly Care at Home: How to Ensure Comfort and Well-being";
  const content = blog?.content ?? "";

  return (
    <div className="w-full md:w-2/3 mx-auto px-6 py-12">
      <div className="rounded-lg overflow-hidden mb-6 w-full h-[420px] relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center gap-x-3 mb-4">
        <div className="relative w-8 h-8 rounded-full border border-[var(--navy)] overflow-hidden">
          <Image
            src={blog?.authorProfilePic ?? "/Blog/avatar_img.png"}
            width={32}
            height={32}
            alt={author}
            className="object-cover"
          />
        </div>

        <p className="text-gray-500 text-sm">
          {author} • {date}
        </p>
      </div>

      <h1 className="text-4xl font-medium mb-6 text-[var(--navy)] leading-[120%]">
        {title}
      </h1>

      <div 
        className="space-y-6 text-[#667085] text-base leading-relaxed prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: content || `
            <p>Caring for elderly loved ones at home is a heartfelt responsibility that requires attention, patience, and compassion. Ensuring comfort goes beyond physical needs—it includes emotional support, safety, and a sense of independence. Start by creating a safe and accessible environment.</p>
            <p>Regular health monitoring and medication management are crucial. Scheduling routine check-ups and organizing medications can prevent potential health risks. Nutrition also plays a key role—offer balanced meals tailored to their dietary needs and encourage hydration.</p>
            <p>Beyond physical care, emotional well-being is just as important. Encourage social interaction, whether through visits from friends and family or engaging in community activities. Hobbies, light exercise, and mental stimulation through games or reading can greatly enhance quality of life.</p>
          `
        }}
      />
    </div>
  );
};

export default MainContent;
