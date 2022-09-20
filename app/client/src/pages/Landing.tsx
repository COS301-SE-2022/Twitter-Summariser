import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import MobileNavigation from "../components/MobileNavigation";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
import "./styles/Landing.css";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

import { ScrollToTop } from "../components/scroll/ScrollToTop";
import FAB from "../components/FAB";
import NotificationsProvider from "../context/NotificationsContext";

function Landing() {
	const { auth } = useAuth();
	const logout = useLogout();
	const navigate = useNavigate();
	const location = useLocation();
	const locationURL = location.pathname;

	if (locationURL.match("/report/") && localStorage.getItem("page") === "Home")
		localStorage.setItem("page", "Published Report");
	else if (locationURL === "/") localStorage.setItem("page", "Home");
	else if (locationURL === "/explore") localStorage.setItem("page", "Explore");
	else if (locationURL === "/profile") localStorage.setItem("page", "Profile");
	else if (locationURL === "/reports") localStorage.setItem("page", "Published Reports");
	else if (locationURL === "/drafts") localStorage.setItem("page", "Draft Reports");
	else if (locationURL === "/shared") localStorage.setItem("page", "Shared Reports");
	else if (locationURL === "/history") localStorage.setItem("page", "Search History");
	else if (locationURL === "/allReports") localStorage.setItem("page", "Reports");
	else if (locationURL === "/summariser") localStorage.setItem("page", "Text Summarisation");
	else if (locationURL.match("/report/") && localStorage.getItem("page") === "Draft Reports")
		localStorage.setItem("page", "Draft Report");
	else if (locationURL.match("/report/") && localStorage.getItem("page") === "Published Reports")
		localStorage.setItem("page", "Published Report");
	else if (locationURL.match("/report/") && localStorage.getItem("page") === "Shared Reports")
		localStorage.setItem("page", "Shared Report");
	else if (locationURL.match("/report/") && localStorage.getItem("page") === "Explore")
		localStorage.setItem("page", "Published Report");
	else if (locationURL === "/viewHistory") localStorage.setItem("page", "Search Result");

	const signOut = async () => {
		await logout();
		auth.accessToken = undefined;
		localStorage.clear();
		navigate("/login");
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
						logout={signOut}
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
			<div className="w-1/6 pt-5 flex-col hidden mini-tablet:block h-screen">
				{/* logo comes here */}
				<Logo width="60.69px" height="54px" page="landing" />

				{/* Navigation */}
				<Navigation />
			</div>

			{/* second container ######################################################################################################### */}
			<div className="flex flex-col 2xl:w-2/5 mini-tablet:w-2/5 w-full border-l border-r relative">
				<Outlet />
				<ScrollToTop />
			</div>


			<NotificationsProvider>
			{/* third container ######################################################################################################### */}
			<div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
				
					<Notifications />
				
				
			</div>
			<Toaster />

			<FAB/>
			</NotificationsProvider>
		</div>
	);
}

export default Landing;
