"use client";
import React, { useContext, useEffect } from "react";
import UserDetailinfo from "./_components/UserDetailinfo";
import ProjectList from "./_components/ProjectList";
import { UserDetailContext } from "../_context/UserDetailContext";

function UserPage() {
  const { userData } = useContext(UserDetailContext);

  useEffect(() => {
    if(userData){
      document.title = `${userData.name} | User Profile`;
      console.log("User Data: ", userData);
    }
  }, [userData]);

  return (
    <div className="p-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {/* User Info Section */}
      <div className="md:col-span-1 flex md:block justify-center">
        <UserDetailinfo userData={userData} />
      </div>

      {/* Projects Section */}
      <div className="md:col-span-2">
        <ProjectList projects={userData?.projects || []} />
      </div>
    </div>
  );
}

export default UserPage;
