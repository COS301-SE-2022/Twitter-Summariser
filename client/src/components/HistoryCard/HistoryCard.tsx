import { Link } from "react-router-dom";

const HistoryCard = (props: any) => {
  // console.log(props.data);

  const setResultSet = () => {
    console.log(props.data.id);
    localStorage.setItem("resultSetId", props.data.id);
  };

  return (
    <div>
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
  );
};

export default HistoryCard;
