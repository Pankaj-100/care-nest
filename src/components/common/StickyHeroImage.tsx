import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface StickyHeroImageProps {
  imageUrl: string;
  heightVh?: number; // Section height in vh (default: 180)
  zoomEffect?: boolean; // Enable zoom-on-scroll (default: true)
  alt?: string;
}

const StickyHeroImage: React.FC<StickyHeroImageProps> = ({
  imageUrl,
  heightVh = 110,
  zoomEffect = true,
  alt = "Hero Image",
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!zoomEffect) return;
    const handleScroll = () => {
      if (!imageRef.current) return;
      const section = imageRef.current.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate scroll progress (0 at top, 1 at bottom)
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height - windowHeight), 0),
        1
      );
      // Scale from 1 to 1.15
      setScale(1 + 0.15 * progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [zoomEffect]);

  return (
    <section
      className="sticky-hero-section"
      style={{
        position: "relative",
        height: `${heightVh}vh`,
        overflow: "hidden",
      }}
    >
      <div
        ref={imageRef}
        className="sticky-hero-image"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "60vh",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
            transform: `scale(${scale})`,
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
};

export default StickyHeroImage;