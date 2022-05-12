// importing icons for the navigation
import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { FaRegClone } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsShare } from "react-icons/bs";

function Navigation() {
  // const style = { color: "#00ACDF" };

  // style for the icons
  const style = { fontSize: "1.5rem" };

  return (
    <div className="pt-2 text-lg fixed top-20 w-80 ml-14">
      <div className="pt-4 flex flex-row ">
        <div className="items-end pt ">
          <GoHome style={style} />
          {/* <GoHome /> */}
        </div>
        &nbsp; Home
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <BiHash style={style} />
        </div>
        &nbsp; Explore
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <TiDocumentText style={style} />
        </div>
        &nbsp; Reports
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <FaRegClone style={style} />
        </div>
        &nbsp; Cloned Reports
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <RiDraftLine style={style} />
        </div>
        &nbsp; Drafts
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <BsShare style={style} />
        </div>
        &nbsp; Shared
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <CgProfile style={style} />
        </div>
        &nbsp; Gabriel
      </div>
    </div>
  );
}

export default Navigation;
