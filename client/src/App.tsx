import { useState, useEffect } from "react";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
// import Splash from "./components/Splash/Splash";
import "./index.css";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// main Application component in which different page sub-components will be contained
function App() {
    // const navigate = useNavigate();
    localStorage.setItem(
        "endpointLink",
        "https://3vdykbiva3.execute-api.us-east-1.amazonaws.com/dev/"
    );

    // const [loginPage, setLoginPage] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [userApi, changeUserApi] = useState("");

    useEffect(() => {
        const storageUserLoggedInInformation = localStorage.getItem("loggedUserApi");

        if (storageUserLoggedInInformation) {
            setIsLoggedIn(true);
        }
    }, []);

    // retrieving user login details
    const loginHandler = (props: any) => {
        if (props.login === "true") {
            localStorage.setItem("loggedUserApi", props.apiKey);
            localStorage.setItem("loggedUserName", props.username);
            localStorage.setItem("loggedUserEmail", props.email);
            setIsLoggedIn(true);
            setSignupPage(false);
            changeUserApi(props.apiKey);
        }
    };

    const signUpPage = () => {
        localStorage.setItem("loggedUserApi", "0");
        setIsLoggedIn(false);
        setSignupPage(true);

        changeUserApi("");
    };

    const logInPage = () => {
        localStorage.removeItem("loggedUserApi");
        localStorage.removeItem("loggedUserName");
        localStorage.removeItem("loggedUserEmail");
        localStorage.removeItem("id");
        localStorage.removeItem("resultSetId");
        localStorage.removeItem("draftReportId");
        setIsLoggedIn(false);
        setSignupPage(false);

        changeUserApi("");
    };

    const readyToLog = () => {
        localStorage.removeItem("loggedUserApi");
        localStorage.setItem("newUser", "true");
        setSignupPage(false);
    };

    return (
        <div className="">
            {/* Login */}
            {!localStorage.getItem("loggedUserApi") && (
                <Login userLoginDetails={loginHandler} takeToSignupPage={signUpPage} />
            )}

            {/* Signup */}
            {signupPage && <Signup takeToSigninPage={logInPage} readyToLogIN={readyToLog} />}

            {/* Entry here based on Signup and Login decision  */}
            {isLoggedIn && <Landing userAPI={userApi} takeToSigninPage={logInPage} />}
        </div>
    );
}

export default App;
