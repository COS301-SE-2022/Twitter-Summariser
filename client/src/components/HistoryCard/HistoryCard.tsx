import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const HistoryCard = (props: any) => {
  // console.log(props.data);

  const icon_style_3 = { fontSize: "1.5rem", color: "red" };

  const setResultSet = () => {
    console.log(props.data.id);
    localStorage.setItem("resultSetId", props.data.id);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
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
            <p className="italic text-xs">
              Filtered: {props.data.filterOption}
            </p>
          </div>
          <div className="">
            <p className="italic text-xs">{props.data.date}</p>
          </div>
        </div>

        <div className=" ml-2" data-bs-toggle="tooltip" title="Delete History">
          <MdDeleteOutline style={icon_style_3} />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
