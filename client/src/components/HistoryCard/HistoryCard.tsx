import React from "react";

const HistoryCard = (props: any) => {
  return (
    <div>
      <div className="">
        <button type="submit">
          <p className="font-bold">{props.data.searchPhrase}</p>
        </button>
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
