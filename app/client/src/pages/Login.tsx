import "./styles/Login.css";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import axios from "../api/ConfigAxios";
import useAuth from "../hooks/useAuth";

interface LocationState {
	from: {
		pathname: string;
	};
}

function Login() {
	const navigate = useNavigate();
	const { setAuth, persist, setPersist } = useAuth();
	const controller = new AbortController();

	const isSignup = sessionStorage.getItem("isSignup") === "true";
	sessionStorage.removeItem("isSignup");
	const from = (useLocation().state as LocationState)?.from.pathname || "/";

	const [wrongCredentials, setWrongCredentialsStatus] = useState(false);
	const [rightCredentials, setRightCredentialsStatus] = useState(true);

	const [enteredEmail, changeenteredEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [enteredPassword, changeEnteredPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);

	const bStyle = { fontSize: "1.5rem", color: "red" };
	const aStyle = { fontSize: "3rem", color: "red" };
	const style = { fontSize: "1.5rem", color: "green" };

	const [loading, changeLoading] = useState(false);

	const loadingHandler = () => {
		changeLoading(!loading);
	};

	const loadIcon = (
		<svg
			role="status"
			className="inline mr-1 w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-gray-600 dark:fill-gray-300"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill"
			/>
		</svg>
	);

	useEffect(() => {
		setValidEmail(
			enteredEmail.length > 0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(enteredEmail)
		);
	}, [enteredEmail]);

	useEffect(() => {
		setValidPassword(enteredPassword.length > 0);
	}, [enteredPassword]);

	const togglePersist = () => {
		setPersist((prev: any) => !prev);
	};

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);

	const usernameHandler = (event: any) => {
		changeenteredEmail(event.target.value);
		setWrongCredentialsStatus(false);
		setRightCredentialsStatus(true);
	};

	const passwordHandler = (event: any) => {
		changeEnteredPassword(event.target.value);
		setWrongCredentialsStatus(false);
		setRightCredentialsStatus(true);
	};

	const checkCredentials = async (userCredentials: any) => {
		try {
			const response = await axios.post("login", JSON.stringify(userCredentials), {
				withCredentials: true,
				signal: controller.signal
			});

			changeLoading(false);

			if (from === "/") localStorage.setItem("page", "Home");
			else if (from === "/drafts") localStorage.setItem("page", "Drafts");
			else if (from === "/explore") localStorage.setItem("page", "Explore");
			else if (from === "/profile") localStorage.setItem("page", "Profile");
			else if (from === "/reports") localStorage.setItem("page", "Published Reports");
			else if (from === "/shared") localStorage.setItem("page", "Shared Reports");
			else if (from === "/history") localStorage.setItem("page", "Search History");

			const { username } = response.data;
			const { accessToken } = response.data;
			const { email } = response.data;
			const { apiKey } = response.data;
			const { profileKey } = response.data;

			await setAuth({ username, accessToken, email, apiKey, profileKey });
			navigate(from, { replace: true });
		} catch (err) {
			if ((err as Error).message === "Request failed with status code 401") {
				setWrongCredentialsStatus(true);
				setRightCredentialsStatus(false);
				changeLoading(false);
			} else {
				setWrongCredentialsStatus(false);
				setRightCredentialsStatus(false);
				changeLoading(false);
			}
		}
	};

	const submitHandler = (event: any) => {
		event.preventDefault();

		loadingHandler();

		const userDetails = {
			email: enteredEmail,
			password: enteredPassword
		};

		checkCredentials(userDetails);
	};

	const signup = (event: any) => {
		event.preventDefault();
		navigate("/signup");
	};

	return (
		<div
			data-testid="login"
			className="flex justify-center flex-col  items-center h-screen w-screen"
		>
			<div>
				<Logo width="136px" height="121px" page="login" />
			</div>
			<br />
			<div>
				<h1 className="text-[#023E8A] text-center text-xl font-bold">
					Sign in to <br />
					Twitter Summariser
				</h1>
			</div>
			{!isSignup && <br />}
			{isSignup && (
				<div className="flex flex-row border-2 border-green-700 rounded-md bg-green-300 h-auto mini-tablet:w-auto w-60 m-4 mb- p-2">
					<AiOutlineCheckCircle style={style} className="mini-tablet:mt-0 mt-3" />
					<p className="pl-5 items-center justify-center">
						Ready to Explore Twitter Summarizer
					</p>
				</div>
			)}
			{wrongCredentials && (
				<div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-60 m-4 mb-5 p-2">
					<BiErrorCircle style={bStyle} />
					<p className="pl-2 items-center justify-center">Invalid email or password</p>
				</div>
			)}

			{!wrongCredentials && !rightCredentials && (
				<div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-15 w-60 m-2 mb-5 pb-5 pl-2">
					<BiErrorCircle style={aStyle} className="mini-tablet:mt- mt-3" />
					<p className="pl-5 pt-3 items-center justify-center">
						Something went wrong. Please try again later.
					</p>
				</div>
			)}
			<div>
				<form onSubmit={submitHandler} autoComplete="new-password" action="">
					<input
						data-testid="username-input"
						type="text"
						placeholder="Email"
						required
						className="w-60 h-10 mb-6 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
						onChange={usernameHandler}
						value={enteredEmail}
						onFocus={() => setEmailFocus(true)}
						onBlur={() => setEmailFocus(false)}
					/>
					{emailFocus && enteredEmail && !validEmail && (
						<div className="flex flex-row border-2 rounded-md bg-gray-100 h-10 w-60 justify-center p-2 mb-0 items-center text-sm">
							<div className="flex flex-col">
								<p>Should be a valid email</p>
							</div>
						</div>
					)}
					<br />
					<input
						data-testid="password-input"
						type="password"
						placeholder="Password"
						required
						className="w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A]"
						onChange={passwordHandler}
						value={enteredPassword}
					/>
					<br /> <br />
					<div className="flex items-center mb-4">
						<input
							id="default-checkbox"
							type="checkbox"
							onChange={togglePersist}
							checked={persist}
							className="w-5 h-5 text-blue-600 accent-dark-cornflower-blue border rounded-md focus:ring focus:outline-none"
						/>
						<label htmlFor="default-checkbox" className="ml-2 text-sm font-medium">
							Remember this device?
						</label>
					</div>
					{loading && (
						<button
							type="button"
							className="flex flex-col bg-dark-cornflower-blue rounded-full text-white  font-semibold opacity-50 group hover:shadow button_large text-lg justify-center h-10 w-full items-center"
							disabled
						>
							{/* <svg
									className="animate-spin h-5 w-5 mr-3 bg-white"
									viewBox="0 0 24 24"
								> */}
							{/* <!-- ... --> */}
							{/* </svg> */}
							{loadIcon}
						</button>
					)}
					{!loading && (
						<Button
							text="Login"
							size="large"
							type="authentication"
							testid="btn-submit"
							disableId={!validEmail || !validPassword ? "true" : "false"}
						/>
					)}
					<p className="text-[#03045E] text-md text-center mt-6 font-medium">
						Do not have an account?
						<button
							data-testid="btn-signup"
							type="submit"
							className="text-[#0096C7] hover:text-[#03045E]"
							onClick={signup}
						>
							&nbsp; Sign up
						</button>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
