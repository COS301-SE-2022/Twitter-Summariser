import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { AiOutlineHistory } from "react-icons/ai";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import "./styles/Navigation.css";

function Navigation() {
	const { auth } = useAuth();
	const logout = useLogout();
	const navigate = useNavigate();

	const defaultStyle = { fontSize: "1.5rem" };
	const currentStyle = { fontSize: "1.5rem", color: "rgb(30 64 175)" };

	const pageHandler = (prop: string) => {
		localStorage.setItem("page", prop);
	};

	const signOut = async () => {
		await logout();
		auth.accessToken = undefined;
		localStorage.clear();
		navigate("/login");
	};

	const pageDefault = "hidden lg:block";
	const pageCurrent = "hidden lg:block text-blue-800";

	const [homeStyle, changeHomeStyle] = useState(pageCurrent);
	const [homeStyle2, changeHomeStyle2] = useState<any>(currentStyle);

	const [exploreStyle, changeExploreStyle] = useState(pageDefault);
	const [exploreStyle2, changeExploreStyle2] = useState(defaultStyle);

	const [historyStyle, changeHistoryStyle] = useState(pageDefault);
	const [historyStyle2, changeHistoryStyle2] = useState(defaultStyle);

	const [summStyle, changeSummStyle] = useState(pageDefault);
	const [summStyle2, changeSummStyle2] = useState(defaultStyle);

	const [profileStyle, changeProfileStyle] = useState(pageDefault);
	const [profileStyle2, changeProfileStyle2] = useState(defaultStyle);

	const [reportStyle, changeReportStyle] = useState("hidden lg:block");
	const [reportStyle2, changeReportStyle2] = useState(defaultStyle);

	function homeHandler() {
		changeHomeStyle(pageCurrent);
		changeExploreStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(currentStyle);
		changeExploreStyle2(defaultStyle);
		changeReportStyle2(defaultStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
		changeHistoryStyle2(defaultStyle);

		changeReportStyle("hidden lg:block");
	}

	function exploreHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageCurrent);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);
		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(currentStyle);
		changeReportStyle2(defaultStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
		changeHistoryStyle2(defaultStyle);

		changeReportStyle("hidden lg:block");
	}

	function publishHandler() {
		changeReportStyle("hidden lg:block text-blue-800");

		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);

		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changeReportStyle2(currentStyle);
		changeHistoryStyle2(defaultStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function historyHandler() {
		changeReportStyle(pageDefault);
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);

		changeHistoryStyle(pageCurrent);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changeReportStyle2(defaultStyle);
		changeHistoryStyle2(currentStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function summHandler() {
		changeReportStyle("hidden lg:block");

		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);

		changeHistoryStyle(pageDefault);
		changeSummStyle(pageCurrent);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changeReportStyle2(defaultStyle);
		changeHistoryStyle2(defaultStyle);

		changeSummStyle2(currentStyle);
		changeProfileStyle2(defaultStyle);
	}

	function profileHandler() {
		changeReportStyle("hidden lg:block");

		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);

		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageCurrent);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changeReportStyle2(defaultStyle);
		changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(currentStyle);
	}

	return (
		<div className="text-2xl fixed top-20 mt-5 w-auto 2xl:ml-14 xl:ml-3 md:ml-5">
			<nav>
				<div
					className="pt-4 flex flex-row changeColor"
					key={(1).toString()}
					onClick={homeHandler}
				>
					<Link
						to="/"
						className="flex flex-row items-center"
						onClick={() => pageHandler("Home")}
					>
						<div className="items-end pt">
							<GoHome style={homeStyle2} />
							{/* <GoHome /> */}
						</div>
						<div className={homeStyle}>&nbsp; Home</div>
					</Link>
				</div>

				<div
					className="pt-4 flex flex-row changeColor"
					key={(2).toString()}
					onClick={exploreHandler}
				>
					<Link
						to="/explore"
						className="flex flex-row items-center"
						onClick={() => pageHandler("Explore")}
					>
						<div className="items-end pt-1 ">
							<BiHash style={exploreStyle2} />
						</div>
						<div className={exploreStyle}>&nbsp; Explore</div>
					</Link>
				</div>

				<div
					className="pt-4 flex flex-row changeColor"
					key={(3).toString()}
					onClick={publishHandler}
				>
					<Link
						to="/allReports"
						className="flex flex-row items-center"
						onClick={() => pageHandler("something")}
					>
						<div className="items-end">
							<TiDocumentText style={reportStyle2} />
						</div>
						<div className={reportStyle}>&nbsp; Report</div>
					</Link>
				</div>

				<div
					className="pt-4 flex flex-row changeColor"
					key={(6).toString()}
					onClick={historyHandler}
				>
					<Link
						to="/history"
						className="flex flex-row items-center"
						onClick={() => pageHandler("Search History")}
					>
						<div className="items-end">
							<AiOutlineHistory style={historyStyle2} />
						</div>
						<div className={historyStyle}>&nbsp; History</div>
					</Link>
				</div>

				<div
					className="pt-4 flex flex-row changeColor"
					key={(7).toString()}
					onClick={summHandler}
				>
					<Link
						to="/summariser"
						className="flex flex-row items-center"
						onClick={() => pageHandler("Text Summarisation")}
					>
						<div className="items-end pt-1 ">
							<RiDraftLine style={summStyle2} />
						</div>
						<div className={summStyle}>&nbsp; Summariser</div>
					</Link>
				</div>

				<div
					className="pt-4 flex flex-row changeColor"
					key={(8).toString()}
					onClick={profileHandler}
				>
					<Link
						to="/profile"
						className="flex flex-row items-center"
						onClick={() => pageHandler("Profile")}
					>
						<div className="items-end pt-1 ">
							<CgProfile style={profileStyle2} />
						</div>
						<div className={profileStyle}>&nbsp; Profile</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row items-end changeColor">
					<button type="submit" className="flex flex-row" onClick={signOut}>
						<div className="items-end pt-1 ">
							<HiOutlineLogin style={defaultStyle} />
						</div>
						<div className="hidden lg:block">&nbsp; Logout</div>
					</button>
				</div>
			</nav>
		</div>
	);
}

export default Navigation;
