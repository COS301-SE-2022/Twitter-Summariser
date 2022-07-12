import { useState } from "react";
// import Tweet from "../Tweet/Tweet";
import { Link } from "react-router-dom";
// import HomeTweet from "../HomeTweet/HomeTweet";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

function Home() {
    // ################ all related to the search ############################d
    const [enteredSearch, changeEnteredSearch] = useState("");
    const [resultSet, changeResultSet] = useState("");
    const [date, changeDate] = useState("");
    const [genReport, changeGenReport] = useState("");

    const searchHandler = (event: any) => {
        changeEnteredSearch(event.target.value);
    };

    const [clicked, changeClicked] = useState(false);
    const [createTitle, changeCreateTitle] = useState("");

    // ################ API FOR GENERATE REPORT ###########################

    let genReportEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);
    genReportEndpoint += "generateReport";

    // using localhost
    // const genReportEndpoint = "http://localhost:4000/dev/generateReport";

    const genRep = async () => {
        const searchData = {
            apiKey: localStorage.getItem("key"),
            author: localStorage.getItem("username"),
            resultSetID: resultSet
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(searchData)
        };

        fetch(genReportEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");

                const data = isJson && (await response.json());

                // console.log(data);

                if (!response.ok) {
                    // error

                    return;
                }

                changeDate(await data.Report.dateCreated.substring(0, 10));
                changeGenReport(data.Report.reportID);

                if (enteredSearch !== "") {
                    changeCreateTitle(enteredSearch);
                    changeEnteredSearch("");
                    changeClicked(true);
                }
            })
            .catch(() => {
                // console.log("Error Generating Report");
            });
    };

    // ###################################################################

    // extra search function sort, filter, number of tweets to collect
    const [searchResponse, changeResponse] = useState<any[]>([]);
    const [noOfTweets, changeNoOfTweets] = useState(10);
    const [sort, changeSort] = useState("-");
    const [filter, changeFilter] = useState("-");

    const tweetHandler = (event: any) => {
        changeNoOfTweets(event.target.value);
    };

    const sortHandler = (event: any) => {
        changeSort(event.target.value);
    };

    const filterHandler = (event: any) => {
        changeFilter(event.target.value);
    };

    // ######################### API FOR SEARCHING ###############################################

    let searchEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);

    searchEndpoint += "searchTweets";

    const searchTwitter = async (searchData: any) => {
        // POST request using fetch with error handling
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(searchData)
        };

        fetch(searchEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");

                const data = isJson && (await response.json());

                changeResultSet(await data.resultSetID);
                changeResponse(await data.tweets);

                // check for error response
                if (!response.ok) {
                    // error
                }
            })
            .catch(() => {
                // console.log("Error Searching");
            });
    };

    // #######################################################################

    // compiling user search information
    const search = () => {
        const searchData = {
            apiKey: localStorage.getItem("key"),
            keyword: enteredSearch,
            numOfTweets: noOfTweets,
            sortBy: sort,
            filterBy: filter
        };

        // console.log(searchData);

        if (enteredSearch !== "") {
            // calling the api__Handler
            changeClicked(false);
            searchTwitter(searchData);
        }
    };

    // tweet options
    const tweetOptions = [];

    for (let index = 1; index <= 100; index++) {
        tweetOptions.push(<option key={index.toString()}>{index}</option>);
    }

    // processing api response
    const apiResponse = [<div key="begining div" />];

    searchResponse.map((data) =>
        // enteredSearch !== "" &&
        apiResponse.push(
            // <div key={data.tweetId}>
            // 	<HomeTweet tweetData={data} />
            // </div>
            <div className="" key={data.tweetId}>
                <Tweet options={{ align: "center" }} tweetId={data.tweetId} />
            </div>
        )
    );

    // let ind = 0;

    const viewGenReport = () => {
        if (localStorage.getItem("draftReportId")) {
            localStorage.removeItem("draftReportId");
            localStorage.setItem("draftReportId", genReport);
        } else {
            localStorage.setItem("draftReportId", genReport);
        }
    };

    return (
        <div data-testid="home">
            <div className="contflex justify-center items-center w-full border-b text-center mt-8  mini-tablet:mt-0 pt-2">
                Hello
            </div>

            {/* Api response comes here */}
            <div data-testid="result" className="flex flex-col">
                {clicked && (
                    <div className="mt-4 flex flex-col flex-wrap justify-center">
                        <h1 className="text-2xl ml-2">Newly created report</h1>
                        <Link to="/genReport">
                            <div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
                                <div className="">
                                    <button
                                        data-testid="btn-report"
                                        type="submit"
                                        onClick={viewGenReport}
                                    >
                                        <p className="font-bold">{createTitle}</p>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <p className="italic text-xs">
                                        {localStorage.getItem("username")}
                                    </p>
                                </div>
                                <div className="">
                                    <p className="italic text-xs">{date}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {apiResponse}
            </div>
        </div>
    );
}

export default Home;
