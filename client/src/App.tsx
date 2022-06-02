import { useState, useEffect } from "react";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./index.css";

// importing mock data
import tweeter from "./mock.json";

// main Application component in which different page sub-components will be contained
const App = () => {
  // const [loginPage, setLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const [user_id, changeUser_id] = useState(0.0);

  useEffect(() => {
    const storageUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storageUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  // retrieving user login details
  const loginHandler = (props: any) => {
    console.log(props);

    const data = tweeter.users;

    for (let index = 0; index < data.length; index++) {
      if (
        (data[index].name.toLowerCase() === props.username.toLowerCase() ||
          data[index].email.toLowerCase() === props.username.toLowerCase()) &&
        data[index].password.toLowerCase() === props.password.toLowerCase()
      ) {
        console.log(data[index]);

        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
        setSignupPage(false);

        changeUser_id(data[index].id);
        return;
      }
    }
  };

  const signUpPage = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
    setSignupPage(true);

    changeUser_id(0.0);
  };

  const logInPage = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSignupPage(false);

    changeUser_id(0.0);
  };

  return (
    <div className="">
      {/* Login */}
      {!localStorage.getItem("isLoggedIn") && (
        <Login userLoginDetails={loginHandler} takeToSignupPage={signUpPage} />
      )}

      {/* Signup */}
      {signupPage && <Signup takeToSigninPage={logInPage} />}

      {/* Entry here based on Signup and Login decision  */}
      {isLoggedIn && <Landing userID={user_id} takeToSigninPage={logInPage} />}
    </div>
  );
};

export default App;
