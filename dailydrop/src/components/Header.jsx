import React from "react";
import logo from "../assets/DailyDrop_one.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();

  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-32 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
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
            {/* This for Mobile Part */}
            <button className="text-neutral-600 lg:hidden">
              <FaUserCircle size={35} />
            </button>

            {/* This for Desktop Part */}
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={redirectToLoginPage} className="text-lg px-2">
                Login
              </button>

              <button className="flex items-center gap-2 bg-secondary-200 hover:bg-secondary-100 px-3 py-3 rounded text-white">
                <div className="animate-pulse">
                  <TiShoppingCart size={25} />
                </div>
                <div className="font-semibold">
                  <p>My cart</p>
                </div>
              </button>
            </div>
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
