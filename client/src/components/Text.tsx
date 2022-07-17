import { BiItalic, BiBold } from "react-icons/bi";
import { BsJustify } from "react-icons/bs";
import { AiOutlineFontSize, AiFillEdit } from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight, GrAdd } from "react-icons/gr";
import { useState } from "react";

// importing link
import link from "../resources/links.json";

function Text(props: any) {
    const textPos = props.data.position;

    // console.log(props.data);

    const [italic, setItalic] = useState("");

    const italicHandler = () => {
        if (italic === "") {
            setItalic(" italic");
        } else {
            setItalic("");
        }
    };

    //   const bold = " font-bold";
    const [bold, setBold] = useState("");

    const boldHandler = () => {
        if (bold === "") {
            setBold(" font-bold");
        } else {
            setBold("");
        }
    };

    //   const size = " text-xs";
    const [size, setSize] = useState(" text-xs");

    const sizeHandler = (event: any) => {
        setSize(event.target.value);
    };

    //   const align = " text-right";
    const [align, setAlign] = useState(" text-left");
    const [alignLeft, setAlignLeft] = useState(true);
    const [alignRight, setAlignRight] = useState(false);
    const [alignCenter, setAlignCenter] = useState(false);
    const [alignJustify, setAlignJustify] = useState(false);

    const alignHandler = (val: any) => {
        if (val === "left") {
            setAlignLeft(false);
            setAlignRight(true);
            setAlign(" text-right");
            setAlignCenter(false);
            setAlignJustify(false);
        } else if (val === "right") {
            setAlignLeft(false);
            setAlignRight(false);
            setAlignCenter(true);
            setAlign(" text-center");
            setAlignJustify(false);
        } else if (val === "center") {
            setAlignLeft(false);
            setAlignRight(false);
            setAlignCenter(false);
            setAlignJustify(true);
            setAlign(" text-justify");
        } else if (val === "justify") {
            setAlignLeft(true);
            setAlign(" text-left");
            setAlignRight(false);
            setAlignCenter(false);
            setAlignJustify(false);
        }
    };

    //   const color = " text-black";
    const [color, setColor] = useState(" text-black");

    const colorHandler = (event: any) => {
        setColor(event.target.value);
    };

    const style = `border border-gray-300 w-full h-24 mt-2 p-2${italic}${bold}${color}${size}${align}`;

    const iconStyle = { fontSize: "1.2rem" };
    const iconStyle2 = { fontSize: "1rem" };
    const iconStyle3 = { fontSize: "1.5rem", color: "red" };

    const [editor, setEditor] = useState(false);

    const textEditorHandler = () => {
        setEditor(!editor);
    };

    const [secondEditor, setSecondEditor] = useState(false);

    const secondTextEditorHandler = () => {
        setSecondEditor(!secondEditor);
    };

    const [report, changeReport] = useState("");

    const textHandler = (event: any) => {
        changeReport(event.target.value.trim());
    };

    // ######################### API FOR EDITING TEXT ###############################################

    let textEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);
    textEndpoint += "editBlock";

    // using localhost
    // const textEndpoint = "http://localhost:4000/dev/editBlock";

    // let data;

    const editText = async (text: any) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(text),
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        };

        fetch(textEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");
                // remember to make const variable a let outside the editText function
                isJson && (await response.json());

                // console.log(await data);

                // check for error response
                if (!response.ok) {
                    // error
                }
            })
            .catch(() => {
                // console.log("Error Updating Text");
                // console.log(error);
            });
    };

    // #############################################################################

    const update = () => {
        const propsUpdate = {
            textStyle: {
                Italic: italic,
                Bold: bold,
                Color: color,
                Size: size,
                Align: align
            },
            text: report,
            reportID: localStorage.getItem("draftReportId"),
            position: textPos,
            apiKey: localStorage.getItem("key")
        };

        // console.log(Text);

        editText(propsUpdate);
    };

    const secondUpdate = () => {
        const propsSecondUpdate = {
            textStyle: {
                Italic: italic,
                Bold: bold,
                Color: color,
                Size: size,
                Align: align
            },
            text: report,
            reportID: localStorage.getItem("draftReportId"),
            styleID: props.data.block.style[0].textStylesID,
            reportBlockID: props.data.reportBlockID,
            position: textPos,
            apiKey: localStorage.getItem("key")
        };
        // console.log(Text);
        editText(propsSecondUpdate);
        setSecondEditor(!secondEditor);
    };

    // let editButton = false;
    let style2 = "w-full h-auto mt-2 p-2";
    // let tempText = "";

    if (props.data.block === null) {
        // editButton = true;
    } else {
        // editButton = false;
        // console.log(props.data.block.text.length);
        style2 =
            style2 +
            props.data.block.style[0].italic +
            props.data.block.style[0].bold +
            props.data.block.style[0].size +
            props.data.block.style[0].align +
            props.data.block.style[0].colour;

        // tempText = props.data.block.text;

        // style = style2;

        // console.log(style2);
    }

    return (
        <div>
            {props.data.block !== null && (
                <div className="flex flex-col">
                    {!secondEditor && <div className={style2}>{props.data.block.text.trim()}</div>}

                    {!secondEditor && (
                        <div
                            className="flex justify-center align-middle mt-0 mb-5"
                            data-bs-toggle="tooltip"
                            title="Update Text"
                        >
                            <button type="button" onClick={() => secondTextEditorHandler()}>
                                <AiFillEdit style={iconStyle} />
                            </button>
                        </div>
                    )}

                    {secondEditor && (
                        <div className="flex flex-col">
                            <div className="flex justify-center align-middle">
                                <div className="flex flex-row w-1/3 justify-around pt-2  items-center">
                                    <button type="button" onClick={italicHandler}>
                                        <BiItalic style={iconStyle} />
                                    </button>{" "}
                                    &nbsp;
                                    <button type="button" onClick={boldHandler}>
                                        <BiBold style={iconStyle} />
                                    </button>
                                    &nbsp;{" "}
                                    {alignLeft && (
                                        <button type="button" onClick={() => alignHandler("left")}>
                                            {" "}
                                            <GrTextAlignLeft style={iconStyle2} />{" "}
                                        </button>
                                    )}
                                    {alignRight && (
                                        <button type="button" onClick={() => alignHandler("right")}>
                                            {" "}
                                            <GrTextAlignRight style={iconStyle2} />{" "}
                                        </button>
                                    )}
                                    {alignCenter && (
                                        <button
                                            type="button"
                                            onClick={() => alignHandler("center")}
                                        >
                                            {" "}
                                            <GrTextAlignCenter style={iconStyle2} />{" "}
                                        </button>
                                    )}
                                    {alignJustify && (
                                        <button
                                            type="button"
                                            onClick={() => alignHandler("justify")}
                                        >
                                            {" "}
                                            <BsJustify style={iconStyle} />{" "}
                                        </button>
                                    )}
                                    &nbsp;&nbsp;
                                    <div className="flex flex-row">
                                        <AiOutlineFontSize style={iconStyle} />
                                        <select
                                            className="text-black text-center text-xs"
                                            onChange={sizeHandler}
                                        >
                                            <option value=" text-xs">12px</option>
                                            <option value=" text-sm">14px</option>
                                            <option value=" text-base">16px</option>
                                            <option value=" text-lg">18px</option>
                                            <option value=" text-xl">20px</option>
                                            <option value=" text-2xl">24px</option>
                                            <option value=" text-3xl">30px</option>
                                            <option value=" text-4xl">36px</option>
                                            <option value=" text-5xl">48px</option>
                                            <option value=" text-6xl">64px</option>
                                        </select>
                                    </div>
                                    &nbsp;{" "}
                                    <div className="flex flex-row">
                                        <IoColorPaletteOutline style={iconStyle} />
                                        <select
                                            className="text-black text-center text-xs"
                                            onChange={colorHandler}
                                        >
                                            <option value=" text-slate-600">slate</option>
                                            <option value=" text-zinc-600">gray</option>
                                            <option value=" text-red-600">red</option>
                                            <option value=" text-orange-600">orange</option>
                                            <option value=" text-green-600">green</option>
                                            <option value=" text-blue-600">blue</option>
                                            <option value=" text-pink-600">pink</option>
                                            <option value=" text-purple-600">purple</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row items-center">
                                <div className="w-5/6">
                                    <textarea
                                        className={style}
                                        onChange={textHandler}
                                        defaultValue={props.data.block.text}
                                    />
                                </div>

                                <div className="w-1/6 flex text-center justify-center">
                                    <button type="button" onClick={secondTextEditorHandler}>
                                        <MdDeleteOutline style={iconStyle3} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center mb-2">
                                <button
                                    type="submit"
                                    onClick={secondTextEditorHandler}
                                    className="m-2 pl-2 pr-2 h-auto w-1/4 border border-gray-200 rounded-md hover:bg-gray-100"
                                >
                                    cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={secondUpdate}
                                    className="m-2 p-2 h-auto w-1/4 bg-twitter-color rounded-md text-white hover:bg-twitter-color-hover"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {props.data.block === null && (
                <div key={props.keyValue}>
                    {editor && (
                        <div className="flex flex-col">
                            <div className="flex justify-center align-middle">
                                <div className="flex flex-row w-1/3 justify-around pt-2  items-center">
                                    <button type="button" onClick={italicHandler}>
                                        <BiItalic style={iconStyle} />
                                    </button>{" "}
                                    &nbsp;
                                    <button type="button" onClick={boldHandler}>
                                        <BiBold style={iconStyle} />
                                    </button>
                                    &nbsp;{" "}
                                    {alignLeft && (
                                        <button type="button" onClick={() => alignHandler("left")}>
                                            {" "}
                                            <GrTextAlignLeft style={iconStyle2} />{" "}
                                        </button>
                                    )}
                                    {alignRight && (
                                        <button type="button" onClick={() => alignHandler("right")}>
                                            {" "}
                                            <GrTextAlignRight style={iconStyle2} />{" "}
                                        </button>
                                    )}
                                    {alignCenter && (
                                        <button
                                            type="button"
                                            onClick={() => alignHandler("center")}
                                        >
                                            {" "}
                                            <GrTextAlignCenter style={iconStyle2} />{" "}
                                        </button>
                                    )}
                                    {alignJustify && (
                                        <button
                                            type="button"
                                            onClick={() => alignHandler("justify")}
                                        >
                                            {" "}
                                            <BsJustify style={iconStyle} />{" "}
                                        </button>
                                    )}
                                    &nbsp;&nbsp;
                                    <div className="flex flex-row">
                                        <AiOutlineFontSize style={iconStyle} />
                                        <select
                                            className="text-black text-center text-xs"
                                            onChange={sizeHandler}
                                        >
                                            <option value=" text-xs">12px</option>
                                            <option value=" text-sm">14px</option>
                                            <option value=" text-base">16px</option>
                                            <option value=" text-lg">18px</option>
                                            <option value=" text-xl">20px</option>
                                            <option value=" text-2xl">24px</option>
                                            <option value=" text-3xl">30px</option>
                                            <option value=" text-4xl">36px</option>
                                            <option value=" text-5xl">48px</option>
                                            <option value=" text-6xl">64px</option>
                                        </select>
                                    </div>
                                    &nbsp;{" "}
                                    <div className="flex flex-row">
                                        <IoColorPaletteOutline style={iconStyle} />
                                        <select
                                            className="text-black text-center text-xs"
                                            onChange={colorHandler}
                                        >
                                            <option value=" text-slate-600">slate</option>
                                            <option value=" text-zinc-600">gray</option>
                                            <option value=" text-red-600">red</option>
                                            <option value=" text-orange-600">orange</option>
                                            <option value=" text-green-600">green</option>
                                            <option value=" text-blue-600">blue</option>
                                            <option value=" text-pink-600">pink</option>
                                            <option value=" text-purple-600">purple</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row items-center">
                                <div className="w-full">
                                    <textarea className={style} onChange={textHandler} />
                                </div>

                                {/* <div className="w-1/6 flex text-center justify-center">
									<button type="button" onClick={textEditorHandler}>
										<MdDeleteOutline style={iconStyle3} />
									</button>
								</div> */}
                            </div>

                            <div className="flex flex-row justify-center mb-2">
                                <button
                                    type="submit"
                                    onClick={textEditorHandler}
                                    className="m-2 pl-2 pr-2 h-auto w-1/4 border border-gray-200 rounded-md hover:bg-gray-100"
                                >
                                    cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={update}
                                    className="m-2 p-2 h-auto w-1/5 bg-twitter-color rounded-md text-white hover:bg-twitter-color-hover"
                                >
                                    Update
                                </button>
                            </div>
                            <br />
                        </div>
                    )}

                    {!editor && (
                        <div className="flex flex-col mt-5 mb-5">
                            <div
                                className="flex justify-center align-middle"
                                data-bs-toggle="tooltip"
                                title="Add text"
                            >
                                <button type="button" onClick={textEditorHandler}>
                                    <GrAdd style={iconStyle} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Text;
