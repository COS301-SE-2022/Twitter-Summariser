import React from "react";
import NavBar from "../components/common-components/NavBar";
import SearchBar from "../components/common-components/SearchBar";
import DraftReports from "../components/landing-components/DraftReports";
import LandingBody from "../components/landing-components/LandingBody";
import LandingHeader from "../components/landing-components/LandingHeader";

const LandingPage = () => {

  return (
    <div className="landing-page-container">
      <LandingHeader/>
      <SearchBar/>
      <NavBar/>
      <LandingBody/>
      <DraftReports/>
    </div>

  )
}

export default LandingPage;
