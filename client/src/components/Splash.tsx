import "./styles/Splash.css";
import Logo from "./Logo";

import { useNavigate } from "react-router-dom";
import Button from "./Button";

// import { useNavigate } from "react-router-dom";

function Splash(props: any) {
	const navigate = useNavigate();

	// const signup = (event: any) => {
	// 	event.preventDefault();

	// 	const sign = {
	// 		signup: true
	// 	};

	// 	props.takeToSignupPage(sign);
	// 	// navigate("/signup");
	// };

	// const signin = (event: any) => {
	// 	event.preventDefault();

	// 	props.takeToSigninPage();
	// 	// navigate("/login")
	// };

	const loginHandler = () => {
		navigate("/login");
	};

	const signUpHandler = () => {
		navigate("/signup");
	};

	return (
		<div data-testid="splash" className="flex justify-center flex-col items-center h-screen">
			<div>
				<Logo width="136px" height="121px" page="login" />
			</div>

			<br />

			<div>
				<h1 className="text-3xl hidden lg:block">Welcome</h1>
			</div>
			{/* <br /> */}
			{/* unacceptable name notification */}
			{/*  */}
			<div>
				<div className="flex flex-row">&nbsp;</div>
				<Button
					text="Sign Up"
					size="large"
					handle={signUpHandler}
					type="signUp"
				/>

				<br />
				<p className="text-sm text-center">Already have an account? </p>
				<Button
					text="Login"
					size="large"
					handle={loginHandler}
					type="login"
				/>
			</div>
		</div>
	);
}

export default Splash;
