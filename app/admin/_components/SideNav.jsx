"use client";

import { BarChart, Brush, Layers3, Settings } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function SideNav() {
  const menuList = [
    { id: 1, name: "Pages", icon: Layers3, path:"/admin" },
    { id: 2, name: "Style", icon: Brush, path:"/admin/style" },
    { id: 3, name: "Stats", icon: BarChart, path:"/admin/stats" },
    { id: 4, name: "Settings", icon: Settings, path:"/admin/settings" },
  ];

  return (
    <div className="bg-[#1a1b26] h-screen flex flex-col items-center pt-10 shadow-lg w-24">
      {menuList.map((menu) => (
       <Link href={menu.path} key={menu.id}>
        <motion.div
          key={menu.id}
          initial={{ opacity: 0.7, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="p-4 flex flex-col items-center text-white hover:text-purple-400 cursor-pointer"
          data-tooltip-id={`tooltip-${menu.id}`}
        >
          <menu.icon size={28} />
          <Tooltip id={`tooltip-${menu.id}`} place="right" effect="solid">
            {menu.name}
          </Tooltip>
        </motion.div>
       </Link>
      ))}

      <div className="fixed bottom-5 px-4">
        <UserButton />
      </div>
    </div>
  );
}

export default SideNav;
