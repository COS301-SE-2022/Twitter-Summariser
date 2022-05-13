import React from "react";
import { Tweet } from "react-twitter-widgets";

// export default {
//     title: "Tweet",
//     component: Tweet
// };

const GenReport = (props: any) => {
    return (
        <div className="mt-4 p-4">
            <h1 className="text-3xl font-bold">Stacey Passed the BitByBit Students!</h1>
            <br />
            <h2 className="italic font-bold">Created By: Gabriel Shoderu</h2>
            <h3 className="italic text-xs">Date Created: 13/05/2022</h3>
            <br />

            <div className="grid grid-cols gap-4 content-center">
                <div>
                    <Tweet tweetId="841418541026877441" />
                </div>


               <div>
                    <Tweet tweetId="841418541026877441" />
                </div>

                <div>
                    <Tweet tweetId="841418541026877441" />
                </div>
            </div>


            < button type="submit"
                            onClick={() => props.myPropOption(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button" > PUBLISH REPORT</button>
        </div>
    )
}

export default GenReport;
