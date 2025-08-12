import React from "react";
import logo from "../assets/DailyDrop_one.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();

  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  console.log("isMobile", isMobile);
  console.log("location", location);
  console.log("isSearchPage", isSearchPage);
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 bg-red-400 flex flex-col justify-center gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-4 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                height={150}
                width={90}
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
            </Link>
          </div>
          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login/Cart */}
          <div>
            <button className="text-neutral-600 lg:hidden">
              <FaUserCircle size={35} />
            </button>
            <div className="hidden lg:block">login</div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden  ">
        <Search />
      </div>
    </header>
  );
};

export default Header;
