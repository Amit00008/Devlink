import React from "react";
import SideNav from "./_components/SideNav";
import Provider from "./Provider";

function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-24 fixed">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="ml-24 flex-grow p-6 bg-[#1e1e2e] text-white min-h-screen">
        <Provider>

        {children}
        </Provider>
      </div>
    </div>
  );
}

export default Layout;
