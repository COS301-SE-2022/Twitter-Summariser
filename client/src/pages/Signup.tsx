import "./styles/Signup.css";
import { BiErrorCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";
import axios from "../api/ConfigAxios";
import { AxiosError } from "axios";

function Signup(props: any) {
    const [enteredUsername, changeEnteredUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [enteredEmail, changeEnteredEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [enteredPassword, changeEnteredPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [enteredConfirmPassword, changeEnteredConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorStatus, setError] = useState(false);
    const style = { fontSize: "2rem", color: "red" };

    // handling loading things.........
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
        setValidUsername(/^[a-zA-Z0-9]{4,16}$/.test(enteredUsername));
        setError(false);
    }, [enteredUsername]);

    useEffect(() => {
        setValidEmail(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                enteredEmail
            )
        );
        setError(false);
    }, [enteredEmail]);

    useEffect(() => {
        setValidPassword(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                enteredPassword
            )
        );
        setValidConfirmPassword(enteredPassword === enteredConfirmPassword);
        setError(false);
    }, [enteredPassword, enteredConfirmPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [enteredUsername, enteredEmail, enteredPassword, enteredConfirmPassword]);

    const signup = async (userValidatedData: any) => {
        setErrorMessage("");
        setError(false);
        try {
            await axios.post("signup", JSON.stringify(userValidatedData), {
                withCredentials: true
            });
            await props.readyToLogIN();
            changeLoading(false);
        } catch (error) {
            setError(true);
            changeLoading(false);
            if ((error as AxiosError).request.status === 0) {
                setErrorMessage("Something went wrong. Please try again later.");
            } else {
                setErrorMessage(JSON.parse((error as AxiosError).request.response).error);
            }
        }
    };

    const submitHandler = (event: any) => {
        event.preventDefault();
        const userDetails = {
            email: enteredEmail,
            username: enteredUsername,
            password: enteredPassword
        };
        loadingHandler();
        signup(userDetails);
    };

    const signin = (event: any) => {
        event.preventDefault();
        props.takeToSigninPage();
    };

    return (
        <div
            data-testid="signup"
            className="flex justify-center flex-col flex-row items-center h-screen w-screen"
        >
            <div>
                <Logo width="136px" height="121px" page="login" />
            </div>
            <br />
            <div>
                <h1 className="text-[#023E8A] text-center text-xl font-bold">Create new account</h1>
            </div>
            <br />
            <div>
                {errorStatus && (
                    <div className="flex flex-row border-2 border-red-500 rounded-md bg-red-300 h-auto w-60 m-4 mb-5 p-2">
                        <BiErrorCircle style={style} />
                        <p className="p-1 pl-2">{errorMessage}</p>
                    </div>
                )}
                <form
                    onSubmit={submitHandler}
                    action=""
                    className="flex flex-col justify-center items-center "
                >
                    <input
                        data-testid="name-input"
                        type="text"
                        required
                        placeholder="Username"
                        autoComplete="off"
                        className={
                            validUsername && enteredUsername
                                ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-green-200"
                                : !validUsername && enteredUsername
                                    ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-red-200"
                                    : "w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                        }
                        onChange={(event) => changeEnteredUsername(event.target.value)}
                        value={enteredUsername}
                        aria-invalid={validUsername ? "true" : "false"}
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                    {usernameFocus && enteredUsername && !validUsername && (
                        <div className="instructions flex flex-row border-2 rounded-md mt-4 bg-gray-100 h-auto w-60 p-2 justify-center items-center text-sm">
                            <div className="flex flex-col">
                                <p className="items-center justify-center">
                                    Username should be 4-16 characters and alphanumeric
                                </p>
                            </div>
                        </div>
                    )}
                    <br />
                    <input
                        data-testid="email-input"
                        type="text"
                        placeholder="Email"
                        autoComplete="off"
                        className={
                            validEmail && enteredEmail
                                ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-green-200 mb-6"
                                : !validEmail && enteredEmail
                                    ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-red-200 mb-6"
                                    : "w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] mb-6"
                        }
                        onChange={(event) => changeEnteredEmail(event.target.value)}
                        value={enteredEmail}
                        aria-invalid={validEmail ? "true" : "false"}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    {emailFocus && enteredEmail && !validEmail && (
                        <div className="flex flex-row border-2 rounded-md bg-gray-100 h-10 w-60 justify-center p-2 mb-4 items-center text-sm">
                            <div className="flex flex-col">
                                <p>Should be a valid email</p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-row flex-col mb-3">
                        <input
                            data-testid="password-input"
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            className={
                                validPassword && enteredPassword
                                    ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-green-200"
                                    : !validPassword && enteredPassword
                                        ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-red-200"
                                        : "w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                            }
                            onChange={(event) => changeEnteredPassword(event.target.value)}
                            value={enteredPassword}
                            aria-invalid={validPassword ? "true" : "false"}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        {passwordFocus && enteredPassword && !validPassword && (
                            <div className="flex flex-row border-2 rounded-md bg-gray-100 h-auto w-60 mini-tablet:w-auto p-2 mt-4 items-center text-sm">
                                <div className="flex flex-col">
                                    <p>
                                        <strong>Password should be: </strong>
                                    </p>
                                    <ul>
                                        <li>A Minimum of eight 10 characters</li>
                                        <li>At least one uppercase letter</li>
                                        <li>At least one lowercase letter</li>
                                        <li>At least one number</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        &nbsp;
                        <input
                            data-testid="confirm-password-input"
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            className={
                                validConfirmPassword && enteredConfirmPassword
                                    ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-green-200 mb-3"
                                    : !validConfirmPassword && enteredConfirmPassword
                                        ? "w-60 h-10 border-gray-200 border-2 rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] border-red-200 mb-3"
                                        : "w-60 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] mb-3"
                            }
                            onChange={(event) => changeEnteredConfirmPassword(event.target.value)}
                            value={enteredConfirmPassword}
                            aria-invalid={validPassword ? "true" : "false"}
                            onFocus={() => setConfirmPasswordFocus(true)}
                            onBlur={() => setConfirmPasswordFocus(false)}
                        />
                    </div>
                    {((confirmPasswordFocus && enteredConfirmPassword && !validConfirmPassword) ||
                        (!confirmPasswordFocus &&
                            !validConfirmPassword &&
                            enteredConfirmPassword)) && (
                            <div className="flex flex-col flex-row border-2 rounded-md bg-gray-100 h-auto w-60 p-2 mb-4 items-center text-sm">
                                <div className="flex flex-col">
                                    <p>The passwords do not match</p>
                                </div>
                            </div>
                        )}
                    {loading && (
                        <button
                            type="button"
                            className="flex flex-col bg-dark-cornflower-blue rounded-lg text-white  font-semibold opacity-50  group hover:shadow button_large text-lg justify-center h-10 w-full items-center"
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
                            text="Sign Up"
                            size="large"
                            type="authentication"
                            testid="btn-submit"
                            disableId={
                                !validUsername ||
                                    !validEmail ||
                                    !validPassword ||
                                    !validConfirmPassword
                                    ? "true"
                                    : "false"
                            }
                        />
                    )}
                    <br />
                    <p className="text-[#03045E] text-md text-center">
                        Already have an account?

                        &nbsp; <a href="login">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
