import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";

import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

	const [draftsStyle, changeDraftsStyle] = useState(pageDefault);

	const [sharedStyle, changeSharedStyle] = useState(pageDefault);

	const [historyStyle, changeHistoryStyle] = useState(pageDefault);

	const [summStyle, changeSummStyle] = useState(pageDefault);
	const [summStyle2, changeSummStyle2] = useState(defaultStyle);

	const [profileStyle, changeProfileStyle] = useState(pageDefault);
	const [profileStyle2, changeProfileStyle2] = useState(defaultStyle);

	const [reportH, setReportH] = useState(false);

	const [reportStyle, changeReportStyle] = useState("hidden lg:block");
	const [reportStyle2, changeReportStyle2] = useState(defaultStyle);

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
		changeReportStyle2(defaultStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);

		setReportH(false);
		changeReportStyle("hidden lg:block");
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
		changeReportStyle2(defaultStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);

		setReportH(false);
		changeReportStyle("hidden lg:block");
	}

	function publishHandler() {
		setReportH(true);
		changeReportStyle("hidden lg:block text-blue-800");

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
		changeReportStyle2(currentStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function draftHandler() {
		setReportH(true);
		changeReportStyle("hidden lg:block text-blue-800");
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
		changeReportStyle2(currentStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function sharedHandler() {
		setReportH(true);
		changeReportStyle("hidden lg:block text-blue-800");
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
		changeReportStyle2(currentStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function historyHandler() {
		setReportH(true);
		changeReportStyle("hidden lg:block text-blue-800");
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
		changeReportStyle2(currentStyle);

		changeSummStyle2(defaultStyle);
		changeProfileStyle2(defaultStyle);
	}

	function summHandler() {
		setReportH(false);
		changeReportStyle("hidden lg:block");

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
		changeReportStyle2(defaultStyle);

		changeSummStyle2(currentStyle);
		changeProfileStyle2(defaultStyle);
	}

	function profileHandler() {
		setReportH(false);
		changeReportStyle("hidden lg:block");

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
		changeReportStyle2(defaultStyle);
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
					key={(2).toString()}
					onClick={exploreHandler}
				>
					<Link
						to="/something"
						className="flex flex-row items-center"
						onClick={() => pageHandler("something")}
					>
						<div className="items-end pt-1 ">
							<BiHash style={exploreStyle2} />
						</div>
						<div className={exploreStyle}>&nbsp; something</div>
					</Link>
				</div>

				<Menu as="div" className="relative">
					<div className="changeColor" key={(3).toString()}>
						<Menu.Button className=" flex flex-row justify-center bg-white py-2 pt-4 items-center">
							<div className="items-end">
								<TiDocumentText style={reportStyle2} />
							</div>
							<div className={reportStyle}>&nbsp; Report</div>

							<ChevronDownIcon
								className={`-mr-1 ml-2 h-5 w-5 ${reportH && " text-blue-800"}`}
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute left-2 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="flex flex-col items-center justify-center py-1">
								<Menu.Item>
									{() => (
										<div
											className="pt-4 flex flex-row changeColor"
											key={(3).toString()}
										>
											<Link
												to="/reports"
												className="flex flex-row items-center"
												onClick={() => pageHandler("Published")}
											>
												{/* <div className="items-center pt-1 ">
													<TiDocumentText style={publishStyle2} />
												</div> */}
												<div
													className={publishStyle}
													onClick={publishHandler}
												>
													Published
												</div>
											</Link>
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{() => (
										<div
											className="pt-4 flex flex-row changeColor"
											key={(4).toString()}
										>
											<Link
												to="/drafts"
												className="flex flex-col items-center justify-center"
												onClick={() => pageHandler("Drafts")}
											>
												{/* <div className="items-end pt-1 ">
										<RiDraftLine style={draftsStyle2} />
									</div> */}
												<div className={draftsStyle} onClick={draftHandler}>
													Drafts
												</div>
											</Link>
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{() => (
										<div
											className="pt-4 flex flex-row changeColor"
											key={(5).toString()}
										>
											<Link
												to="/shared"
												className="flex flex-row items-center"
												onClick={() => pageHandler("Shared Reports")}
											>
												{/* <div className="items-end pt-1 ">
										<BsShare style={sharedStyle2} />
									</div> */}
												<div
													className={sharedStyle}
													onClick={sharedHandler}
												>
													Shared
												</div>
											</Link>
										</div>
									)}
								</Menu.Item>
								<form method="POST" action="#">
									<Menu.Item>
										{() => (
											<div
												className="py-4 flex flex-row changeColor"
												key={(6).toString()}
											>
												<Link
													to="/history"
													className="flex flex-row items-center"
													onClick={() => pageHandler("Search History")}
												>
													{/* <div className="items-end pt-1 ">
										<AiOutlineHistory style={historyStyle2} />
									</div> */}
													<div
														className={historyStyle}
														onClick={historyHandler}
													>
														History
													</div>
												</Link>
											</div>
										)}
									</Menu.Item>
								</form>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>

				{/* <button
					id="dropdownDefault"
					data-dropdown-toggle="dropdown"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
				>
					Dropdown button
				</button> */}
				{/* <!-- Dropdown menu --> */}
				{/* <div
					id="dropdown"
					className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dropdownStyle"
					data-popper-reference-hidden=""
					data-popper-escaped=""
					data-popper-placement="bottom"
				>
					<ul
						className="py-1 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownDefault"
					>
						<li>
							<a
								href=" "
								className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={publishHandler}
							>
								Publish
							</a>
						</li>
						<li>
							<a
								href=" "
								className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={draftHandler}
							>
								Draft
							</a>
						</li>
						<li>
							<a
								href=" "
								className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={sharedHandler}
							>
								Shared
							</a>
						</li>
						<li>
							<a
								href=" "
								className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={historyHandler}
							>
								History
							</a>
						</li>
					</ul>
				</div> */}

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
