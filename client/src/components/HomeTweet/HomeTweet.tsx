// importing icons for the sorting options
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const HomeTweet = (props: any) => {
  const data = props.tweetData;
  // console.log("Tweet position is " + props.position);

  // style for the icons
  const iconStyle = { color: "black", fontSize: "1rem" };

  return (
    <div
      key={data.tweetId}
      data-testid="results"
      className=" w-full border border-gray-200 flex flex-col p-3"
    >
      <div className="flex flex-row items-center">
        <p className=" font-semibold">{data.fullname}</p>
        <p className=" font-light">@{data.username}</p>
        &nbsp;
        <p className=" font-bold">&sdot;</p>
        &nbsp;
        <p className="text-sm">{data.dateOT.substring(0, 10)}</p>
      </div>

      <div className=" pt-3 flex flex-row">
        <p>{data.text}</p>
      </div>

      <div className="flex flex-row justify-around pt-3">
        <p className="flex flex-row text-sm items-center">
          <FaRegCommentAlt style={iconStyle} />
          &nbsp;
          {parseInt(data.numComments, 10)}
        </p>
        <p className="flex flex-row text-sm items-center">
          <AiOutlineRetweet style={iconStyle} />
          &nbsp; {parseInt(data.numRetweets, 10)}
        </p>
        <p className="flex flex-row text-sm items-center">
          <AiOutlineHeart style={iconStyle} />
          &nbsp;
          {parseInt(data.numLikes, 10)}
        </p>
      </div>
    </div>
  );
};

export default HomeTweet;
