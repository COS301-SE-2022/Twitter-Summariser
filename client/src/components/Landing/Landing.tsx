import React from "react";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

// importing styling
import "./Landing.css";

const Landing = () => {
  return (
    <div className="flex flex-row bg-white ml-14 mr-14">
      {/* first container #########################################################################################################*/}
      <div className="basis-1/4 h-screen p-2 pt-5 border-r border-gray-200 flex flex-col">
        {/* logo comes here */}
        <Logo />

        {/* Navigation */}
        <Navigation />

        {/* Button comes here */}
        {/* <div className="pt-5 pr-3">
          <button type="submit" className="button w-full text-sm p-0.5">
            Summarize
          </button>
        </div> */}
      </div>

      {/* second container #########################################################################################################*/}
      <div className="basis-1/2 h-screen pt-5">
        {/* search */}
        <div className="flex justify-center p-2 border-b border-gray-200">
          <div className="w-3/4 mb-3">
            <input
              type="search"
              className="
                w-full
                px-3
                py-1.5
                text-xs
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded-full
                focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
                bg-gray-200
              "
              placeholder="search twitter"
            />
          </div>
        </div>

        {/* input report */}
        {/* <div className="flex justify-center">
          <div className="pt-2 mb-3 w-3/4 mt-3">
            <textarea
              className="
                w-full
                px-3
                py-1.5
                text-xs
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border-none
                focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
              "
              placeholder="Type in your report"
            ></textarea>
          </div>
        </div> */}

        {/* certain options and summarize button comes here */}
        <div className=""></div>

        {/* Api response comes here */}
        <div className=""></div>
      </div>

      {/* third container #########################################################################################################*/}
      <div className="basis-1/4 h-screen p-2 pt-5 border-l border-gray-200">
        <h1>third container</h1>
      </div>
    </div>
  );
};

export default Landing;
