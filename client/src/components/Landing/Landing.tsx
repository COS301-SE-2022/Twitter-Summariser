// import { AiFillHeart } from "react-icons/ai";

// import { IoLogoTwitter } from "react-icons/io";
import { useState } from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import Logo from "../Logo/Logo";

import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Explore from "../Explore/Explore";
import Reports from "../Reports/Reports";
// import CLReports from "../CLReports/CLReports";
import Drafts from "../Drafts/Drafts";
import Shared from "../Shared/Shared";
import Profile from "../Profile/Profile";
import GenReport from "../GenReport/GenReport";
import PageNotFound from "../PageNotFound/PageNotFound";

// importing styling
import "./Landing.css";

const Landing = (props: any) => {
  console.log("User Id: " + props.userID);

  let home = true;
  let explore = false;
  let reports = false;
  // let clonedReports = false;
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
    // clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 2) {
    // console.log(2);

    home = false;
    explore = true;
    reports = false;
    // clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 3) {
    // console.log(3);

    home = false;
    explore = false;
    reports = true;
    // clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 4) {
    // console.log(4);

    home = false;
    explore = false;
    reports = false;
    // clonedReports = true;
    drafts = false;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 5) {
    // console.log(5);

    home = false;
    explore = false;
    reports = false;
    // clonedReports = false;
    drafts = true;
    shared = false;
    profile = false;
    genReport = false;
  } else if (option === 6) {
    // console.log(6);

    home = false;
    explore = false;
    reports = false;
    // clonedReports = false;
    drafts = false;
    shared = true;
    profile = false;
    genReport = false;
  } else if (option === 7) {
    // console.log(7);

    home = false;
    explore = false;
    reports = false;
    // clonedReports = false;
    drafts = false;
    shared = false;
    profile = true;
    genReport = false;
  } else if (option === 8) {
    // console.log(7);

    home = false;
    explore = false;
    reports = false;
    // clonedReports = false;
    drafts = false;
    shared = false;
    profile = false;
    genReport = true;
  }

  return (
    <BrowserRouter>
      <div
        data-testid="landing"
        className="flex flex-row bg-white lg:ml-14 lg:mr-14 sm:ml-5 sm:mr-5 relative md:justify-around "
      >
        {/* first container ######################################################################################################### */}
        <div className="xl:basis-1/5 lg:basis-1/6 p-2 pt-5 flex-col hidden mini-tablet:block">
          {/* logo comes here */}
          <Logo width="60.69px" height="54px" page="landing" />

          {/* Navigation */}
          <Navigation onNavigateOption={navigateOptionHandler} />
        </div>

        {/* second container ######################################################################################################### */}
        <div className="flex flex-col 2xl:basis-1/2 mini-tablet:basis-2/3 basis-full relative">
          <Routes>
            <Route path="/" element={<Home myPropOption={myPropHandler} />} />
            <Route path="/explore" element={<Explore />} />
             <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* {home && <Home myPropOption={myPropHandler} />} */}
          {/* {explore && <Explore />} */}
          {/* {reports && <Reports />} */}
          {/* {clonedReports && <CLReports />} */}
          {/* {drafts && <Drafts />} */}
          {/* {shared && <Shared />} */}
          {/* {profile && <Profile />} */}
          {/* {genReport && <GenReport myPropOption={myPropHandler} />} */}

        </div>



        {/* third container ######################################################################################################### */}
        <div className=" xl:flex xl:basis-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
          <div className="fixed rounded bg-gray-200 h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
            <h1 className="text-xl font-bold">Drafts to report</h1>
            <div className="w-full flex flex-col">
              {/* <div>mine</div>
                          <div>mine</div>
                          <div>mine</div> */}
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>

  );
};

export default Landing;
