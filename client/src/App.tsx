import { useState } from "react";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./index.css";

// importing mock data
import tweeter from "./mock.json";

// main Application component in which different page sub-components will be contained
const App = () => {
  const [loginPage, changeLoginPage] = useState(true);
  const [correctLoginDetails, changeCorrectLoginDetails] = useState(false);
  const [landingPage, changeLandingPage] = useState(false);
  const [signupPage, changeSignupPage] = useState(false);
  const [user_id, changeUser_id] = useState(0.0);

  if (correctLoginDetails === signupPage) {
    //do nothing, just bypassing warnings
  }

  // retrieving user login details
  const userAuthentication = (props: any) => {
    console.log(props);

    const data = tweeter.users;

    for (let index = 0; index < data.length; index++) {
      if (
        (data[index].name.toLowerCase() === props.username.toLowerCase() &&
          data[index].password
            .toLowerCase()
            .match(props.password.toLowerCase())) ||
        data[index].email.toLowerCase() ===
          (props.username.toLowerCase() &&
            data[index].password
              .toLowerCase()
              .match(props.password.toLowerCase()))
      ) {
        console.log(data[index]);

        changeLoginPage(false);
        changeCorrectLoginDetails(true);
        changeLandingPage(true);
        changeSignupPage(false);

        changeUser_id(data[index].id);
        return;
      }
    }
  };

  const signUpPage = (props: any) => {
    changeLoginPage(false);
    changeCorrectLoginDetails(false);
    changeLandingPage(false);
    changeSignupPage(true);

    changeUser_id(0.0);
  };

  const logInPage = (props: any) => {
    changeLoginPage(false);
    changeCorrectLoginDetails(false);
    changeLandingPage(true);
    changeSignupPage(false);

    changeUser_id(0.0);
  };

  return (
    <div className="">
      {/* Login */}
      {loginPage && (
        <Login
          userLoginDetails={userAuthentication}
          takeToSignupPage={signUpPage}
        />
      )}

      {/* Signup */}
      {signupPage && <Signup />}

      {/* Entry here based on Signup and Login decision  */}
      {landingPage && <Landing userID={user_id} takeToLoginPage={logInPage} />}
    </div>
  );
};

export default App;
