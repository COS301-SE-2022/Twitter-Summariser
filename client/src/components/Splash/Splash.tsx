import "./Splash.css";
import Logo from "../Logo/Logo";

// import { useNavigate } from "react-router-dom";

function Splash(props: any) {
	// const navigate = useNavigate();

	const signup = (event: any) => {
		event.preventDefault();

		const sign = {
			signup: true
		};

		props.takeToSignupPage(sign);
		// navigate("/signup");
	};

	const signin = (event: any) => {
		event.preventDefault();

		props.takeToSigninPage();
		// navigate("/login")
	};

	return (
		<div data-testid="splash" className="flex justify-center flex-col items-center h-screen">
			<div>
				<Logo width="136px" height="121px" page="login" />
			</div>

			<div>
				<h1 className="text-center text-xl font-bold">Welcome to Twitter Summariser</h1>
			</div>
			<br />
			{/* unacceptable name notification */}
			{/*  */}
			<div>
				<div className="flex flex-row">&nbsp;</div>
				{/* <Link to="/signup">
            <button
              data-testid="btn-signup"
              className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
            >
              Sign up
            </button>
          </Link> */}
				<button
					data-testid="btn-signup"
					type="submit"
					className=" text-sky-500"
					onClick={signup}
				>
					&nbsp; Sign up
				</button>

				<br />
				<p className="text-sm text-center">Already have an account? </p>
				{/* <Link to="/login">
            <button
              data-testid="btn-login"
              className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
            >
              Login
            </button>
          </Link> */}
				<button
					data-testid="btn-signin"
					type="submit"
					className=" text-sky-500"
					onClick={signin}
				>
					&nbsp; Log in
				</button>
			</div>
		</div>
	);
}

export default Splash;
