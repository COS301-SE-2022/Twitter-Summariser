import "./Signup.css";
import { BiErrorCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "../../api/axios";

function Signup(props: any) {
    const [enteredUsername, changeEnteredUsername] = useState("");
    const [enteredEmail, changeEnteredEmail] = useState("");
    const [enteredPassword, changeEnteredPassword] = useState("");
    const [enteredConfirmPassword, changeEnteredConfirmPassword] = useState("");

    const usernameHandler = (event: any) => {
        changeEnteredUsername(event.target.value);
    };

    const emailHandler = (event: any) => {
        changeEnteredEmail(event.target.value);
    };

    const passwordHandler = (event: any) => {
        changeEnteredPassword(event.target.value);
    };

    const passwordConfirmHandler = (event: any) => {
        changeEnteredConfirmPassword(event.target.value);
    };

    const signup = async (userValidatedData: any) => {
        try {
            await axios.post("signup",
                JSON.stringify(userValidatedData), {
                withCredentials: true
            });
            await props.readyToLogIN();
        }
        catch (error) {

        }
    };

    // #############################################################################

    // ########## CHECKING PASSWORD INPUT ################
    // creating variables for security checks
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validLength, setValidLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [match, setMatch] = useState(false);

    useEffect(() => {
        setValidName(enteredUsername.length >= 2);
        setValidEmail(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                enteredEmail
            )
        );
        setValidLength(enteredPassword.length >= 8);
        setUpperCase(enteredPassword.toLowerCase() !== enteredPassword);
        setLowerCase(enteredPassword.toUpperCase() !== enteredPassword);
        setHasNumber(/\d/.test(enteredPassword));
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(enteredPassword));
        setMatch(!!(enteredPassword && enteredPassword === enteredConfirmPassword));
    }, [enteredUsername, enteredEmail, enteredPassword, enteredConfirmPassword]);

    const [errorStatus, setError] = useState(false);
    const style = { fontSize: "2rem", color: "orange" };

    const submitHandler = (event: any) => {
        event.preventDefault();

        // ######## CHECK DATABASE FOR EXISTING EMAIL ######## .... to do ....

        // ###################################################

        const userDetails = {
            email: enteredEmail,
            username: enteredUsername,
            password: enteredPassword
        };

        if (
            validName === false ||
            validLength === false ||
            hasNumber === false ||
            upperCase === false ||
            lowerCase === false ||
            specialChar === false ||
            match === false
        ) {
            // console.log("It's false");

            setError(true);
        } else {
            setError(false);
            // console.log(userDetails);

            signup(userDetails);
        }
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
            {/* unacceptable notification */}
            {errorStatus && (
                <div className="flex flex-row border-2 border-orange-700 rounded-md bg-orange-300 h-auto w-auto m-4 mb-5 p-2 items-center">
                    <div className="p-2">
                        <BiErrorCircle style={style} />
                    </div>

                    <div className="flex flex-col">
                        {!validName && <p>Name should be more than 2 letters</p>}
                        {!validEmail && <p>Please use a valid email address</p>}
                        {!validLength && <p>password must be more than 8 characters</p>}
                        {!specialChar && (
                            <p>password must contain number, letters and special characters </p>
                        )}
                        {!upperCase && <p>password should have Uppercase</p>}
                        {!lowerCase && <p>password should have Lowercase</p>}
                        {!match && <p>password must match</p>}
                    </div>
                </div>
            )}
            {/*  */}
            <div>
                <form
                    onSubmit={submitHandler}
                    action=""
                    className="flex justify-center items-center flex-col"
                >
                    <input
                        data-testid="name-input"
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        className="w-56 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                        onChange={usernameHandler}
                        value={enteredUsername}
                    />
                    <br />

                    <input
                        data-testid="email-input"
                        type="text"
                        placeholder="Email"
                        autoComplete="off"
                        className="mb-3 w-56 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E] mb-6"
                        onChange={emailHandler}
                        value={enteredEmail}
                    />

                    <div className="flex md:flex-row flex-col mb-3">
                        <input
                            data-testid="password-input"
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                            onChange={passwordHandler}
                            value={enteredPassword}
                        />
                        &nbsp;
                        <input
                            data-testid="confirm-password-input"
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            className="mb-3 w-56 h-10 border-gray-200 border rounded-md text-center text-md focus:outline-none focus:ring focus:border-[#023E8A] focus:text-[#03045E]"
                            onChange={passwordConfirmHandler}
                            value={enteredConfirmPassword}
                        />
                    </div>
                    <Button text="Sign Up" size="large" type="authentication" testid="btn-submit" />
                    <br />
                    <p className="text-[#03045E] text-md text-center">
                        Already have an account?
                        <button
                            data-testid="btn-signin"
                            type="submit"
                            className=" text-[#0096C7] hover:text-[#03045E]"
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
