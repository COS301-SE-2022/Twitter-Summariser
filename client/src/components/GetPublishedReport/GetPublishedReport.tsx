import { useState } from "react";

import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

// importing mock data
import Text from "../Text/Text";

function GetPublishedReport() {
    const [state, setState] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");

    // ################ API FOR GETTING REPORT ###########################

    let getReportEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);
    getReportEndpoint += "getReport";

    let requiredData: { apiKey: string | null; reportID: string | null };

    const getRep = async () => {
        // POST request using fetch with error handling
        requiredData = {
            apiKey: localStorage.getItem("key"),
            reportID: localStorage.getItem("draftReportId")
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(requiredData)
        };

        fetch(getReportEndpoint, requestOptions).then(async (response) => {
            const isJson = response.headers.get("content-type")?.includes("application/json");

            const data = isJson && (await response.json());

            // console.log(data);

            setState(data.report.Report);
            setTitle(data.report.title);
            setAuthor(data.report.author);
            setDate(data.report.dateCreated.substring(0, 16));
        });
    };

    getRep();

    // processing api response
    const apiResponse = [<div key="begining div" />];

    state.map((data: any, index: number) =>
        apiResponse.push(
            <div className="" key={data.position}>
                {data.blockType === "RICHTEXT" && (
                    <div className="">
                        {" "}
                        <Text keyValue={index} data={data} />{" "}
                    </div>
                )}

                {data.blockType === "TWEET" && (
                    <div className=" w-full border border-gray-200 p-3" key={data.position}>
                        <Tweet
                            options={{ align: "center", width: "" }}
                            tweetId={data.block.tweetId}
                        />
                    </div>
                )}
            </div>
        )
    );

    return (
        <div className="mt-16 ">
            <div className="p-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <br />
                <h2 className="italic font-bold">Created By: {author}</h2>
                <h3 className="italic text-xs">Date Created: {date}</h3>
            </div>

            <br />

            <div className="grid grid-cols gap-4 content-center">{apiResponse}</div>
        </div>
    );
}

export default GetPublishedReport;
