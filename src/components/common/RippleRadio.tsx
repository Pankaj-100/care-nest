"use client";

import { motion } from "framer-motion";
import React from "react";

const RippleRadio = () => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-green-500"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: 1.4, opacity: 0 }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <div className="w-3 h-3 rounded-full bg-green-500 relative z-10" />
    </div>
  );
};

export default RippleRadio;
