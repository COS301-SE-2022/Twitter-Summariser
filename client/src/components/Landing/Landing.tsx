// import { AiFillHeart } from "react-icons/ai";

// import { IoLogoTwitter } from "react-icons/io";
import { useState } from "react";

import Logo from "../Logo/Logo";

import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Explore from "../Explore/Explore";
import Reports from "../Reports/Reports";
import CLReports from "../CLReports/CLReports";
import Drafts from "../Drafts/Drafts";
import Shared from "../Shared/Shared";
import Profile from "../Profile/Profile";
import GenReport from "../GenReport/GenReport";

// importing styling
import "./Landing.css";

const Landing = () => {
  let home = true;
  let explore = false;
  let reports = false;
  let clonedReports = false;
  let drafts = false;
  let shared = false;
  let profile = false;
  let genReport = false;

  const [option, changeOption] = useState(0);

  const navigateOptionHandler = (opt: any) => {
    // const option = enteredOption;
    changeOption(opt);
    console.log(opt);
    // console.log(option);
  };

  const myPropHandler = (opt: any) => {
    // const option = enteredOption;
    changeOption(opt);
    console.log(opt);
    // console.log(option);
  };

  // console.log(option);

  if (option === 1) {
    // console.log(1);

    home = true;
    explore = false;
    reports = false;
    clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 2) {
    // console.log(2);

    home = false;
    explore = true;
    reports = false;
    clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 3) {
    // console.log(3);

    home = false;
    explore = false;
    reports = true;
    clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 4) {
    // console.log(4);

    home = false;
    explore = false;
    reports = false;
    clonedReports = true;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 5) {
    // console.log(5);

    home = false;
    explore = false;
    reports = false;
    clonedReports = false;
    drafts = true;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 6) {
    // console.log(6);

    home = false;
    explore = false;
    reports = false;
    clonedReports = false;
    drafts = false;
    shared = true;
    profile = false;
    genReport = false;
  } else if (option === 7) {
    // console.log(7);

    home = false;
    explore = false;
    reports = false;
    clonedReports = false;
    drafts = false;
    shared = false;
    profile = true;
    genReport = false;
  } else if (option === 8) {
    // console.log(7);

    home = false;
    explore = false;
    reports = false;
    clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = true;
  }

  return (
    <div
      data-testid="landing"
      className="flex flex-row bg-white ml-14 mr-14 relative"
    >
      {/* first container ######################################################################################################### */}
      <div className="basis-1/4 p-2 pt-5 flex flex-col">
        {/* logo comes here */}
        <Logo width="60.69px" height="54px" page="landing" />

        {/* Navigation */}
        <Navigation onNavigateOption={navigateOptionHandler} />
      </div>

      {/* second container ######################################################################################################### */}
      <div className="flex flex-col basis-1/2 relative">
        {home && <Home myPropOption={myPropHandler} />}
        {explore && <Explore />}
        {reports && <Reports />}
        {clonedReports && <CLReports />}
        {drafts && <Drafts />}
        {shared && <Shared />}
        {profile && <Profile />}
        {genReport && <GenReport myPropOption={myPropHandler} />}
      </div>

      {/* third container ######################################################################################################### */}
      <div className="basis-1/4 p-2 pt-5 relative mr-14">
        <div className="fixed rounded bg-gray-200 h-2/3 ml-8 p-5 w-80 ">
          <h1 className="text-xl font-bold">Drafts to report</h1>
          <div className="w-full flex flex-col">
            {/* <div>mine</div>
                        <div>mine</div>
                        <div>mine</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
