import { useState } from 'react';

// importing icons for the sorting options
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';

// importing mock data
import tweeter from '../../mock.json';

function Home() {
    // const search = "";
    const [enteredSearch, changeEnteredSearch] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchHandler = (event: any) => {
        changeEnteredSearch(event.target.value);
    };

    // style for the icons
    const style = { color: 'black', fontSize: '1.5rem' };
    return (
        <div data-testid = "home">
            {/* search */}
            <div className="flex justify-center p-2 border-l border-r border-gray-200">
                <div className="w-3/4 mb-3">
                    <input
                        data-testid = "search"
                        type="search"
                        className="
                nosubmit
                w-full
                px-3
                py-1.5
                text-lg
                font-normal
                text-gray-700
                bg-clip-padding
                border border-solid border-gray-300
                rounded-lg
                focus:text-gray-700 focus:bg-white focus:border-twitter-blue focus:outline-none
                bg-gray-200
              "
                        value={enteredSearch}
                        onChange={searchHandler}
                        placeholder="search twitter..."
                    />
                </div>
            </div>

            {/* certain options and summarize button comes here */}
            <div className="flex flex-row justify-around pt-3 pb-3 pl-5 pr-5 border border-gray-200">
                {/* this is for the sorting options */}
                <div className="flex flex-row w-1/3 justify-around">
                    <div className="w-1/3 p-3">
                        <AiOutlineHeart style={style} />
                    </div>
                    <div className="w-1/3 p-3">
                        <AiOutlineRetweet style={style} />
                    </div>
                    <div className="w-1/3 p-3">
                        <FaRegCommentAlt style={style} />
                    </div>
                </div>

                {/* this is for the button */}
                <div className="w-1/3 pt-1">
                    {/* {blacked ? (
              <button
                type="submit"
                className="button w-3/4 text-lg p-0.5"
                onClick={onBlackedHandler}
              >
                Summarize
              </button>
            ) : (
              <button
                type="submit"
                className="button-greyed w-3/4 text-lg p-0.5"
                onClick={onBlackedHandler}
              >
                Summarize
              </button>
            )} */}
                    <button
                        type="submit"
                        className="button w-3/4 text-lg p-0.5"
                    >
                        Summarize
                    </button>
                </div>
            </div>

            {/* Api response comes here */}
            <div data-testid = "results" className="flex flex-col">
                {tweeter.tweets.map(
                    (data) =>
                        data.tags.match(enteredSearch) &&
                        enteredSearch !== '' && (
                            <div className=" w-full border-b border-l border-r border-gray-200">
                                <p>Tags: #{data.tags}</p>
                                <p>
                                    Name:
                                    {data.name}
                                </p>
                                <p>
                                    Title:
                                    {data.title}
                                </p>
                                <p>
                                    Date:
                                    {data.date}
                                </p>
                                <p>
                                    Likes:
                                    {data.likes}
                                </p>
                                <p>
                                    Comments:
                                    {data.comments}
                                </p>
                                <p>
                                    retweets:
                                    {data.retweets}
                                </p>
                                <p>
                                    Tweet:
                                    {data.tweet}
                                </p>
                            </div>
                        ),
                )}

                {enteredSearch === '' && (
                    <div className="">
                        <h1 className="text-4xl">Trends</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
