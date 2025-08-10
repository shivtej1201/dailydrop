import React from "react";
import logo from "../assets/DailyDrop_one.png";
import Search from "./Search";

const Header = () => {
  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container mx-auto flex items-center h-full px-4 justify-between">
        {/* logo */}
        <div className="h-full">
          <div className="h-full flex justify-center items-center">
            <img
              src={logo}
              height={170}
              width={80}
              className="hidden lg:block"
              alt="logo"
            />
            <img
              src={logo}
              height={120}
              width={80}
              className="lg:hidden"
              alt="logo"
            />
          </div>
        </div>
        {/* Search */}
        <div>
          <Search />
        </div>

        {/* Login/Cart */}
        <div>logim</div>
      </div>
    </header>
  );
};

export default Header;
