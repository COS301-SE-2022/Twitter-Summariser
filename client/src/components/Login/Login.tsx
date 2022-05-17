import "./Login.css";
import Logo from "../Logo/Logo";

const Login = () => {
  return (
    <div
      data-testid="login"
      className="flex justify-center flex-col items-center h-screen"
    >
      <div>
        <Logo width="136px" height="121px" page="login" />
      </div>

      <div>
        <h1 className="text-center text-xl font-bold">
          Sign in to Twitter
          <br />
          Summarizer
        </h1>
      </div>
      <br />
      <br />
      <div>
        <form>
          <input
            type="text"
            placeholder="Phone, email or username"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
          />
          <br /> <br />
          <input
            type="password"
            placeholder="password"
            className=" w-56 h-10 border-gray-200 border rounded-md text-center text-sm"
          />
          <br />
          <br />
          <button
            type="submit"
            className="button text-sm p-0.5 h-10 w-56 bg-black rounded-full text-white"
          >
            Login
          </button>
          <br />
          <br />
          <br />
          <button
            type="submit"
            className="button text-sm p-0.5 h-10 w-56 bg-white border border-black text-black font-semibold rounded-full"
          >
            Forgot password?
          </button>
          <br />
          <br />
          <p className="text-sm text-center">
            Don't have an account?
            <button type="submit" className=" text-sky-500">
              &nbsp; Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
