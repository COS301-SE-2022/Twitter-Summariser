import { useState } from "react";
import ReportCard from "../ReportCard/ReportCard";
// importing mock data
// import tweeter from "../../mock.json";

// importing link
import link from "../../resources/links.json";

function Explore() {
	const [report, changeReport] = useState<any[]>([]);

	// ######################### API FOR GETTING HISTORY #####################

    let getAllReportsEndpoint = process.env.NODE_ENV === 'development' ? String(link.localhostLink) : String(link.serverLink);
    getAllReportsEndpoint += "getAllPublishedReports";

    // using localhost
    // const getAllMyDraftReportsEndpoint = "http://localhost:4000/dev/getAllMyReports";

    const getReports = async () => {
        const apiData = {}; //empty json

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(apiData)
        };

        fetch(getAllReportsEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");

                const data = isJson && (await response.json());

                changeReport(await data);

                // check for error response
                if (!response.ok) {
                    // error
                }
            })
            .catch(() => {
                // console.log("Error Getting History");
            });
    };

    getReports();

    // #######################################################################


		if(report.length === 0){
			console.log("empty array");
		}

	return (
		 <div data-testid="report">
            {/* Api response comes here */}
            <div className=" mt-16 p-3 border-l border-gray-200">
                <div className=" mt-4">
                    <h1 className="text-3xl">Explore</h1>

                    <div className="mt-4 flex flex-row flex-wrap justify-center">
                        <div data-testid="reports" className="mt-4 flex flex-row flex-wrap justify-center">
                            {report.map((data) => (
                                <div
                                    className="m-4 w-auto h-auto bg-gray-400 hover:bg-gray-300 rounded-md flex flex-col p-2"
                                    key={data.reportID}
                                >
                                    <ReportCard data={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

		// <div>
		// 	{/* search */}
		// 	<div className="flex justify-center p-2 border-l border-r border-b border-gray-200">
		// 		<div className="w-3/4 mb-3">
		// 			<input
		// 				type="search"
		// 				className="
    //             nosubmit
    //             w-full
    //             px-3
    //             py-1.5
    //             text-lg
    //             font-normal
    //             text-gray-700
    //             bg-clip-padding
    //             border border-solid border-gray-300
    //             rounded-lg
    //             focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
    //             bg-gray-200
    //           "
		// 				value={enteredSearch}
		// 				onChange={searchHandler}
		// 				placeholder="search twitter summarizer..."
		// 			/>
		// 		</div>
		// 	</div>

		// 	{/* Api response comes here */}
		// 	<div className=" mt-4">
		// 		{enteredSearch !== "" && <h1 className="text-2xl">Search results....</h1>}

		// 		<div className="mt-4 flex flex-row flex-wrap justify-center">
		// 			{tweeter.explore.map(
		// 				(data) =>
		// 					data.title.toLowerCase().match(enteredSearch.toLowerCase()) &&
		// 					enteredSearch !== "" && (
		// 						<div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
		// 							<div className="">
		// 								<button type="submit">
		// 									<p className="font-bold">{data.title}</p>
		// 								</button>
		// 							</div>
		// 							<div className="mt-2">
		// 								<p className="italic text-xs">{data.name}</p>
		// 							</div>
		// 							<div className="">
		// 								<p className="italic text-xs">{data.date}</p>
		// 							</div>
		// 						</div>
		// 					)
		// 			)}
		// 		</div>

		// 		{enteredSearch === "" && (
		// 			<div className=" mt-4 p-3">
		// 				<h1 className="text-2xl">Explore</h1>

		// 				<div className="mt-4 flex flex-row flex-wrap justify-center">
		// 					{tweeter.explore.map((data) => (
		// 						<div
		// 							className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2"
		// 							key={data.date}
		// 						>
		// 							<div className="">
		// 								<button type="submit">
		// 									<p className="font-bold">{data.title}</p>
		// 								</button>
		// 							</div>
		// 							<div className="mt-2">
		// 								<p className="italic text-xs">{data.name}</p>
		// 							</div>
		// 							<div className="">
		// 								<p className="italic text-xs">{data.date}</p>
		// 							</div>
		// 						</div>
		// 					))}
		// 				</div>
		// 			</div>
		// 		)}
		// 	</div>
		// </div>
	);
}

export default Explore;
