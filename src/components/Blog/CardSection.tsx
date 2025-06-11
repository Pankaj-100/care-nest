import React from "react";
import { CustomCard } from "./CustomCard";

const CardSection = () => {
  const data = [
    {
      imgSrc: "/Blog/doctor_img3.png",
      profileImg: "/profile pic.jpg",
      name: "Nataly Birch",
      desc: "Elderly Care at Home: How to Ensure Comfort...",
      para: "What the data says about the harm of unnecessary medical tests...",
      href: "blogs/b1",
      date: "11 January 2025",
    },
    {
      imgSrc: "/Blog/doctor_img4.png",
      profileImg: "/profile pic.jpg",
      name: "Nataly Birch",
      desc: "Elderly Care at Home: How to Ensure Comfort...",
      para: "What the data says about the harm of unnecessary medical tests...",
      href: "blogs/b2",
      date: "11 January 2025",
    },
    {
      imgSrc: "/Blog/doctor_img1.png",
      profileImg: "/profile pic.jpg",
      name: "Nataly Birch",
      desc: "Elderly Care at Home: How to Ensure Comfort...",
      para: "What the data says about the harm of unnecessary medical tests...",
      href: "blogs/b3",
      date: "11 January 2025",
    },
    {
      imgSrc: "/Blog/doctor_img2.png",
      profileImg: "/profile pic.jpg",
      name: "Nataly Birch",
      desc: "Elderly Care at Home: How to Ensure Comfort...",
      para: "What the data says about the harm of unnecessary medical tests...",
      href: "blogs/b4",
      date: "11 January 2025",
    },
    {
      imgSrc: "/Blog/doctor_img3.png",
      profileImg: "/profile pic.jpg",
      name: "Nataly Birch",
      desc: "Elderly Care at Home: How to Ensure Comfort...",
      para: "What the data says about the harm of unnecessary medical tests...",
      href: "blogs/b5",
      date: "11 January 2025",
    },
    {
      imgSrc: "/Blog/doctor_img4.png",
      profileImg: "/profile pic.jpg",
      name: "Nataly Birch",
      desc: "Elderly Care at Home: How to Ensure Comfort...",
      para: "What the data says about the harm of unnecessary medical tests...",
      href: "blogs/b6",
      date: "11 January 2025",
    },
  ];
  return (
    <div className="py-10 px-8 md:px-[5.5rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <CustomCard
            key={index}
            imgSrc={item.imgSrc}
            profileImg={item.profileImg}
            name={item.name}
            desc={item.desc}
            para={item.para}
            date={item.date}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSection;
