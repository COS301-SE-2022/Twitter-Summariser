import { useState } from "react";
import DraftCard from "../DraftCard/DraftCard";

function Drafts() {
  const [draft, changeDraft] = useState<any[]>([]);

  // ######################### API FOR GETTING HISTORY #####################

  const getAllMyReportsEndpoint =
    "https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getAllMyReports";

  const getHistory = async () => {
    const apiData = {
      apiKey: localStorage.getItem("loggedUserApi"),
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(apiData),
    };

    fetch(getAllMyReportsEndpoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson && (await response.json());

        changeDraft(await data);

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
          <h1 className="text-3xl">Drafts</h1>

          <div className="mt-4 flex flex-row flex-wrap justify-center">
            <div className="mt-4 flex flex-row flex-wrap justify-center">
              {draft.map((data, index) => (
                <div
                  className="m-4 w-auto h-auto bg-gray-400 rounded-md flex flex-col p-2"
                  key={index}
                >
                  <DraftCard data={data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drafts;
