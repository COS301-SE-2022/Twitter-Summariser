// import { Tweet } from 'react-twitter-widgets';
import { Link, useParams } from "react-router-dom";
import Tweet from "../Tweet/Tweet";
import { Key, useState } from "react";

// importing mock data
import Text from "../Text/Text";

function GenReport(props: any) {
  // const [{id}, changeID] = useState("");

  // let { val } = useParams();
  const [state, setState] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  console.log(localStorage.getItem("id"));
  // console.log(val);

  // ################ API FOR GENERATE REPORT ###########################

  const getReportEndpoint =
    "https://czbmusycz2.execute-api.us-east-1.amazonaws.com/dev/getReport";

  const genRep = async () => {
    // POST request using fetch with error handling

    const requiredData = {
      reportID: localStorage.getItem("id"),
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(requiredData),
    };

    fetch(getReportEndpoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson && (await response.json());

        setState(data.report.tweets);
        setTitle(data.report.title);
        setAuthor(data.report.author);
        // setDate(data.report.)
        console.log(await data);

        // check for error response
        if (!response.ok) {
          // error
          // signUpFailure(true);

          return;
        }

        // await props.readyToLogIN();
      })
      .catch((error) => {
        console.log("Error retrieving report");
        // signUpFailure(true);
      });
  };

  genRep();
  // ###################################################################

  // processing api response
  const apiResponse = [<div key={"begining div"}></div>];

  state.map((data: any, index: Key | null | undefined) =>
    apiResponse.push(
      <div key={index}>
        <Text keyValue={index} />
        <Tweet tweetData={data} />
      </div>
    )
  );

  return (
    <div className="mt-4 p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <br />
      <h2 className="italic font-bold">Created By: {author}</h2>
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
