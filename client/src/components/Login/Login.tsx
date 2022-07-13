import "./Login.css";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { useState } from "react";
import Logo from "../Logo/Logo";

// importing link
import link from "../../resources/links.json";
import Button from "../Button/Button";

function Login(props: any) {
    // const navigate = useNavigate();
    const [wrongCredentials, setWrongCredentialsStatus] = useState(false);
    const [rightCredentials, setRightCredentialsStatus] = useState(true);

    const style = { fontSize: "1.5rem", color: "red" };
    const style__ = { fontSize: "1.5rem", color: "green" };

    // username retrieval
    const [enteredUsername, changeEnteredUsername] = useState("");

    // username retrieval update
    const usernameHandler = (event: any) => {
        changeEnteredUsername(event.target.value);
        setWrongCredentialsStatus(false);
        setRightCredentialsStatus(true);
    };

    // password retrieval
    const [enteredPassword, changeEnteredPassword] = useState("");

    // password retrieval update
    const passwordHandler = (event: any) => {
        changeEnteredPassword(event.target.value);
        setWrongCredentialsStatus(false);
        setRightCredentialsStatus(true);
    };

    // ######################### API FOR LOGGING USERS IN ###############################################

    let loginEndpoint =
        process.env.NODE_ENV === "development"
            ? String(link.localhostLink)
            : String(link.serverLink);
    loginEndpoint += "login";

    const checkCredentials = (userCredentials: any) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(userCredentials)
        };

        fetch(loginEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");

                const data = isJson && (await response.json());

                // check for error response
                if (!response.ok) {
                    // error
                    setWrongCredentialsStatus(true);
                    setRightCredentialsStatus(false);
                    changeEnteredUsername("");
                    changeEnteredPassword("");
                } else {
                    // success
                    props.userLoginDetails(
                        await {
                            ...data,
                            login: "true"
                        }
                    );
                    localStorage.setItem("page", "Home");
                }
            })
            .catch(() => {
                setWrongCredentialsStatus(false);
                setRightCredentialsStatus(false);
            });
    };

    // #######################################################################

    const submitHandler = (event: any) => {
        event.preventDefault();
        localStorage.clear();
        const userDetails = {
            email: enteredUsername,
            password: enteredPassword
        };

        checkCredentials(userDetails);
    };

    const signup = (event: any) => {
        event.preventDefault();

        const sign = {
            signup: true
        };

        props.takeToSignupPage(sign);
    };

    return (
        <div
            data-testid="login"
            className="flex justify-center flex-col flex-row items-center h-screen w-screen"
        >
            <div>
                <Logo width="136px" height="121px" page="login" />
            </div>
            <div>
                <h1 className="text-[#023E8A] text-center text-xl font-bold">
                    Sign in to <br></br>Twitter Summariser
                </h1>
            </div>
            {rightCredentials && (
                <div>
                    <br />
                    {/* <br /> */}
                </div>
            )}
            {localStorage.getItem("newUser") && (
                <div className="flex flex-row border-2 border-green-700 rounded-md bg-green-300 h-auto w-auto m-4 mb- p-2">
                    <AiOutlineCheckCircle style={style__} />
                    <p>Ready to Explore Twitter Summarizer</p>
                </div>
            )}
            {wrongCredentials && (
                <div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-auto m-4 mb-5 p-2">
                    <BiErrorCircle style={style} />
                    <p>Invalid username or password</p>
                </div>
            )}
            <div>
                <form onSubmit={submitHandler} action="">
                    <input
                        data-testid="username-input"
                        type="text"
                        placeholder=" Email"
                        className="w-56 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                        onChange={usernameHandler}
                        value={enteredUsername}
                    />
                    <br /> <br />
                    <input
                        data-testid="password-input"
                        type="password"
                        placeholder="Password"
                        className=" w-56 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A]"
                        onChange={passwordHandler}
                        value={enteredPassword}
                    />
                    <br />
                    <br />
                    {/* <button
						data-testid="btn-submit"
						type="submit"
						className="button__login text-lg p-0.5 h-10 w-56 bg-dark-cornflower-blue rounded-full text-[#D5F3F9] hover:bg-[#03045E] group hover:shadow"
					>
						Login
					</button> */}
                    <Button text="Login" size="large" handle={submitHandler} type="login" />
                    {/* <br /> */}
                    <br />
                    <p className="text-[#03045E] text-md text-center">
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