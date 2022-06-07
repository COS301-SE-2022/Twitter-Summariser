import { useState, useEffect } from "react";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./index.css";

// main Application component in which different page sub-components will be contained
const App = () => {
  // const [loginPage, setLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const [user_api, changeUser_api] = useState("");

  useEffect(() => {
    const storageUserLoggedInInformation =
      localStorage.getItem("loggedUserApi");

    if (storageUserLoggedInInformation) {
      setIsLoggedIn(true);
    }
  }, []);

  // retrieving user login details
  const loginHandler = (props: any) => {
    console.log(props.email);
    console.log(props.username);
    console.log(props.apiKey);

    if (props.login === "true") {
      localStorage.setItem("loggedUserApi", props.apiKey);
      localStorage.setItem("loggedUserName", props.username);
      localStorage.setItem("loggedUserEmail", props.email);
      setIsLoggedIn(true);
      setSignupPage(false);

      changeUser_api(props.apiKey);
      return;
    }
  };

  const signUpPage = () => {
    localStorage.setItem("loggedUserApi", "0");
    setIsLoggedIn(false);
    setSignupPage(true);

    changeUser_api("");
  };

  const logInPage = () => {
    localStorage.removeItem("loggedUserApi");
    localStorage.removeItem("loggedUserName");
    localStorage.removeItem("loggedUserEmail");
    setIsLoggedIn(false);
    setSignupPage(false);

    changeUser_api("");
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
      {signupPage && (
        <Signup takeToSigninPage={logInPage} readyToLogIN={readyToLog} />
      )}

      {/* Entry here based on Signup and Login decision  */}
      {isLoggedIn && (
        <Landing userAPI={user_api} takeToSigninPage={logInPage} />
      )}
    </div>
  );
};

export default App;
