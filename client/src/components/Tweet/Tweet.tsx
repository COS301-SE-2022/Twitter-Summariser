// importing icons for the sorting options
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const Tweet = (props: any) => {
  // const val = props.pleaseIncrement;
  const data = props.data;
  // console.log("Tweet position is " + props.position);
  // console.log(props.tweetData);

  // if (props.data.blockType === "TWEET") {
  //   console.log("This is " + data.blockType);
  //   console.log("Hoping it's Tweet and it position is " + props.position);
  //   console.log(props.data);
  // }

  // style for the icons
  const iconStyle = { color: "black", fontSize: "1rem" };

  return (
    // <div></div>
    <div
      key={data.block.tweetId}
      data-testid="results"
      className=" w-full border border-gray-200 flex flex-col p-3"
    >
      <div className="flex flex-row items-center">
        <p className=" font-semibold">{data.block.fullname}</p>
        <p className=" font-light">@{data.block.username}</p>
        &nbsp;
        <p className=" font-bold">&sdot;</p>
        &nbsp;
        <p className="text-sm">{data.block.dateOT.substring(0, 10)}</p>
      </div>

      <div className=" pt-3 flex flex-row">
        <p>{data.block.text}</p>
      </div>

      <div className="flex flex-row justify-around pt-3">
        <p className="flex flex-row text-sm items-center">
          <FaRegCommentAlt style={iconStyle} />
          &nbsp;
          {parseInt(data.block.numComments, 10)}
        </p>
        <p className="flex flex-row text-sm items-center">
          <AiOutlineRetweet style={iconStyle} />
          &nbsp; {parseInt(data.block.numRetweets, 10)}
        </p>
        <p className="flex flex-row text-sm items-center">
          <AiOutlineHeart style={iconStyle} />
          &nbsp;
          {parseInt(data.block.numLikes, 10)}
        </p>
      </div>
    </div>
  );
};

export default Tweet;
