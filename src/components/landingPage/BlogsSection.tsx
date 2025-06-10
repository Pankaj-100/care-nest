import Image from "next/image";
import React from "react";
import { TransparentButton } from "../common/CustomButton";

const BlogsSection = () => {
  return (
    <div className="sm:py-20 py-12 bg-[var(--whiteSmoke)] sm:px-28 px-4">
      <div className="text-center flex items-center justify-center mb-10">
        <h1 className="font-bold sm:text-5xl text-3xl text-center s,:w-2/3">
          Resources are essential for human activities in various realms.
        </h1>
      </div>

      <div className="flex flex-wrap item-center justify-around">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

const BlogCard = () => {
  return (
    <div className="p-2 w-70">
      <div className="w-66 h-58 rounded-2xl mb-3 relative">
        <Image
          src={"/service1.png"}
          alt="personal care"
          fill
          className="rounded-2xl object-cover"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div className="relative w-6 h-6 rounded-full border border-[var(--navy)]">
              <Image
                src={"/profile pic.jpg"}
                alt="profile pic"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-[var(--navy)] text-sm">Nataly Birch</p>
          </div>

          <p className="text-[var(--navy)] text-sm"> 11 January 2025</p>
        </div>
        <h3 className="font-semibold text-lg my-2 text-[var(--navy)]">
          Elderly Care at Home: How to Ensure Comfort & Safety
        </h3>
        <p className="text-sm text-[var(--navy)] mb-3">
          What the data says about the harm of unnecessary medical tests
        </p>
      </div>
      <TransparentButton className="w-full">Learn more</TransparentButton>
    </div>
  );
};

export default BlogsSection;
