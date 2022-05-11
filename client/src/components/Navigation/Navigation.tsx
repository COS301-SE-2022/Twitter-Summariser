import React from "react";

// importing icons for the navigation
import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { FaRegClone } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  return (
    <div className="pt-2 text-sm">
      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <GoHome />
        </div>
        &nbsp; Home
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <BiHash />
        </div>
        &nbsp; Explore
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <TiDocumentText />
        </div>
        &nbsp; Reports
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <FaRegClone />
        </div>
        &nbsp; Cloned Reports
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <RiDraftLine />
        </div>
        &nbsp; Drafts
      </div>

      <div className="pt-4 flex flex-row ">
        <div className="items-end pt-1 ">
          <CgProfile />
        </div>
        &nbsp; Profile
      </div>
    </div>
  );
};

export default Navigation;
