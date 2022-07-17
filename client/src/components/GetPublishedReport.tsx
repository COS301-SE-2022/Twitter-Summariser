import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../resources/links.json";
import Button from "./Button";

// importing mock data
import PublishedText from "./PublishedText";

function GetPublishedReport() {
    const navigate = useNavigate();

    const [state, setState] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [stat, setStat] = useState("");

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
            reportID: localStorage.getItem("reportId")
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(requiredData),
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        };

        fetch(getReportEndpoint, requestOptions).then(async (response) => {
            const isJson = response.headers.get("content-type")?.includes("application/json");

            const data = isJson && (await response.json());

            setStat(data.report.status);

            setState(data.report.Report);
            setTitle(data.report.title);
            setAuthor(data.report.author);
            setDate(data.report.dateCreated.substring(0, 16));
        });
    };

    // console.log(state);

    getRep();

    // ######################### API FOR UNPUBLISHING REPORT ###############################################

    let unpublishEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);

    unpublishEndpoint += "unpublishReport";

    const unpublishReport = (resultInfo: any) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(resultInfo),
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        };

        fetch(unpublishEndpoint, requestOptions).then(async (response) => {
            response.headers.get("content-type")?.includes("application/json");

            // isJson && (await response.json());
        });

        navigate("/genReport");
    };

    // #######################################################################
    // const unpublishHandler = (event: any) => {
    const unpublishHandler = (event: any) => {
        // event.preventDefault();

        unpublishReport(requiredData);
        let reportId = String(localStorage.getItem("reportId"));
        localStorage.setItem("draftReportId", reportId);
    };
    // console.log(state);

    // processing api response
    const apiResponse = [<div key="begining div" />];

    state.map((data: any, index: number) =>
        apiResponse.push(
            <div className="" key={data.position}>
                {data.blockType === "RICHTEXT" && (
                    <div className="">
                        {" "}
                        <PublishedText keyValue={index} data={data} status={stat} />{" "}
                    </div>
                )}

                {data.blockType === "TWEET" && (
                    <div className=" w-full border border-gray-200 p-3" key={data.position}>
                        <Tweet
                            options={{ align: "center", width: "" }}
                            tweetId={data.block.tweetID}
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
            <div className="flex justify-center mb-4">
                <Link to="/genReport">
                    <Button
                        text="Unpublish Report"
                        size="large"
                        handle={unpublishHandler}
                        type="unpublish"
                    />
                </Link>
            </div>
        </div>
    );
}

export default GetPublishedReport;
