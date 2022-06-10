import { BiItalic, BiBold } from "react-icons/bi";
import { BsJustify } from "react-icons/bs";
import { AiOutlineFontSize, AiFillEdit } from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import {
  GrTextAlignCenter,
  GrTextAlignLeft,
  GrTextAlignRight,
} from "react-icons/gr";
import { useState } from "react";

const Text = (props: any) => {
  // if (
  //   props.data.blockType === "RICHTEXT" &&
  //   props.position === props.data.position
  // ) {
  //   console.log("This is " + props.data.blockType);
  //   console.log(props.data.block.text);
  //   console.log("Hoping it's Text and it position is " + props.position);
  //   console.log(props.data);
  // }

  // console.log(props.position);
  // const val = props.pleaseIncrement;

  const textPos = props.data.position;

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

  let style = "w-full h-24 mt-2 p-2" + italic + bold + color + size + align;

  const icon_style = { fontSize: "1.2rem" };
  const icon_style_2 = { fontSize: "1rem" };
  const icon_style_3 = { fontSize: "1.5rem", color: "red" };

  const [editor, setEditor] = useState(false);

  const textEditorHandler = () => {
    setEditor(!editor);
  };

  const [report, changeReport] = useState("");

  const textHandler = (event: any) => {
    changeReport(event.target.value);
  };

  // ######################### API FOR EDITING TEXT ###############################################
  const textEndpoint =
    "https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/editBlock";

  const editText = async (text: any) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(text),
    };

    fetch(textEndpoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson && (await response.json());

        console.log(await data);

        // check for error response
        if (!response.ok) {
          // error

          return;
        }
      })
      .catch((error) => {
        console.log("Error Updating Text");
        console.log(error);
      });
  };

  // #############################################################################

  const update = () => {
    const Text = {
      textStyle: {
        Italic: italic,
        Bold: bold,
        Color: color,
        Size: size,
        Align: align,
      },
      text: report,
      reportID: localStorage.getItem("draftReportId"),
      position: textPos,
    };

    console.log(Text);

    editText(Text);
  };

  let edit = false;
  let style__ = "w-full h-24 mt-2 p-2";

  if (props.data.block === null) {
    edit = true;
  } else {
    edit = false;
    // console.log(props.data);
    style__ =
      style__ +
      props.data.block.style[0].italic +
      props.data.block.style[0].bold +
      props.data.block.style[0].size +
      props.data.block.style[0].align +
      props.data.block.style[0].colour;

    style = style__;

    // console.log(style__);
  }

  return (
    <div>
      {!edit && (
        <div className="flex flex-col">
          <div className={style}>{props.data.block.text}</div>
          {/* <div className="flex flex-col mt-5 mb-5">
            <div className="flex justify-center align-middle">
              <button onClick={textEditorHandler}>
                <AiFillEdit style={icon_style} />
              </button>
            </div>
          </div> */}
        </div>
      )}
      {edit && (
        <div key={props.keyValue}>
          {editor && (
            <div className="flex flex-col">
              <div className="flex justify-center align-middle">
                <div className="flex flex-row w-1/3 justify-around pt-2  items-center">
                  <button onClick={italicHandler}>
                    <BiItalic style={icon_style} />
                  </button>{" "}
                  &nbsp;
                  <button onClick={boldHandler}>
                    <BiBold style={icon_style} />
                  </button>
                  &nbsp;{" "}
                  {alignLeft && (
                    <button onClick={() => alignHandler("left")}>
                      {" "}
                      <GrTextAlignLeft style={icon_style_2} />{" "}
                    </button>
                  )}
                  {alignRight && (
                    <button onClick={() => alignHandler("right")}>
                      {" "}
                      <GrTextAlignRight style={icon_style_2} />{" "}
                    </button>
                  )}
                  {alignCenter && (
                    <button onClick={() => alignHandler("center")}>
                      {" "}
                      <GrTextAlignCenter style={icon_style_2} />{" "}
                    </button>
                  )}
                  {alignJustify && (
                    <button onClick={() => alignHandler("justify")}>
                      {" "}
                      <BsJustify style={icon_style} />{" "}
                    </button>
                  )}
                  &nbsp;&nbsp;
                  <div className="flex flex-row">
                    <AiOutlineFontSize style={icon_style} />
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
                    <IoColorPaletteOutline style={icon_style} />
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
                  <textarea className={style} onChange={textHandler}></textarea>
                </div>

                <div className="w-1/6 flex text-center justify-center">
                  <button onClick={textEditorHandler}>
                    <MdDeleteOutline style={icon_style_3} />
                  </button>
                </div>
              </div>

              <button type="submit" onClick={update} className="mt-2">
                Update
              </button>
              <br />
            </div>
          )}

          {!editor && (
            <div className="flex flex-col mt-5 mb-5">
              <div className="flex justify-center align-middle">
                <button onClick={textEditorHandler}>
                  <AiFillEdit style={icon_style} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Text;
