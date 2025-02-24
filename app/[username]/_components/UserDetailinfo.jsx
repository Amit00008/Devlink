import { TwicPicture } from "@twicpics/components/react";
import { MapPin } from "lucide-react";
import React from "react";

function UserDetailinfo({ userData }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:h-screen p-6 md:pl-16">
      {/* Profile Section */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-1/3">
        <TwicPicture
          src={userData?.profileImage}
          className="rounded-full w-28 h-28 border-4 border-gray-600 shadow-xl"
        />
        <div>
          <h2 className="font-bold text-xl md:text-2xl text-white">{userData.name}</h2>
          <h3 className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
            <MapPin className="w-5 h-5 text-primary" /> {userData.location}
          </h3>
        </div>
      </div>

      {/* Bio Section */}
      <div className="md:w-2/3 mt-6 md:mt-0 md:pl-8">
        <p className="text-gray-300 text-center md:text-left text-sm md:text-base leading-relaxed px-4 md:px-0">
          {userData.bio}
        </p>
      </div>
    </div>
  );
}

export default UserDetailinfo;
