import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "dev-carenest.s3.ap-south-1.amazonaws.com",
      "carenest-backend-8y2y.onrender.com",
    ],
  },
  /* config options here */
};

export default nextConfig;
