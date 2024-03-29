import "./styles/Splash.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import ExploreCard from "./ExploreCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Splash() {
	const [report, changeReport] = useState<any[]>([]);
	const [loading, changeLoading] = useState(true);
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getReports = async () => {
			try {
				const response = await axiosPrivate.post(
					"getAllPublishedReports",
					JSON.stringify({}),
					{ signal: controller.signal }
				);
				isMounted && changeReport(response.data);
				changeLoading(false);
			} catch (error) {
				navigate("/login", { state: { from: location }, replace: true });
			}
		};

		getReports();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [axiosPrivate, location, navigate]);

	const loadIcon = (
		<svg
			role="status"
			className="inline mr-1 w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-gray-600 dark:fill-gray-300"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill"
			/>
		</svg>
	);

	const loginHandler = () => {
		navigate("/login");
	};

	const signUpHandler = () => {
		navigate("/signup");
	};

	return (
		<div
			data-testid="splash"
			className="flex flex-row bg-white lg:ml-14 lg:mr-14 mini-tablet:ml-5 mini-tablet:mr-5 relative justify-center"
		>
			<div className="lg:w-1/5 w-20 p-2 pt-5 flex-col hidden mini-tablet:block h-screen border-r">
				<div>
					<Logo width="136px" height="121px" page="login" />
				</div>

				<br />

				<div>
					<h1 className="text-midnight-blue font-bold text-3xl">Welcome</h1>
				</div>

				<div>
					<div className="flex flex-row">&nbsp;</div>
					<Button text="Sign Up" size="large" handle={signUpHandler} type="signUp" />

					<br />
					<p className="text-sm ">Already have an account? </p>
					<Button text="Login" size="large" handle={loginHandler} type="login" />
				</div>
			</div>

			<div className="flex flex-col 2xl:w-2/5 mini-tablet:w-3/5 w-full relative">
				<div className=" mt-16 p-3 ">
					<div className=" mt-4">
						<h1 className="text-midnight-blue font-bold text-3xl">Latest Reports</h1>

						<div className="mt-4 flex flex-row flex-wrap justify-center">
							<div className="mt-4 flex flex-row flex-wrap justify-center">
								{loading && <div>{loadIcon}</div>}

								{!loading &&
									(report.length === 0 ? (
										<div>There are no reports at the moment </div>
									) : (
										report.map((data) => (
											<div
												data-aos="fade-up"
												data-aos-duration="500"
												className="m-4 w-auto h-auto  flex flex-col p-2"
												key={data.reportID}
											>
												<ExploreCard data={data} />
											</div>
										))
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Splash;
