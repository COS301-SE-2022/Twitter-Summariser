import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
// import { BsShare } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";
// import { AiOutlineHistory } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
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

	const [publishStyle, changePublishStyle] = useState(pageDefault);
	const [publishStyle2, changePublishStyle2] = useState(defaultStyle);

	const [draftsStyle, changeDraftsStyle] = useState(pageDefault);
	// const [draftsStyle2, changeDraftsStyle2] = useState(defaultStyle);

	const [sharedStyle, changeSharedStyle] = useState(pageDefault);
	// const [sharedStyle2, changeSharedStyle2] = useState(defaultStyle);

	const [historyStyle, changeHistoryStyle] = useState(pageDefault);
	// const [historyStyle2, changeHistoryStyle2] = useState(defaultStyle);

	const [summStyle, changeSummStyle] = useState(pageDefault);
	const [summStyle2, changeSummStyle2] = useState(defaultStyle);

	const [profileStyle, changeProfileStyle] = useState(pageDefault);
	const [profileStyle2, changeProfileStyle2] = useState(defaultStyle);

	const [visible, changeVisible] = useState("");

	function toggleDrop() {
		if (visible === "hidden") {
			changeVisible("hidden");
			changeVisible("");
		} else {
			changeVisible("");
			changeVisible("hidden");
		}
	}

	function homeHandler() {
		changeHomeStyle(pageCurrent);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(currentStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);

		// changeVisible("");
		// changeVisible("hidden");
	}

	function exploreHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageCurrent);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(currentStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);

		// changeVisible("");
		// changeVisible("hidden");
	}

	function publishHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageCurrent);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(currentStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function draftHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageCurrent);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(currentStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function sharedHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageCurrent);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(currentStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function historyHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageCurrent);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(currentStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function summHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageCurrent);
		changeProfileStyle(pageDefault);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(currentStyle);
		changeProfileStyle2(defaultStyle);

		// changeVisible("");
		// changeVisible("hidden");
	}

	function profileHandler() {
		changeHomeStyle(pageDefault);
		changeExploreStyle(pageDefault);
		changePublishStyle(pageDefault);
		changeDraftsStyle(pageDefault);
		changeSharedStyle(pageDefault);
		changeHistoryStyle(pageDefault);
		changeSummStyle(pageDefault);
		changeProfileStyle(pageCurrent);

		changeHomeStyle2(defaultStyle);
		changeExploreStyle2(defaultStyle);
		changePublishStyle2(defaultStyle);
		// changeDraftsStyle2(defaultStyle);
		// changeSharedStyle2(defaultStyle);
		// changeHistoryStyle2(defaultStyle);
		changeSummStyle2(defaultStyle);
		changeProfileStyle2(currentStyle);

		// changeVisible("");
		// changeVisible("hidden");
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

				<CDropdown>
					<CDropdownToggle trigger="click">
						<div
							className="pt-4 flex flex-row changeColor"
							key={(3).toString()}
							onClick={toggleDrop}
						>
							<div className="items-center pt-1 ">
								<TiDocumentText style={publishStyle2} />
							</div>
							<div className={publishStyle}>&nbsp; Report</div>
						</div>
					</CDropdownToggle>
					<CDropdownMenu>
						<CDropdownItem className={visible}>
							<div
								className="pt-4 flex flex-row changeColor"
								key={(3).toString()}
								onClick={publishHandler}
							>
								<Link
									to="/reports"
									className="flex flex-row items-center"
									onClick={() => pageHandler("Published")}
								>
									{/* <div className="items-center pt-1 ">
										<TiDocumentText style={publishStyle2} />
									</div> */}
									<div className={publishStyle}>
										&nbsp; &nbsp; &nbsp;Published
									</div>
								</Link>
							</div>
						</CDropdownItem>
						<CDropdownItem className={visible}>
							<div
								className="pt-4 flex flex-row changeColor"
								key={(4).toString()}
								onClick={draftHandler}
							>
								<Link
									to="/drafts"
									className="flex flex-row items-center"
									onClick={() => pageHandler("Drafts")}
								>
									{/* <div className="items-end pt-1 ">
										<RiDraftLine style={draftsStyle2} />
									</div> */}
									<div className={draftsStyle}>&nbsp; &nbsp; &nbsp;Drafts</div>
								</Link>
							</div>
						</CDropdownItem>
						<CDropdownItem className={visible}>
							<div
								className="pt-4 flex flex-row changeColor"
								key={(5).toString()}
								onClick={sharedHandler}
							>
								<Link
									to="/shared"
									className="flex flex-row items-center"
									onClick={() => pageHandler("Shared Reports")}
								>
									{/* <div className="items-end pt-1 ">
										<BsShare style={sharedStyle2} />
									</div> */}
									<div className={sharedStyle}>&nbsp; &nbsp; &nbsp;Shared</div>
								</Link>
							</div>
						</CDropdownItem>
						<CDropdownItem className={visible}>
							<div
								className="py-4 flex flex-row changeColor"
								key={(6).toString()}
								onClick={historyHandler}
							>
								<Link
									to="/history"
									className="flex flex-row items-center"
									onClick={() => pageHandler("Search History")}
								>
									{/* <div className="items-end pt-1 ">
										<AiOutlineHistory style={historyStyle2} />
									</div> */}
									<div className={historyStyle}>&nbsp; &nbsp; &nbsp;History</div>
								</Link>
							</div>
						</CDropdownItem>
					</CDropdownMenu>
				</CDropdown>

				<div
					className="pt-2 flex flex-row changeColor"
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
