import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function Reports() {
	const [report, changeReport] = useState<any[]>([]);
	const [loading, changeLoading] = useState(true);
	const [imageURL, changeImageURL] = useState("assets/profile.png");
	const [shouldRender, changeShouldRender] = useState(false);
	const axiosPrivate = useAxiosPrivate();
	const controller = new AbortController();
	const { auth } = useAuth();

	const getReports = async (isMounted: boolean) => {
		const apiData = {
			apiKey: auth.apiKey
		};

		try {
			const response = await axiosPrivate.post(
				"getAllMyPublishedReports",
				JSON.stringify(apiData),
				{ signal: controller.signal }
			);
			isMounted && changeReport(response.data);
			isMounted && changeLoading(false);

			if (auth.profileKey !== "assets/profile.png")
				changeImageURL(
					`https://twitter-summariser-images.s3.amazonaws.com/${
						auth.profileKey
					}?${new Date().getTime()}`
				);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		let isMounted = true;
		getReports(isMounted);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	if (shouldRender === true) {
		const isMounted = true;
		getReports(isMounted);
		changeShouldRender(false);
	}

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

	// EXTRACTING REQUIRED DATA
	// let newReport = report.filter(function (data) {
	//     return data.status === "DRAFT";
	// }).map(function (data) {
	//     return data;
	// })

	// console.log(report);

	// if(newReport.length === 0){
	// 	console.log("new report is empty");
	// }

	return (
		<div data-testid="report">
			{/* Api response comes here */}
			<div className="">
				<div className=" ">
					<div className=" flex flex-row flex-wrap justify-center p-2">
						{loading && (
							<>
								<div className="mt-8 justify-center inline items-center w-full">
									{loadIcon} &nbsp; Loading My Reports
								</div>
								<div className="mt-8 pr-8 pl-8"> </div>
							</>
						)}

						{!loading &&
							(report.length === 0 ? (
								<div className="mt-8 pr-8 pl-8">
									You have no published report(s) at the moment{" "}
								</div>
							) : (
								report.map((data) => (
									<div
										data-aos="fade-up"
										data-aos-duration="500"
										className={
											report.length > 1
												? "sm:w-1/2 w-full mr-5/2"
												: "w-full mr-5/2"
										}
										key={data.reportID}
									>
										<ReportCard
											data={data}
											imageURL={imageURL}
											onChange={(value: boolean) => changeShouldRender(value)}
										/>
									</div>
								))
							))}
					</div>
				</div>
			</div>
		</div>
	);

	// const [enteredSearch, changeEnteredSearch] = useState("");

	// const searchHandler = (event: any) => {
	// 	changeEnteredSearch(event.target.value);
	// };

	// return (
	// 	<div data-testid="report">
	// 		{/* search */}
	// 		<div className="flex justify-center p-2 border-l border-r border-b border-gray-200">
	// 			<div className="w-3/4 mb-3">
	// 				<input
	// 					data-testid="search"
	// 					type="search"
	// 					className="
	//               nosubmit
	//               w-full
	//               px-3
	//               py-1.5
	//               text-lg
	//               font-normal
	//               text-gray-700
	//               bg-clip-padding
	//               border border-solid border-gray-300
	//               rounded-lg
	//               focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
	//               bg-gray-200
	//             "
	// 					value={enteredSearch}
	// 					onChange={searchHandler}
	// 					placeholder="search your published report..."
	// 				/>
	// 			</div>
	// 		</div>

	// 		{/* Api response comes here */}
	// 		<div data-testid="reports" className=" mt-4">
	// 			{enteredSearch !== "" && <h1 className="text-2xl">Search results....</h1>}

	// 			<div className="mt-4 flex flex-row flex-wrap justify-center">
	// 				{tweeter.myReports.map(
	// 					(data) =>
	// 						data.title.toLowerCase().match(enteredSearch.toLowerCase()) &&
	// 						enteredSearch !== "" && (
	// 							<div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
	// 								<div className="">
	// 									<button type="submit">
	// 										<p className="font-bold">{data.title}</p>
	// 									</button>
	// 								</div>
	// 								<div className="mt-2">
	// 									<p className="italic text-xs">{data.name}</p>
	// 								</div>
	// 								<div className="">
	// 									<p className="italic text-xs">{data.date}</p>
	// 								</div>
	// 							</div>
	// 						)
	// 				)}
	// 			</div>

	// 			{enteredSearch === "" && (
	// 				<div className=" mt-4">
	// 					<h1 className="text-2xl">My Reports</h1>

	// 					<div className="mt-4 flex flex-row flex-wrap justify-center">
	// 						{tweeter.myReports.map((data) => (
	// 							<div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
	// 								<div className="">
	// 									<button type="submit">
	// 										<p className="font-bold">{data.title}</p>
	// 									</button>
	// 								</div>
	// 								<div className="mt-2">
	// 									<p className="italic text-xs">{data.name}</p>
	// 								</div>
	// 								<div className="">
	// 									<p className="italic text-xs">{data.date}</p>
	// 								</div>
	// 							</div>
	// 						))}
	// 					</div>
	// 				</div>
	// 			)}
	// 		</div>
	// 	</div>
	// );
}

export default Reports;
