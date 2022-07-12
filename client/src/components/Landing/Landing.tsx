import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
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
import GetPublishedReport from "../GetPublishedReport/GetPublishedReport";

// importing styling
import "./Landing.css";
import ViewHistory from "../ViewHistory/ViewHistory";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import ProtectedRoutes from "../../auth/ProtectedRoutes";

function Landing(props: any) {
	localStorage.removeItem("newUser");

	const logout = () => {
		// Executing logout from Landing page
		props.takeToSigninPage();
	};

	const [mobileClick, changeMobileClick] = useState(false);

	const mobileClickHandler = () => {
		changeMobileClick(!mobileClick);
	};

	// style for the icons
	const style = { fontSize: "1.5rem" };

	let iconStyle = "flex fixed justify-start z-20 w-full h-screen unclicked ";

	if (mobileClick) {
		iconStyle = "flex fixed justify-start z-20 w-full h-screen unclicked clicked ";
	} else {
		iconStyle = "flex fixed justify-start z-20 w-full h-screen unclicked ";
	}

	return (
		<BrowserRouter>
			<div
				data-testid="landing"
				className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center"
			>
				<div className="items-center mini-tablet:hidden flex flex-row fixed top-0 left-0 right-0 w-full justify-between mb-8 h-14 bg-white text-black z-10 pl-4 p-2">
					<button type="button" onClick={mobileClickHandler}>
						<GiHamburgerMenu style={style} className="items-center" />
					</button>
					<strong>{localStorage.getItem("page")}</strong>
					<div>
						<Logo width="60.69px" height="54px" page="login" />
					</div>
				</div>
				<div className={iconStyle}>
					<div className="w-3/5 bg-white z-20 flex items-center shadow-2xl shadow-black/75">
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
					<Routes>
						<Route element={<ProtectedRoutes />}>
							<Route path="/" element={<Home />} />
							<Route path="/explore" element={<Explore />} />
							<Route path="/reports" element={<Reports />} />
							<Route path="/drafts" element={<Drafts />} />
							<Route path="/shared" element={<Shared />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/genReport" element={<GenReport />} />
							<Route path="/getPublishedReport" element={<GetPublishedReport />} />
							<Route path="*" element={<PageNotFound />} />
							<Route path="/history" element={<History />} />
							<Route path="/viewHistory" element={<ViewHistory />} />
						</Route>
					</Routes>
				</div>

				{/* third container ######################################################################################################### */}
				<div className=" xl:flex xl:w-1/4 xl:p-2 xl:pt-5 xl:relative xl:mr-14 hidden">
					<div className="fixed rounded bg-gray-200 h-2/3 ml-8 p-5 2xl:w-80 xl:w-64 ">
						<h1 className="text-xl font-bold">Drafts to report</h1>
						<div className="w-full flex flex-col" />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default Landing;
