import { useState, useEffect } from "react";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Splash from "./components/Splash/Splash";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// main Application component in which different page sub-components will be contained
const App = (props : any) => {
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
      console.log("here: " + props.username);
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



  return (


    <BrowserRouter>

      <Routes>
        {!isLoggedIn &&
          <Route path="/" element={<Splash />} />
        }
        {/* <Route path="/" element={<Splash />} /> */}
        {!localStorage.getItem("loggedUserApi") &&
          <Route path="/login" element= {<Login userLoginDetails={loginHandler} takeToSignupPage={signUpPage} />} />
        }
        {
          <Route path="/signup" element={<Signup takeToSigninPage={logInPage} />}/>
        }
        {isLoggedIn &&
          <Route path="/*" element={
            <Landing userAPI={user_api} takeToSigninPage={logInPage} />
          }/>
        }
      </Routes>
        {/* Login */}
        {/* {!localStorage.getItem("loggedUserApi") && (
          <Login userLoginDetails={loginHandler} takeToSignupPage={signUpPage} />
        )} */}

        {/* Signup */}
        {/* {signupPage && <Signup takeToSigninPage={logInPage} />} */}

        {/* Entry here based on Signup and Login decision  */}
        {/* {isLoggedIn && (
          <Landing userAPI={user_api} takeToSigninPage={logInPage} />
        )} */}

      {/* <div className=""> */}
        {/* Login */}
        {/* {!localStorage.getItem("loggedUserApi") && (
          <Login userLoginDetails={loginHandler} takeToSignupPage={signUpPage} />
        )} */}

        {/* Signup */}
        {/* {signupPage && <Signup takeToSigninPage={logInPage} />} */}

        {/* Entry here based on Signup and Login decision  */}
        {/* {isLoggedIn && (
          <Landing userAPI={user_api} takeToSigninPage={logInPage} />
        )} */}
      {/* </div> */}
    </BrowserRouter>


  );
};

export default App;
