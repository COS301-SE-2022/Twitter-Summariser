import { useState } from "react";
import HistoryCard from "../HistoryCard/HistoryCard";

function History() {
	// localStorage.removeItem("resultSetId");
	// localStorage.removeItem("draftReportId");

	const [history, changeHistory] = useState<any[]>([]);

	// ######################### API FOR GETTING HISTORY #####################

	const getAllResultSetEndpoint =
		"https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getAllResultSet";

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
