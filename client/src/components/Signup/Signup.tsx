import "./Signup.css";
import { BiErrorCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "../../api/Axios";
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
        } catch (error) {
            setError(true);
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
                    <Button
                        text="Sign Up"
                        size="large"
                        type="authentication"
                        testid="btn-submit"
                        disableId={
                            !validUsername || !validEmail || !validPassword || !validConfirmPassword
                                ? "true"
                                : "false"
                        }
                    />
                    <br />
                    <p className="text-[#03045E] text-md text-center">
                        Already have an account?
                        <button
                            data-testid="btn-signin"
                            type="submit"
                            className=" text-[#0096C7] "
                            onClick={signin}
                        >
                            &nbsp; Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
