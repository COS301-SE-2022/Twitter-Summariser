import { useState, useEffect } from "react";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./index.css";

// main Application component in which different page sub-components will be contained
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [userApi, changeUserApi] = useState("");

    useEffect(() => {
        const storageUserLoggedInInformation = localStorage.getItem("key");
        if (storageUserLoggedInInformation) {
            setIsLoggedIn(true);
        }
    }, []);

    // retrieving user login details
    const loginHandler = (props: any) => {
        if (props.login === "true") {
            localStorage.setItem("key", props.apiKey);
            localStorage.setItem("username", props.username);
            localStorage.setItem("email", props.email);
            setIsLoggedIn(true);
            setSignupPage(false);
            changeUserApi(props.apiKey);
        }
    };

    const signUpPage = () => {
        setIsLoggedIn(false);
        setSignupPage(true);
    };

    const logInPage = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setSignupPage(false);
    };

    const readyToLog = () => {
        localStorage.setItem("newUser", "true");
        setSignupPage(false);
    };

    return (
        <div className="">
            {!localStorage.getItem("key") && !signupPage && (<Login userLoginDetails={loginHandler} takeToSignupPage={signUpPage} />)}

            {/* Signup */}
            {signupPage && <Signup takeToSigninPage={logInPage} readyToLogIN={readyToLog} />}

            {/* Entry here based on Signup and Login decision  */}
            {isLoggedIn && <Landing userAPI={userApi} takeToSigninPage={logInPage} />}
        </div>
    );
}

export default App;
