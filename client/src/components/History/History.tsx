import { useState } from "react";

const History = () => {
  const [history, changeHistory] = useState<any[]>([]);

  // ######################### API FOR GETTING HISTORY #####################

  const getAllResultSetEndpoint =
    "https://czbmusycz2.execute-api.us-east-1.amazonaws.com/dev/getAllResultSet";

  const getHistory = async () => {
    // POST request using fetch with error handling

    const apiData = {
      apiKey: localStorage.getItem("loggedUserApi"),
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(apiData),
    };

    fetch(getAllResultSetEndpoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson && (await response.json());

        changeHistory(await data);

        // check for error response
        if (!response.ok) {
          // error
          return;
        }
      })
      .catch((error) => {
        console.log("Error Getting History");
      });
  };

  getHistory();

  // #######################################################################

  return (
    <div>
      {/* Api response comes here */}
      <div className=" mt-16 p-3">
        <div className=" mt-4">
          <h1 className="text-3xl">Search Result History</h1>

          <div className="mt-4 flex flex-row flex-wrap justify-center">
            <div className="mt-4 flex flex-row flex-wrap justify-center">
              {history.map((data, index) => (
                <div
                  className="m-4 w-1/4 h-auto bg-gray-400 rounded-md flex flex-col p-2"
                  key={index}
                >
                  <div className="">
                    <button type="submit">
                      <p className="font-bold">{data.searchPhrase}</p>
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="italic text-xs">Sorted: {data.sortOption}</p>
                  </div>
                  <div className="mt-2">
                    <p className="italic text-xs">
                      Filtered: {data.filterOption}
                    </p>
                  </div>
                  <div className="">
                    <p className="italic text-xs">{data.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
