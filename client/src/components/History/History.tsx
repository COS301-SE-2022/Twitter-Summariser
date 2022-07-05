import { useState } from "react";
import HistoryCard from "../HistoryCard/HistoryCard";

// importing link
import link from "../../resources/links.json";

function History() {
	// localStorage.removeItem("resultSetId");
	// localStorage.removeItem("draftReportId");

	const [history, changeHistory] = useState<any[]>([]);

	// ######################### API FOR GETTING HISTORY #####################

	let getAllResultSetEndpoint = String(link.endpointLink);
	getAllResultSetEndpoint += "getAllResultSet";

	// using localhost
	// const getAllResultSetEndpoint = "http://localhost:4000/dev/getAllResultSet";

	const getHistory = async () => {
		const apiData = {
			apiKey: localStorage.getItem("loggedUserApi")
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(apiData)
		};

		fetch(getAllResultSetEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				changeHistory(await data);

				// check for error response
				if (!response.ok) {
					// error
				}
			})
			.catch(() => {
				// console.log("Error Getting History");
			});
	};

	getHistory();

	// #######################################################################

	return (
		<div>
			{/* Api response comes here */}
			<div className=" mt-16 p-3">
				<div className=" mt-4">
					<h1 className="text-3xl">Search Result History</h1>

					<div className="mt-4 flex flex-row flex-wrap justify-center">
						<div className="mt-4 flex flex-row flex-wrap justify-center">
							{history.map((data) => (
								<div
									className="m-4 w-auto h-auto bg-gray-400 rounded-md flex flex-col p-2"
									key={data}
								>
									<HistoryCard data={data} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default History;
