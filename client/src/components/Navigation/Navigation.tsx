import { GoHome } from "react-icons/go";
import { BiHash } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
// import { FaRegClone } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsShare } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";
import { AiOutlineHistory } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Navigation(props: any) {
	// const style = { color: "#00ACDF" };
	const navigate = useNavigate();

	// style for the icons
	const style = { fontSize: "1.5rem", color: "#023E8A" };

	const logout = () => {
		// Logout in navigation calling logout in landing
		props.logout();
		navigate("/");
	};

	return (
		<div className="pt-2 text-lg fixed top-20 lg:w-40 sm:w-10 2xl:ml-14 xl:ml-3 md:ml-5">
			<nav>
				<div className="pt-4 flex flex-row" key={(1).toString()}>
					<Link to="/" className="flex flex-row">
						<div className="items-end pt">
							<GoHome style={style} />
							{/* <GoHome /> */}
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; Home</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row " key={(2).toString()}>
					<Link to="/explore" className="flex flex-row">
						<div className="items-end pt-1 ">
							<BiHash style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; Explore</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row " key={(3).toString()}>
					<Link to="/reports" className="flex flex-row">
						<div className="items-end pt-1 ">
							<TiDocumentText style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; Published</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row" key={(4).toString()}>
					<Link to="/drafts" className="flex flex-row">
						<div className="items-end pt-1 ">
							<RiDraftLine style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; Drafts</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row " key={(5).toString()}>
					<Link to="/shared" className="flex flex-row">
						<div className="items-end pt-1 ">
							<BsShare style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; Shared</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row " key={(6).toString()}>
					<Link to="/history" className="flex flex-row">
						<div className="items-end pt-1 ">
							<AiOutlineHistory style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; History</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row " key={(7).toString()}>
					<Link to="/profile" className="flex flex-row">
						<div className="items-end pt-1 ">
							<CgProfile style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">
							&nbsp; {localStorage.getItem("username")}
						</div>
					</Link>
				</div>

				<div className="pt-4 flex flex-row items-end">
					<button type="submit" className="flex flex-row" onClick={logout}>
						<div className="items-end pt-1 ">
							<HiOutlineLogin style={style} />
						</div>
						<div className="hidden lg:block text-xl text-[#023E8A] hover:text-[#03045E] hover:font-semibold">&nbsp; Logout</div>
					</button>
				</div>
			</nav>
		</div>
	);
}

export default Navigation;
