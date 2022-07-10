import { useState } from "react";
import SharedCard from "../SharedCard/SharedCard";
// importing mock data
// import tweeter from "../../mock.json";

// importing link
import link from "../../resources/links.json";

function Shared() {
	const [report, changeReport] = useState<any[]>([]);

	// ######################### API FOR GETTING HISTORY #####################

    let getAllSharedReportsEndpoint = process.env.NODE_ENV === 'development' ? String(link.localhostLink) : String(link.serverLink);
    getAllSharedReportsEndpoint += "getSharedReport";

    // using localhost
    // const getAllMyDraftReportsEndpoint = "http://localhost:4000/dev/getAllMyReports";

    const getSharedReports = async () => {
        const apiData = {
            apiKey: localStorage.getItem("key")
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(apiData)
        };

        fetch(getAllSharedReportsEndpoint, requestOptions)
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

    getSharedReports();

    // #######################################################################


		//if(report.length === 0){
		//	console.log("empty array");
		//}

	return (
		 <div data-testid="shared">
            {/* Api response comes here */}
            <div className=" mt-16 p-3 border-l border-gray-200">
                <div className=" mt-4">
                    <h1 className="text-3xl">Shared With Me</h1>

                    <div className="mt-4 flex flex-row flex-wrap justify-center">
                        <div data-testid="reports" className="mt-4 flex flex-row flex-wrap justify-center">
                            {report.map((data) => (
                                <div
                                    className="m-4 w-auto h-auto bg-gray-400 hover:bg-gray-300 rounded-md flex flex-col p-2"
                                    key={data.reportID}
                                >
                                    <SharedCard data={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Shared;

