// importing icons for the sorting options
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const Tweet = (props: any) => {
  const data = props.tweetData;

  // style for the icons
  const style_ = { color: "black", fontSize: "1rem" };

  return (
    <div
      key={data.id}
      data-testid="results"
      className=" w-full border-b border-l border-r border-gray-200 flex flex-col p-3"
    >
      <div className="flex flex-row items-center">
        <p className=" font-semibold">{data.name}</p>
        &nbsp;
        <p className=" font-bold">&sdot;</p>
        &nbsp;
        <p className="text-sm">{data.date}</p>
      </div>

      <div className=" pt-3 flex flex-row">
        <p>{data.tweet}</p>
      </div>

      <div className="flex flex-row justify-around pt-3">
        <p className="flex flex-row text-sm items-center">
          <FaRegCommentAlt style={style_} />
          &nbsp;
          {parseInt(data.comments, 10)}
        </p>
        <p className="flex flex-row text-sm items-center">
          <AiOutlineRetweet style={style_} />
          &nbsp; {parseInt(data.retweets, 10)}
        </p>
        <p className="flex flex-row text-sm items-center">
          <AiOutlineHeart style={style_} />
          &nbsp;
          {parseInt(data.likes, 10)}
        </p>
      </div>
    </div>
  );
};

export default Tweet;
