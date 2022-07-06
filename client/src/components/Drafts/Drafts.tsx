import { useState } from "react";
import DraftCard from "../DraftCard/DraftCard";

// importing link
import link from "../../resources/links.json";

function Drafts() {
	const [draft, changeDraft] = useState<any[]>([]);

	// localStorage.removeItem("resultSetId");
	// localStorage.removeItem("draftReportId");

	// ######################### API FOR GETTING HISTORY #####################

	let getAllMyDraftReportsEndpoint = String(link.endpointLink);
	getAllMyDraftReportsEndpoint += "getAllMyReports";

	// using localhost
	// const getAllMyDraftReportsEndpoint = "http://localhost:4000/dev/getAllMyReports";

	const getHistory = async () => {
		const apiData = {
			apiKey: localStorage.getItem("loggedUserApi")
		};

		const requestOptions = {
			method: "POST",
			body: JSON.stringify(apiData)
		};

		fetch(getAllMyDraftReportsEndpoint, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get("content-type")?.includes("application/json");

				const data = isJson && (await response.json());

				changeDraft(await data);
				// console.log(data[0].status);

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

	//EXTRACTING REQUIRED DATA
	let newDraft = draft
		.filter(function (data) {
			return data.status === "DRAFT";
		})
		.map(function (data) {
			return data;
		});

	// if(newDraft.length !== 0){
	// 	console.log("new draft is not empty");
	// }

	return (
		<div>
			{/* Api response comes here */}
			<div className=" mt-16 p-3 border-l border-gray-200">
				<div className=" mt-4">
					<h1 className="text-3xl">Drafts</h1>

					<div className="mt-4 flex flex-row flex-wrap justify-center">
						<div className="mt-4 flex flex-row flex-wrap justify-center">
							{newDraft.map((data) => (
								<div
									className="m-4 w-auto h-auto bg-gray-400 hover:bg-gray-300 rounded-md flex flex-col p-2"
									key={data.reportID}
								>
									<DraftCard data={data} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Drafts;
