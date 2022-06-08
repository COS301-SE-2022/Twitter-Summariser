import "./Signup.css";
import Logo from "../Logo/Logo";
import { BiErrorCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

const Signup = (props: any) => {
  // const navigate = useNavigate();
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

  const [signupStatus, signUpFailure] = useState(false);
  // console.log("Issues with the server " + signupStatus);

  // ######################### API ###############################################
  const signUpEndpoint =
    "https://czbmusycz2.execute-api.us-east-1.amazonaws.com/dev/signup";

  const signup = async (userValidatedData: any) => {
    // POST request using fetch with error handling
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(userValidatedData),
    };

    fetch(signUpEndpoint, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson && (await response.json());

        console.log(await data);

        console.log(response.ok);
        await props.readyToLogIN();
        console.log("Prop is set");
        // check for error response
        if (!response.ok) {
          // error
          signUpFailure(true);
          console.log("Error things");

          return;
        } else {
        }
      })
      .catch((error) => {
        console.log("Error Signing up");
        // signUpFailure(true);
      });
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
    setValidName(enteredUsername.length >= 2 ? true : false);
    setValidEmail(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        enteredEmail
      )
    );
    setValidLength(enteredPassword.length >= 8 ? true : false);
    setUpperCase(enteredPassword.toLowerCase() !== enteredPassword);
    setLowerCase(enteredPassword.toUpperCase() !== enteredPassword);
    setHasNumber(/\d/.test(enteredPassword));
    setSpecialChar(
      /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(enteredPassword)
    );
    setMatch(
      enteredPassword && enteredPassword === enteredConfirmPassword
        ? true
        : false
    );
  }, [enteredUsername, enteredEmail, enteredPassword, enteredConfirmPassword]);

  const [errorStatus, setError] = useState(false);
  const style = { fontSize: "2rem", color: "orange" };

  const submitHandler = (event: any) => {
    event.preventDefault();

    // ######## CHECK DATABASE FOR EXISTING EMAIL ########

    // ###################################################

    console.log("valid name is " + validName);
    console.log("valid email is " + validEmail);
    console.log("valid pass length " + validLength);
    console.log("valid pass num " + hasNumber);
    console.log("valid pass uppe " + upperCase);
    console.log("valid pass lower " + lowerCase);
    console.log("valid pass special char " + specialChar);
    console.log("valid pass match " + match);

    const userDetails = {
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
      dateOfBirth: enteredDate,
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
      console.log("It's false");

      setError(true);
    } else {
      setError(false);
      console.log(userDetails);

      signup(userDetails);
      // navigate("/login");
    }
  };

  const signin = (event: any) => {
    event.preventDefault();

    props.takeToSigninPage();
    // navigate("/login")
  };

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
              <p>
                password must contain number, letters and special characters{" "}
              </p>
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
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm text-gray-800"
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
            {/* <Link to="/login" className=" text-sky-500">
              &nbsp; Sign in
            </Link> */}
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
