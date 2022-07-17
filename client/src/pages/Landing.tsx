import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavigation from "../components/MobileNavigation";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import "./styles/Landing.css";

function Landing() {
    const navigate = useNavigate();

    const logout = () => {

    };

    const [mobileClick, changeMobileClick] = useState(false);

    const mobileClickHandler = () => {
        changeMobileClick(!mobileClick);
    };

    // style for the icons
    const style = { fontSize: "1.5rem" };

    let iconStyle = "flex fixed justify-start z-20 w-full h-screen unclicked ";

    if (mobileClick) {
        iconStyle = "flex fixed justify-start z-20 w-full h-screen unclicked clicked";
    } else {
        iconStyle = "flex fixed justify-start z-20 w-full h-screen unclicked ";
    }

    return (
        <div
            data-testid="landing"
            className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center"
        >
            <div className="items-center border-b mini-tablet:hidden flex flex-row fixed top-0 left-0 right-0 w-full justify-between mb-8 h-14 bg-white text-black z-10 pl-4 p-2">
                <button type="button" onClick={mobileClickHandler}>
                    <GiHamburgerMenu style={style} className="items-center" />
                </button>
                <strong>{localStorage.getItem("page")}</strong>
                <div>
                    <Logo width="50" height="50" page="login" />
                </div>
            </div>
            <div className={iconStyle}>
                <div className="w-3/5 bg-white z-20 flex items-center shadow-2xl shadow-black/75 ">
                    <MobileNavigation
                        logout={logout}
                        className="z-20"
                        handle={mobileClickHandler}
                        navState={mobileClick}
                    />
                </div>
                <button
                    type="button"
                    className="w-2/5 z-20 opacity-75 bg-slate-400"
                    onClick={mobileClickHandler}
                >
                    {" "}
                </button>
                {/* <div className="w-1/4"></div> */}
            </div>

            {/* first container ######################################################################################################### */}
            <div className="lg:w-1/5 w-20 p-2 pt-5 flex-col hidden mini-tablet:block h-screen">
                {/* logo comes here */}
                <Logo width="60.69px" height="54px" page="landing" />

                {/* Navigation */}
                <Navigation logout={logout} />
            </div>

            {/* second container ######################################################################################################### */}
            <div className="flex flex-col 2xl:w-2/5 mini-tablet:w-2/5 w-full border-l border-r relative">
                <Outlet />
            </div>

            {/* third container ######################################################################################################### */}
            <div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
                <div className="fixed rounded bg-gray-200 h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
                    <h1 className="text-xl font-bold">Drafts to report</h1>
                    <div className="w-full flex flex-col" />
                </div>
            </div>
        </div >
    );
}

export default Landing;
