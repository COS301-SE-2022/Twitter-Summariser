import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsShare } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";
import { AiOutlineHistory } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function MobileNavigation(props: any) {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // style for the icons
    const style = { fontSize: "1.5rem" };

    const pageHandler = (prop: string) => {
        localStorage.setItem("page", prop);
        props.handle();
    };

    const logout = async () => {
        localStorage.clear();
        const controller = new AbortController();
        try {
            await axiosPrivate.get("logout", { signal: controller.signal });
        } catch (error) { }
        setAuth(null);
        navigate("/login");
    };

    return (
        <div className="pt-2 text-lg top-20 w-full flex flex-col justify-between z-20">
            <div className="pt-4 flex flex-row border-b border-gray-200" key={(7).toString()}>
                <Link
                    to="/profile"
                    className="flex flex-col"
                    onClick={() => pageHandler("Profile")}
                >
                    <div className="items-end pl-4 ">
                        <CgProfile style={style} />
                    </div>
                    <div className=" font-bold mt-1 pl-4">{localStorage.getItem("username")}</div>
                    <div className=" font-light italic text-sm pl-4 mb-1">
                        {localStorage.getItem("email")}
                    </div>
                </Link>
            </div>

            <div>&nbsp;</div>

            <nav className=" flex flex-col pl-4">
                <div className="pt-4 flex flex-row " key={(1).toString()}>
                    <Link to="/" className="flex flex-row" onClick={() => pageHandler("Home")}>
                        <div className="items-end pt ">
                            <GoHome style={style} />
                            {/* <GoHome /> */}
                        </div>
                        <div>&nbsp; Home</div>
                    </Link>
                </div>

                <div className="pt-4 flex flex-row " key={(2).toString()}>
                    <Link
                        to="/explore"
                        className="flex flex-row"
                        onClick={() => pageHandler("Explore")}
                    >
                        <div className="items-end pt-1 ">
                            <BiHash style={style} />
                        </div>
                        <div>&nbsp; Explore</div>
                    </Link>
                </div>

                <div className="pt-4 flex flex-row " key={(3).toString()}>
                    <Link
                        to="/reports"
                        className="flex flex-row"
                        onClick={() => pageHandler("Published")}
                    >
                        <div className="items-end pt-1 ">
                            <TiDocumentText style={style} />
                        </div>
                        <div>&nbsp; Published</div>
                    </Link>
                </div>

                <div className="pt-4 flex flex-row" key={(4).toString()}>
                    <Link
                        to="/drafts"
                        className="flex flex-row"
                        onClick={() => pageHandler("Drafts")}
                    >
                        <div className="items-end pt-1 ">
                            <RiDraftLine style={style} />
                        </div>
                        <div>&nbsp; Drafts</div>
                    </Link>
                </div>

                <div className="pt-4 flex flex-row " key={(5).toString()}>
                    <Link
                        to="/shared"
                        className="flex flex-row"
                        onClick={() => pageHandler("Shared Reports")}
                    >
                        <div className="items-end pt-1 ">
                            <BsShare style={style} />
                        </div>
                        <div>&nbsp; Shared</div>
                    </Link>
                </div>

                <div className="pt-4 flex flex-row " key={(6).toString()}>
                    <Link
                        to="/history"
                        className="flex flex-row"
                        onClick={() => pageHandler("Search History")}
                    >
                        <div className="items-end pt-1 ">
                            <AiOutlineHistory style={style} />
                        </div>
                        <div>&nbsp; History</div>
                    </Link>
                </div>

                <div className="pt-4 flex flex-row items-end">
                    <button type="submit" className="flex flex-row" onClick={logout}>
                        <div className="items-end pt-1 ">
                            <HiOutlineLogin style={style} />
                        </div>
                        <div>&nbsp; Logout</div>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default MobileNavigation;
