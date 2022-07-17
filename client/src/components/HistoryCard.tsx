import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

// importing link
import link from "../resources/links.json";

function HistoryCard(props: any) {
    // console.log(props.data);

    const iconStyle3 = { fontSize: "1.5rem", color: "red" };

    const setResultSet = () => {
        // console.log(props.data.id);
        localStorage.setItem("resultSetId", props.data.id);
    };

    // ######################### API FOR DELETING RESULT SET ###############################################

    let deleteResultSetEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);
    deleteResultSetEndpoint += "deleteResultSet";

    const deleteResult = (resultInfo: any) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(resultInfo),
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        };

        fetch(deleteResultSetEndpoint, requestOptions).then(async (response) => {
            response.headers.get("content-type")?.includes("application/json");

            // isJson && (await response.json());
        });
    };

    // #######################################################################

    const deleteHandler = (event: any) => {
        event.preventDefault();

        const resultDetails = {
            resultSetID: props.data.id,
            apiKey: props.data.apiKey
        };

        deleteResult(resultDetails);
    };

    return (
        <div className="">
            <div className="m-4 w-auto h-20 p-2 flex flex-row justify-between items-center">
                <div className="">
                    <div className="">
                        <Link to="/viewHistory">
                            <button type="submit" onClick={setResultSet}>
                                <p className="font-bold">{props.data.searchPhrase}</p>
                            </button>
                        </Link>
                    </div>
                    <div className="mt-2">
                        <p className="italic text-xs">Sorted: {props.data.sortOption}</p>
                    </div>
                    <div className="mt-2">
                        <p className="italic text-xs">Filtered: {props.data.filterOption}</p>
                    </div>
                    <div className="">
                        <p className="italic text-xs">{props.data.date}</p>
                    </div>
                </div>

                <button type="button" onClick={deleteHandler}>
                    <div className=" ml-2" data-bs-toggle="tooltip" title="Delete History">
                        <MdDeleteOutline style={iconStyle3} />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default HistoryCard;
