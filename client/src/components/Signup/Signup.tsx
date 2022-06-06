import "./Signup.css";
import Logo from "../Logo/Logo";

import { useState } from "react";
import axios from "axios";

const Signup = (props: any) => {
  // username retrieval
  const [enteredUsername, changeEnteredUsername] = useState("");

  // username retrieval update
  const usernameHandler = (event: any) => {
    changeEnteredUsername(event.target.value);
  };

  // password retrieval
  const [enteredEmail, changeEnteredEmail] = useState("");

  // password retrieval update
  const emailHandler = (event: any) => {
    changeEnteredEmail(event.target.value);
  };

  // date retrieval
  const [enteredDate, changeEnteredDate] = useState("");

  //date retrieval update
  const dateChangeHandler = (event: any) => {
    changeEnteredDate(event.target.value);
  };

  // password retrieval
  const [enteredPassword, changeEnteredPassword] = useState("");

  //password retrieval update
  const passwordHandler = (event: any) => {
    changeEnteredPassword(event.target.value);
  };

  // password confirm retrieval
  const [enteredConfirmPassword, changeEnteredConfirmPassword] = useState("");

  //password confirm retrieval update
  const passwordConfirmHandler = (event: any) => {
    changeEnteredConfirmPassword(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    const userDetails = {
      username: enteredUsername,
      email: enteredEmail,
      date: enteredDate,
      enteredConfirmPassword,
    };

    console.log(userDetails);

    // props.userLoginDetails(userDetails);

    // changeEnteredUsername("");
    // changeEnteredEmail("");
  };

  const signin = (event: any) => {
    event.preventDefault();

    props.takeToSigninPage();
  };

  const signUpEndpoint =
    "https://7cdmvj3ct3.execute-api.us-east-1.amazonaws.com/dev/signup";

  const signupData = {
    email: "ishe.dzingirai@gmail.com",
    username: "Ishe",
    password: "Passw0rd@1",
    dateOfBirth: "12/01/2001",
  };

  // axios
  //   .post(signUpEndpoint, {
  //     body: signupData,
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const handler = async (e: any) => {
    const response = await fetch(signUpEndpoint, {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  };

  handler(0);

  return (
    <div
      data-testid="signup"
      className="flex justify-center flex-col items-center h-screen"
    >
      <div>
        <Logo width="136px" height="121px" page="login" />
      </div>

      <div>
        <h1 className="text-center text-xl font-bold">Create your account</h1>
      </div>
      <br />
      {/* unacceptable name notification */}
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
            placeholder="Name"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
            onChange={usernameHandler}
            value={enteredUsername}
          />
          <br />
          {/* unacceptable email notification */}
          {/*  */}
          <input
            data-testid="email-input"
            type="text"
            placeholder="Email"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
            onChange={emailHandler}
            value={enteredEmail}
          />
          <br />
          {/* less than 18 notification */}
          {/*  */}
          <input
            data-testid="date-input"
            type="date"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm text-gray-400"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
          <br />
          {/* incorrect password notification  */}
          {/*  */}
          <div className="flex flex-row">
            <input
              data-testid="password-input"
              type="password"
              placeholder="password"
              className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
              onChange={passwordHandler}
              value={enteredPassword}
            />
            &nbsp;
            <input
              data-testid="confirm-password-input"
              type="password"
              placeholder="confirm password"
              className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
              onChange={passwordConfirmHandler}
              value={enteredConfirmPassword}
            />
          </div>
          <br />
          <button
            data-testid="btn-submit"
            type="submit"
            className="button__login text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
          >
            Sign up
          </button>
          <br />
          <p className="text-sm text-center">
            Already have an account?
            <button
              data-testid="btn-signin"
              type="submit"
              className=" text-sky-500"
              onClick={signin}
            >
              &nbsp; Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
