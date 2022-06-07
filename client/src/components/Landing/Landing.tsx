import { BrowserRouter, Routes, Route } from "react-router-dom";

import Logo from "../Logo/Logo";

import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Explore from "../Explore/Explore";
import Reports from "../Reports/Reports";
import Drafts from "../Drafts/Drafts";
import Shared from "../Shared/Shared";
import History from "../History/History";
import Profile from "../Profile/Profile";
import GenReport from "../GenReport/GenReport";
import PageNotFound from "../PageNotFound/PageNotFound";

// importing styling
import "./Landing.css";

const Landing = (props: any) => {
  console.log("User Api: " + props.userAPI);

  localStorage.removeItem("newUser");

  const logout = () => {
    //Executing logout from Landing page
    props.takeToSigninPage();
  };

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
          <Navigation logout={logout} />
        </div>

        {/* second container ######################################################################################################### */}
        <div className="flex flex-col 2xl:basis-1/2 mini-tablet:basis-2/3 basis-full relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/genReport/:id" element={<GenReport />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>

        {/* third container ######################################################################################################### */}
        <div className=" xl:flex xl:basis-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
          <div className="fixed rounded bg-gray-200 h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
            <h1 className="text-xl font-bold">Drafts to report</h1>
            <div className="w-full flex flex-col"></div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Landing;
