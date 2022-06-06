// import { Tweet } from 'react-twitter-widgets';
import { Link, useLocation } from "react-router-dom";
import Tweet from "../Tweet/Tweet";
import { Key, useState } from "react";

// importing mock data
import Text from "../Text/Text";

function GenReport(props: any) {
  const { state } = useLocation();
  // const location = useLocation();

  console.log(state);

  // const [searchResponse, changeResponse] = useState([]);
  // const searchEndpoint =
  //   "https://mtx3w94c8f.execute-api.us-east-1.amazonaws.com/dev/search";

  // // post request
  // const api_handler = async (e: any) => {
  //   const response = await fetch(searchEndpoint, {
  //     method: "POST",
  //     body: JSON.stringify(e),
  //   });

  //   changeResponse(await response.json());
  // };

  // const searchData = {
  //   keyword: "Elon",
  //   numOfTweets: "10",
  //   sortBy: "by likes",
  // };

  // api_handler(searchData);

  // processing api response
  const apiResponse = [<div key={"begining div"}></div>];

  // state.map((data: any, index: Key | null | undefined) =>
  //   apiResponse.push(
  //     <div key={index}>
  //       <Text keyValue={index} />
  //       <Tweet tweetData={data} />
  //     </div>
  //   )
  // );

  return (
    <div className="mt-4 p-4">
      <h1 className="text-3xl font-bold">
        Stacey Passed the BitByBit Students!
      </h1>
      <br />
      <h2 className="italic font-bold">Created By: Gabriel Shoderu</h2>
      <h3 className="italic text-xs">Date Created: 13/05/2022</h3>
      <br />

      <div className="grid grid-cols gap-4 content-center">{apiResponse}</div>

      <Link
        to="/"
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button"
      >
        {" "}
        PUBLISH REPORT
      </Link>
    </div>
  );
}

export default GenReport;
