import "./Login.css";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/Axios";


function Login(props: any) {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [wrongCredentials, setWrongCredentialsStatus] = useState(false);
    const [rightCredentials, setRightCredentialsStatus] = useState(true);

    const [enteredEmail, changeenteredEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [enteredPassword, changeEnteredPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const bStyle = { fontSize: "1.5rem", color: "red" };
    const aStyle = { fontSize: "3rem", color: "red" };
    const style__ = { fontSize: "1.5rem", color: "green" };

    useEffect(() => {
        setValidEmail(enteredEmail.length > 0 && enteredEmail.includes("@"));
    }, [enteredEmail]);

    useEffect(() => {
        setValidPassword(enteredPassword.length > 0);
    }, [enteredPassword]);

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
                withCredentials: true
            });

            setIsAuthenticated(response.data);
            props.userLoginDetails({
                ...response.data,
                login: "true"
            });
            localStorage.setItem("page", "Home");
        } catch (err) {
            if ((err as Error).message === "Request failed with status code 401") {
                setWrongCredentialsStatus(true);
                setRightCredentialsStatus(false);
            } else {
                setWrongCredentialsStatus(false);
                setRightCredentialsStatus(false);
            }
        }
    };

    const submitHandler = (event: any) => {
        event.preventDefault();
        localStorage.clear();
        const userDetails = {
            email: enteredEmail,
            password: enteredPassword
        };
        checkCredentials(userDetails);
    };

    const signup = (event: any) => {
        event.preventDefault();
        const sign = { signup: true };
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
            <br />
            <div>
                <h1 className="text-[#023E8A] text-center text-xl font-bold">
                    Sign in to <br></br>Twitter Summariser
                </h1>
            </div>
            {rightCredentials && (
                <div>
                    <br />
                </div>
            )}
            {localStorage.getItem("newUser") && (
                <div className="flex flex-row border-2 border-green-700 rounded-md bg-green-300 h-auto mini-tablet:w-auto w-60 m-4 mb- p-2">
                    <AiOutlineCheckCircle style={style__} className="mini-tablet:mt-0 mt-3" />
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
                        autoComplete="off"
                        required
                        className="w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                        onChange={usernameHandler}
                        value={enteredEmail}
                    />
                    <br /> <br />
                    <input
                        data-testid="password-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                        className="w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A]"
                        onChange={passwordHandler}
                        value={enteredPassword}
                    />
                    <br />
                    <br />
                    <Button
                        text="Login"
                        size="large"
                        type="authentication"
                        testid="btn-submit"
                        disableId={!validEmail || !validPassword ? "true" : "false"}
                    />
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
