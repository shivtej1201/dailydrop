import React from "react";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50">
      <button className=" flex justify-center items-center h-full p-3 ">
        <FaSearch size={22} />
      </button>
      <div>
        {" "}
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Search "Milk"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Search "Panner"',
            1000,
            'Search "Bread"',
            1000,
            'Search "Milk"',
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Search;
