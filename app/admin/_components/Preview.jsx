import React from "react";
import { motion } from "framer-motion";

function Preview() {
  return (
    <div className="flex justify-center items-center h-screen md:fixed md:right-16 hidden md:flex">
      {/* Phone Frame */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative border-[10px] border-black w-[300px] h-[600px] rounded-[40px] shadow-lg bg-gray-800"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-lg"></div>

        {/* Screen */}
        <div className="h-full w-full bg-gray-950 rounded-[30px] flex items-center justify-center text-white overflow-hidden">
          <iframe
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/autisticamit}`}
            title="Profile"
            className="w-full h-full rounded-[30px] border-none"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
}

export default Preview;
