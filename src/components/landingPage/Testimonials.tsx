import Image from "next/image";
import React from "react";
import CustomCarousel from "../common/CustomCarousel";
import { CarouselItem } from "../ui/carousel";

const Testimonials = () => {
  return (
    <div className="sm:py-20 py-12 bg-[var(--whiteSmoke)] sm:px-28 px-8">
      <div className="text-center flex items-center justify-center mb-10">
        {/* <h1
          className="font-bold text-5xl text-center w-2/3 capitalize
"
        >
          Trusted by members across the country
        </h1> */}
        <div className="flex flex-col font-semibold sm:text-5xl text-3xl capitalize sm:items-center sm:gap-4">
          <div>Trusted by members across</div>
          <div>the country</div>
        </div>
      </div>

      <CustomCarousel>
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </CustomCarousel>
    </div>
  );
};

const Testimonial = () => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <div className="p-6 sm:w-84 w-auto bg-white rounded-2xl">
        <div className="flex items-center gap-x-6">
          <div className="relative w-10 h-10 rounded-full">
            <Image
              src={"/profile pic.jpg"}
              alt="Profile pic"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium">Jhonatan Albert</h4>
            <p className="text-gray-500 text-xs">CEO, GoTick</p>
          </div>
        </div>

        <div className="flex items-center gap-x-3 my-3">
          <p className="text-sm">⭐⭐⭐⭐⭐ </p>
          <p className="text-sm">5.0</p>
        </div>

        <div>
          <p className="text-lg font-medium">
            “Amazing support. Didn&apos;t have to over explain and jump through
            hoops. Honestly some of the best support I&apos;ve had dealing with
            healthcare matters.”
          </p>
        </div>
      </div>
    </CarouselItem>
  );
};

export default Testimonials;
