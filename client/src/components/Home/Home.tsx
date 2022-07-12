import { useState } from "react";
// import Tweet from "../Tweet/Tweet";
import { Link } from "react-router-dom";
// import HomeTweet from "../HomeTweet/HomeTweet";
import { Tweet } from "react-twitter-widgets";

// importing link
import link from "../../resources/links.json";

function Home() {
    // ################ all related to the search ############################

    // localStorage.removeItem("resultSetId");
    // localStorage.removeItem("draftReportId");

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
            {/* search */}
            <div className="flex justify-center p-8 mini-tablet:mt-0">

                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300" >Search</label>
                <div className="relative w-screen">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border-gray-200 border focus:outline-none focus:ring focus:border-blue-500" value={enteredSearch}
                        onChange={searchHandler}
                        placeholder="Search Twitter..." required />
                </div>
            </div>

            {/* certain options and search button comes here */}
            <div className="flex flex-row flex-wrap justify-around">
                {/*  */}

                <div className="flex flex-row flex-wrap w-1/3 justify-center">
                    <p>Tweets:</p> &nbsp;
                    <select
                        data-testid="select-num-tweets"
                        className=" text-black"
                        value={noOfTweets}
                        onChange={tweetHandler}
                    >
                        {tweetOptions}
                    </select>
                </div>

                {/* this is for the Fitlering options */}
                <div className="flex flex-row flex-wrap w-1/3 justify-center">
                    <p className="">Filter:</p> &nbsp;
                    <select
                        data-testid="select-filter"
                        className=" text-black text-center"
                        onChange={filterHandler}
                    >
                        <option>-</option>
                        <option value="verifiedTweets">Verified Tweets</option>
                        <option value="noneReply">Non-Replies</option>
                    </select>
                </div>

                {/* this is for the sorting options */}
                <div className="flex flex-row flex-wrap w-1/3 justify-center">
                    <p className="">Sort By:</p> &nbsp;
                    <select
                        data-testid="select-sort"
                        className=" text-black text-center"
                        onChange={sortHandler}
                    >
                        <option>-</option>
                        <option value="byLikes">Likes</option>
                        <option value="byComments">Comments</option>
                        <option value="byRetweets">Re-tweets</option>
                    </select>
                </div>
            </div>

            {/* this is for the search button */}
            <div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center">
                <div className="flex flex-row w-1/3 justify-center items-center pt-3">
                    <button
                        data-testid="btn-search"
                        type="submit"
                        className="button w-3/4 text-lg p-0.5"
                        onClick={search}
                    >
                        Search
                    </button>
                </div>
            </div>


            <div className="flex flex-row flex-wrap justify-around pt-3 pb-3 items-center">
                <div className="flex flex-row w-1/3 justify-center pt-3">
                    <button
                        data-testid="btn-generate"
                        type="submit"
                        className="button w-3/4 text-lg p-0.5"
                        onClick={genRep}
                    >
                        Generate Report
                    </button>
                </div>
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
