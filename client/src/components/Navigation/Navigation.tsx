import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
// import { FaRegClone } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsShare } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";

function Navigation(props: any) {
  // const style = { color: "#00ACDF" };

  // style for the icons
  const style = { fontSize: "1.5rem" };

  return (
    <div className="pt-2 text-lg fixed top-20 w-80 2xl:ml-14 xl:ml-3 md:ml-5  h-screen">
      <div className="pt-4 flex flex-row " key={(1).toString()}>
        <button
          type="submit"
          onClick={() => props.onNavigateOption(1)}
          className="flex flex-row"
        >
          <div className="items-end pt ">
            <GoHome style={style} />
            {/* <GoHome /> */}
          </div>
          <div className="hidden lg:block">&nbsp; Home</div>
        </button>
      </div>

      <div className="pt-4 flex flex-row " key={(2).toString()}>
        <button
          type="submit"
          onClick={() => props.onNavigateOption(2)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <BiHash style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; Explore</div>
        </button>
      </div>

      <div className="pt-4 flex flex-row " key={(3).toString()}>
        <button
          type="submit"
          onClick={() => props.onNavigateOption(3)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <TiDocumentText style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; My Reports</div>
        </button>
      </div>

      {/* <div className="pt-4 flex flex-row ">
        <button
          type="submit"
          onClick={() => props.onNavigateOption(4)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <FaRegClone style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; Cloned Reports</div>
        </button>
      </div> */}

      <div className="pt-4 flex flex-row" key={(4).toString()}>
        <button
          type="submit"
          onClick={() => props.onNavigateOption(5)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <RiDraftLine style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; Drafts</div>
        </button>
      </div>

      <div className="pt-4 flex flex-row " key={(5).toString()}>
        <button
          type="submit"
          onClick={() => props.onNavigateOption(6)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <BsShare style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; Shared</div>
        </button>
      </div>

      <div className="pt-4 flex flex-row " key={(6).toString()}>
        <button
          type="submit"
          onClick={() => props.onNavigateOption(7)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <CgProfile style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; Gabriel</div>
        </button>
      </div>

      <div className="pt-4 flex flex-row items-end">
        <button
          type="submit"
          onClick={() => props.onNavigateOption(9)}
          className="flex flex-row"
        >
          <div className="items-end pt-1 ">
            <HiOutlineLogin style={style} />
          </div>
          <div className="hidden lg:block">&nbsp; Logout</div>
        </button>
      </div>
    </div>
  );
}

export default Navigation;
