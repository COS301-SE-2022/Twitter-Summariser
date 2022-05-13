import { useState } from 'react';

// importing icons for the sorting options
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';

// importing mock data
import tweeter from '../../mock.json';

function Home(props: any) {
    // const search = "";
    const [enteredSearch, changeEnteredSearch] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchHandler = (event: any) => {
        changeEnteredSearch(event.target.value);
    };

    // let clicked = false;

    const [clicked, changeClicked] = useState(false);
    const [createTitle, changeCreateTitle] = useState('');

    const click = () => {
        if (enteredSearch !== '') {
            console.log('clicked');
            changeCreateTitle(enteredSearch);
            changeEnteredSearch('');
            changeClicked(!clicked);
        }
    };

    // style for the icons
    const style = { color: 'black', fontSize: '1.5rem' };
    return (
        <div data-testid="home">
            {/* search */}
            <div className="flex justify-center p-2 border-l border-r border-gray-200">
                <div className="w-3/4 mb-3">
                    <input
                        data-testid="search"
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
                    <button
                        type="submit"
                        className="button w-3/4 text-lg p-0.5"
                        onClick={click}
                    >
                        Summarize
                    </button>
                </div>
            </div>

            {/* Api response comes here */}
            <div data-testid="result" className="flex flex-col">
                {tweeter.tweets.map(
                    (data) =>
                        data.tags
                            .toLowerCase()
                            .match(enteredSearch.toLowerCase()) &&
                        enteredSearch !== '' && (
                            <div
                                data-testid="results"
                                className=" w-full border-b border-l border-r border-gray-200"
                            >
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

                {enteredSearch === '' && clicked === false && (
                    <div className="mt-4">
                        <h1 className="text-2xl">Trends</h1>
                    </div>
                )}

                {clicked && (
                    <div className="mt-4 flex flex-col flex-wrap justify-center">
                        <h1 className="text-2xl">Newly created report</h1>
                        <button
                            type="submit"
                            onClick={() => props.myPropOption(8)}
                        >
                            <div className="m-4 w-1/4 h-20 bg-gray-400 rounded-md flex flex-col p-2">
                                <div className="">
                                    <button type="submit">
                                        <p className="font-bold">
                                            {createTitle}
                                        </p>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <p className="italic text-xs">
                                        Gabriel Shoderu
                                    </p>
                                </div>
                                <div className="">
                                    <p className="italic text-xs">5/12/2022</p>
                                </div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
