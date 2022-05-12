// import { AiFillHeart } from "react-icons/ai";

// import { IoLogoTwitter } from "react-icons/io";

import Logo from "../Logo/Logo";

import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";

// importing styling
import "./Landing.css";

function Landing() {
  const home = true;
  const explore = false;
  const reports = false;
  const clonedReports = false;
  const drafts = false;
  const shared = false;
  const profile = false;

  // const navigateOptionHandler = (option: any) => {
  //   // const option = enteredOption;
  //   console.log(option);
  // };

  return (
    <div className="flex flex-row bg-white ml-14 mr-14 relative">
      {/* first container ######################################################################################################### */}
      <div className="basis-1/4 p-2 pt-5 flex flex-col">
        {/* logo comes here */}
        <Logo />

        {/* Navigation */}
        {/* <Navigation onNavigateOption={navigateOptionHandler} /> */}
        <Navigation />

        {/* Button comes here */}
        {/* <div className="pt-5 pr-3">
          <button type="submit" className="button w-full text-sm p-0.5">
            Summarize
          </button>
        </div> */}
      </div>

      {/* second container ######################################################################################################### */}
      <div className="flex flex-col basis-1/2 relative">
        {home && <Home />}
        {/* {explore && <Explore />}
        {reports && <Reports/>}
        {clonedReports && <CLReports />}
        {drafts && <Drafts />}
        {shared && <Shared />}
        {profile && <Profile />} */}
      </div>

      {/* third container ######################################################################################################### */}
      <div className="basis-1/4 p-2 pt-5 relative mr-14">
        <div className="fixed rounded bg-gray-200 h-2/3 ml-8 p-5 w-80 ">
          <h1 className="text-xl font-bold">Drafts to report</h1>
          <div className="w-full flex flex-col">
            <div>mine</div>
            <div>mine</div>
            <div>mine</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
