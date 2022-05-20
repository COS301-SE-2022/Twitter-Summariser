import { useState } from "react";

// importing icons for the sorting options
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

// importing mock data
import tweeter from "../../mock.json";

const Home = (props: any) => {
  // const search = "";
  const [enteredSearch, changeEnteredSearch] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchHandler = (event: any) => {
    changeEnteredSearch(event.target.value);
  };

  // let clicked = false;

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

  // style for the icons
  const style_ = { color: "black", fontSize: "1rem" };

  // tweet options
  const tweetOptions = [];

  for (let index = 1; index <= 100; index++) {
    tweetOptions.push(<option key={index}>{index}</option>);
  }

  // processing api response
  const apiResponse = [<div></div>];

  tweeter.tweets.map(
    (data, index = 0) =>
      data.tags.toLowerCase().match(enteredSearch.toLowerCase()) &&
      enteredSearch !== "" &&
      apiResponse.push(
        <div
          key={index++}
          data-testid="results"
          className=" w-full border-b border-l border-r border-gray-200 flex flex-col p-3"
        >
          <div className="flex flex-row items-center">
            <p className=" font-semibold">{data.name}</p>
            &nbsp;
            <p className=" font-bold">&sdot;</p>
            &nbsp;
            <p className="text-sm">{data.date}</p>
          </div>

          <div className=" pt-3 flex flex-row">
            <p>{data.tweet}</p>
          </div>

          <div className="flex flex-row justify-around pt-3">
            <p className="flex flex-row text-sm items-center">
              <FaRegCommentAlt style={style_} />
              &nbsp;
              {parseInt(data.comments, 10)}
            </p>
            <p className="flex flex-row text-sm items-center">
              <AiOutlineRetweet style={style_} />
              &nbsp; {parseInt(data.retweets, 10)}
            </p>
            <p className="flex flex-row text-sm items-center">
              <AiOutlineHeart style={style_} />
              &nbsp;
              {parseInt(data.likes, 10)}
            </p>
          </div>
        </div>
      )
  );

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

      {/* certain options and summarize button comes here */}
      <div className="flex flex-row justify-around pt-3 pb-3 border border-gray-200 items-center">
        {/*  */}

        <div className="flex flex-row w-1/3 justify-center">
          <p>Number of Tweets:</p> &nbsp;
          <select className=" text-black">{tweetOptions}</select>
        </div>

        {/* this is for the sorting options */}
        <div className="flex flex-row w-1/3 justify-center">
          <p className="">Sort by:</p> &nbsp;
          <select className=" text-black">
            <option>comments</option>
            <option>re-tweets</option>
            <option>likes</option>
          </select>
        </div>

        {/* this is for the button */}
        <div className="flex flex-row w-1/3 justify-center">
          <button
            type="submit"
            className="button w-3/4 text-lg p-0.5"
            onClick={click}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Api response comes here */}
      <div data-testid="result" className="flex flex-col">
        {apiResponse}

        {enteredSearch === "" && clicked === false && (
          <div className="mt-4">
            <h1 className="text-2xl">Trends</h1>
          </div>
        )}

        {clicked && (
          <div className="mt-4 flex flex-col flex-wrap justify-center">
            <h1 className="text-2xl">Newly created report</h1>
            <button type="submit" onClick={() => props.myPropOption(8)}>
              <div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
                <div className="">
                  <button type="submit">
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
