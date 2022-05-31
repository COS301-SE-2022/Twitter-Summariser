import { useState } from "react";
import Tweet from "../Tweet/Tweet";

// importing mock data
import tweeter from "../../mock.json";

const Home = (props: any) => {
  // all related to the search
  const [enteredSearch, changeEnteredSearch] = useState("");

  const searchHandler = (event: any) => {
    changeEnteredSearch(event.target.value);
  };

  const [clicked, changeClicked] = useState(false);
  const [createTitle, changeCreateTitle] = useState("");

  const click = () => {
    if (enteredSearch !== "") {
      console.log("clicked");
      changeCreateTitle(enteredSearch);
      changeEnteredSearch("");
      changeClicked(!clicked);
    }
  };

  // extra search function sort, filter, number of tweets to collect
  const [noOfTweets, changeNoOfTweets] = useState(1);
  const [sort, changeSort] = useState("");
  const [filter, changeFilter] = useState("");

  const tweetHandler = (event: any) => {
    changeNoOfTweets(event.target.value);
  };

  const sortHandler = (event: any) => {
    changeSort(event.target.value);
  };

  const filterHandler = (event: any) => {
    changeFilter(event.target.value);
  };

  const search = () => {
    const searchData = {
      keyword: enteredSearch,
      tweets: noOfTweets,
      sortIn: sort,
      filter: filter,
    };

    if (enteredSearch !== "") {
      console.log(searchData);
    }
  };

  // tweet options
  const tweetOptions = [];

  for (let index = 1; index <= 100; index++) {
    if (index === 10) {
      tweetOptions.push(
        <option key={index.toString()} selected>
          {index}
        </option>
      );
    } else {
      tweetOptions.push(<option key={index.toString()}>{index}</option>);
    }
  }

  // processing api response
  const apiResponse = [<div key={"begining div"}></div>];

  tweeter.tweets.map(
    (data, index) =>
      data.tags.toLowerCase().match(enteredSearch.toLowerCase()) &&
      enteredSearch !== "" &&
      apiResponse.push(
        <div key={index}>
          <Tweet tweetData={data} />
        </div>
      )
  );

  let ind = 0;

  return (
    <div data-testid="home">
      {/* search */}
      <div className="flex justify-center p-2 border-l border-r border-gray-200">
        <div className="w-3/4 mb-3">
          <input
            data-testid="search"
            type="search"
            className="
                nosubmit
                w-full
                px-3
                py-1.5
                text-lg
                font-normal
                text-gray-700
                bg-clip-padding
                border border-solid border-gray-300
                rounded-lg
                focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
                bg-gray-200
              "
            value={enteredSearch}
            onChange={searchHandler}
            placeholder="search twitter..."
          />
        </div>
      </div>

      {/* certain options and search button comes here */}
      <div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
        {/*  */}

        <div className="flex flex-row flex-wrap w-1/3 justify-center">
          <p>Tweets:</p> &nbsp;
          <select data-testid="select-num-tweets" className=" text-black" onChange={tweetHandler}>
            {tweetOptions}
          </select>
        </div>

        {/* this is for the Fitlering options */}
        <div className="flex flex-row flex-wrap w-1/3 justify-center">
          <p className="">Filter:</p> &nbsp;
          <select data-testid="select-filter" className=" text-black" onChange={filterHandler}>
            <option selected>none</option>
            <option>min number of likes</option>
            <option>non-replies</option>
          </select>
        </div>

        {/* this is for the sorting options */}
        <div className="flex flex-row flex-wrap w-1/3 justify-center">
          <p className="">Sort:</p> &nbsp;
          <select data-testid="select-sort" className=" text-black" onChange={sortHandler}>
            <option selected>none</option>
            <option>by likes</option>
            <option>by comments</option>
            <option>by re-tweets</option>
          </select>
        </div>

        {/* this is for the search button */}
        <div className="flex flex-row w-1/3 justify-center pt-3">
          <button data-testid="btn-search"
            type="submit"
            className="button w-3/4 text-lg p-0.5"
            onClick={search}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-around pt-3 pb-3 border border-gray-200 items-center">
        <div className="flex flex-row w-1/3 justify-center pt-3">
          <button data-testid="btn-generate"
            type="submit"
            className="button w-3/4 text-lg p-0.5"
            onClick={click}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Api response comes here */}
      <div data-testid="result" className="flex flex-col">
        {apiResponse}

        {enteredSearch === "" && clicked === false && (
          <div className="mt-4" key={(ind++).toString()}>
            <h1 className="text-2xl">Trends</h1>
          </div>
        )}

        {clicked && (
          <div className="mt-4 flex flex-col flex-wrap justify-center">
            <h1 className="text-2xl">Newly created report</h1>
            <button type="submit" onClick={() => props.myPropOption(8)}>
              <div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
                <div className="">
                  <button data-testid="btn-report" type="submit">
                    <p className="font-bold">{createTitle}</p>
                  </button>
                </div>
                <div className="mt-2">
                  <p className="italic text-xs">Gabriel Shoderu</p>
                </div>
                <div className="">
                  <p className="italic text-xs">5/12/2022</p>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
