import React from "react";
import { CustomCard } from "./CustomCard";

type BlogItem = {
  id: string;
  mainImage?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorProfilePic?: string;
  blogDate?: string;
};

const CardSection: React.FC<{ blogs?: BlogItem[] }> = ({ blogs = [] }) => {
  return (
    <div className="py-10 px-8 md:px-[5.5rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((item) => (
          <CustomCard
            key={item.id}
            imgSrc={item.mainImage ?? "/Blog/doctor_img3.png"}
            profileImg={item.authorProfilePic ?? "/profile pic.jpg"}
            name={item.authorName ?? "Unknown"}
            desc={item.title ?? ""}
            para={item.description ?? ""}
            date={item.blogDate ? new Date(item.blogDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : ""}
            href={`/blogs/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSection;
